import { useCallback } from 'react';

// Constants
import { STYLES_CONSTANTS_KEY } from '@/editors/style/constants/styles';

// Utilities
import { isPropertyValid, isSingleValueValid } from '@/utilities/style'
import { devLog } from '@/utilities/dev';

// Stores
import useDeviceStore from '@/stores/device/store';
import useBlockStore from '@/stores/block/store';
import useOrientationStore from '@/stores/orientation/store';
import usePseudoStore from '@/stores/pseudo/store';


interface STYLE_STATE {
    getStyle: (property: STYLES_CONSTANTS_KEY) => string;
    setStyle: (property: STYLES_CONSTANTS_KEY, value: string) => void;
}

export const useStyleManager = (): STYLE_STATE => {
    const selectedBlock = useBlockStore(state => state.selectedBlock);
    const getBlockStyles = useBlockStore(state => state.getBlockStyles);
    const setBlockStyle = useBlockStore(state => state.setBlockStyle);

    const device = useDeviceStore(state => state.getDevice().name);
    const orientation = useOrientationStore(state => state.getOrientation().name);
    const pseudo = usePseudoStore(state => state.getPseudo().name);

    const defaultPseudo = 'default';
    const defaultOrientation = 'default';
    const defaultDevice = 'default';

    /**
         * Gets a style property value with CSS cascade fallback logic
         *
         * @param {STYLES_CONSTANTS_KEY} property - The style property to lookup (e.g. 'color', 'fontSize')
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
    const _getStyle = useCallback((property: STYLES_CONSTANTS_KEY): string => {
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




    }, [selectedBlock, device, orientation, pseudo, getBlockStyles]
    );

    /**
    * Sets a style property value for the current device/orientation/pseudo context
    *
    * @param {STYLES_CONSTANTS_KEY} property - The style property to set (e.g. 'color', 'fontSize')
    * @param {string} value - The value to set for the property
    *
    * @example
    * // Sets background color for current context
    * _setStyle('backgroundColor', '#ff0000');
    */
    const _setStyle = useCallback((property: STYLES_CONSTANTS_KEY, value: string): void => {
        if (!selectedBlock) return;
        setBlockStyle(device, orientation, pseudo, property, value, selectedBlock);
    }, [selectedBlock, device, orientation, pseudo, setBlockStyle]
    );

    /**
     * Sets a single style property value for current _device/_pseudo
     * @param {STYLES_CONSTANTS_KEY} property - The style property to set
     * @param {string} value - The value to set for the property
     * @throws {Error} If property conversion fails or value is invalid
     */
    const setStyle = useCallback<STYLE_STATE['setStyle']>((property: STYLES_CONSTANTS_KEY, value: string): void => {
        // If property is not valid
        if (!isPropertyValid(property)) return devLog.error(`Error setting single-style property: ${property} is not valid`);

        // If value is not empty and value is not valid
        if (value !== '' && !isSingleValueValid(property, value)) return devLog.error(`Error setting single-style value: ${value} is not valid`);
        _setStyle(property, value);
    },
        []
    );

    /**
     * Gets a style with CSS-like cascading behavior
     * @param {STYLES_CONSTANTS_KEY} property - The style property to get
     * @returns {string} The current property value or empty string if not found
     * @throws {Error} If property conversion fails
    */
    const getStyle = useCallback<STYLE_STATE['getStyle']>((property: STYLES_CONSTANTS_KEY): string => {
        if (!isPropertyValid(property)) {
            devLog.error(`Error getting single-style property: ${property} is not valid`);
            return ''
        };
        return _getStyle(property);
    },
        []
    );


    return {
        getStyle,
        setStyle,
    }

}