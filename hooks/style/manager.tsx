import { useCallback } from 'react';

// Constants
import { STYLE_PROPERTIES } from '@/editors/style/constants/styles';

// Utilities
import { isPropertyValid, isValueValid } from '@/utilities/style'
import { devLog } from '@/utilities/dev';

// Stores
import useDeviceStore from '@/stores/device/store';
import useBlockStore from '@/stores/block/store';
import useOrientationStore from '@/stores/orientation/store';
import usePseudoStore from '@/stores/pseudo/store';


interface STYLE_MANAGER {
    getStyle: (property: STYLE_PROPERTIES) => string;
    setStyle: (property: STYLE_PROPERTIES, value: string) => void;
    copyStyle: (property: STYLE_PROPERTIES) => void;
    pasteStyle: (property: STYLE_PROPERTIES) => void;
    resetStyle: (property: STYLE_PROPERTIES) => void;
}

export const useStyleManager = (): STYLE_MANAGER => {
    const setBlockStyle = useBlockStore(state => state.setBlockStyle);
    const getBlockStyles = useBlockStore(state => state.getBlockStyles);

    /**
         * Gets a style property value with CSS cascade fallback logic
         *
         * @param {STYLE_PROPERTIES} property - The style property to lookup (e.g. 'color', 'fontSize')
         * @returns {string} The resolved value or empty string if not found
         *
         * @example
         * // Current context: tablet/landscape/hover
         * _getStyle('backgroundColor') looks up:
         * 1. tablet/landscape/hover
         * 2. tablet/landscape/default
         * 3. tablet/default/hover
         * 4. tablet/default/default
         * 5. default/landscape/hover
         * 6. default/landscape/default
         * 7. default/default/hover
         * 8. default/default/default
         *
         * @example
         * // Basic usage
         * const fontSize = _getStyle('fontSize');
         *
         * @example
         * // With responsive fallback
         * <div style={{ color: _getStyle('textColor') || 'black' }}>
         */
    const _getStyle = useCallback((property: STYLE_PROPERTIES): string => {
        const selectedBlock = useBlockStore.getState().selectedBlock;
        const device = useDeviceStore.getState().currentDevice.name;
        const orientation = useOrientationStore.getState().currentOrientation.name;
        const pseudo = usePseudoStore.getState().currentPseudo.name;

        const defaultPseudo = 'default';
        const defaultOrientation = 'default';
        const defaultDevice = 'default';


        if (!selectedBlock) return '';

        const blockStyles = getBlockStyles(selectedBlock);
        if (!blockStyles) return '';

        return (
            // 1. Exact match
            blockStyles[device]?.[orientation]?.[pseudo]?.[property] ??
            // 2. Same context, default pseudo
            blockStyles[device]?.[orientation]?.[defaultPseudo]?.[property] ??
            // 3. Default orientation
            blockStyles[device]?.[defaultOrientation]?.[pseudo]?.[property] ??
            blockStyles[device]?.[defaultOrientation]?.[defaultPseudo]?.[property] ??
            // 4. Default device
            blockStyles[defaultDevice]?.[orientation]?.[pseudo]?.[property] ??
            blockStyles[defaultDevice]?.[orientation]?.[defaultPseudo]?.[property] ??
            blockStyles[defaultDevice]?.[defaultOrientation]?.[pseudo]?.[property] ??
            // 5. Global fallback
            blockStyles[defaultDevice]?.[defaultOrientation]?.[defaultPseudo]?.[property] ??
            // 6. Empty string if nothing found
            ''
        );

    }, []
    );

    /**
    * Sets a style property value for the current device/orientation/pseudo context
    *
    * @param {STYLE_PROPERTIES} property - The style property to set (e.g. 'color', 'fontSize')
    * @param {string} value - The value to set for the property
    *
    * @example
    * // Sets background color for current context
    * _setStyle('backgroundColor', '#ff0000');
    */
    const _setStyle = useCallback((property: STYLE_PROPERTIES, value: string): void => {
        const selectedBlock = useBlockStore.getState().selectedBlock;
        const device = useDeviceStore.getState().currentDevice.name;
        const orientation = useOrientationStore.getState().currentOrientation.name;
        const pseudo = usePseudoStore.getState().currentPseudo.name;

        if (!selectedBlock) return;

        setBlockStyle(device, orientation, pseudo, property, value, selectedBlock);
    }, [setBlockStyle]
    );

    /**
     * Sets a single style property value for current _device/_pseudo
     * @param {STYLE_PROPERTIES} property - The style property to set
     * @param {string} value - The value to set for the property
     * @throws {Error} If property conversion fails or value is invalid
     */
    const setStyle = useCallback<STYLE_MANAGER['setStyle']>((property: STYLE_PROPERTIES, value: string): void => {
        // If property is not valid
        if (!isPropertyValid(property)) return devLog.error(`Error setting style property: ${property} is not valid`);

        // If value is not empty and value is not valid
        if (value !== '' && !isValueValid(property, value)) return devLog.error(`Error setting style value: ${value} is not valid`);
        _setStyle(property, value);
    },
        []
    );

    /**
     * Gets a style with CSS-like cascading behavior
     * @param {STYLE_PROPERTIES} property - The style property to get
     * @returns {string} The current property value or empty string if not found
     * @throws {Error} If property conversion fails
    */
    const getStyle = useCallback<STYLE_MANAGER['getStyle']>((property: STYLE_PROPERTIES): string => {
        if (!isPropertyValid(property)) {
            devLog.error(`Error getting single-style property: ${property} is not valid`);
            return ''
        };
        return _getStyle(property);
    },
        []
    );

    /**
     * Copies a style property value to clipboard
     * @param {STYLE_PROPERTIES} property - The style property to copy
     * @returns {string} The copied value or empty string if not found
     */
    const copyStyle = useCallback((property: STYLE_PROPERTIES): void => {
        const value = getStyle(property);

        // If property is not valid
        if (value === '') {
            devLog.error(`Error copying style: ${property} is not set`);
            return;
        }

        // Copy the value to clipboard
        navigator.clipboard.writeText(value).then(() => {
            devLog.info(`Copied style ${property}: ${value}`);
        }).catch(err => {
            devLog.error(`Failed to copy style ${property}:`, err);
        });
    }, [getStyle]
    );

    /**
     * Pastes a style property value from clipboard
     * @param {STYLE_PROPERTIES} property - The style property to paste
     * @returns {void}
     */
    const pasteStyle = useCallback((property: STYLE_PROPERTIES): void => {

        navigator.clipboard.readText().then(text => {
            // If property is not valid
            if (!isPropertyValid(property)) {
                devLog.error(`Error pasting style: ${property} is not valid`);
                return;
            }

            // If value is not valid
            if (text !== '' && !isValueValid(property, text)) {
                devLog.error(`Error pasting style: ${text} is not valid for ${property}`);
                return;
            }

            _setStyle(property, text);
            devLog.info(`Pasted style ${property}: ${text}`);
        }).catch(err => {
            devLog.error(`Failed to paste style ${property}:`, err);
        })

    }, [_setStyle, isPropertyValid, isValueValid]
    );

    /**
     * Resets a style property value to empty string
     * @param {STYLE_PROPERTIES} property - The style property to reset
     * @returns {void}
     */
    const resetStyle = useCallback((property: STYLE_PROPERTIES): void => {
        // If property is not valid
        if (!isPropertyValid(property)) {
            devLog.error(`Error resetting style: ${property} is not valid`);
            return;
        }

        // Reset the style to empty string
        _setStyle(property, '');
    }, [_setStyle, isPropertyValid]
    )

    // Return the style manager methods
    return {
        getStyle,
        setStyle,
        copyStyle,
        pasteStyle,
        resetStyle
    }

}