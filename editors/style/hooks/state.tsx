import { useCallback } from 'react';

// Constants
import { STYLES_CONSTANTS_KEY } from '@/editors/style/constants/styles';

// Utilities
import { isPropertyValid, isSingleValueValid, isMultiValueValid, isIndexValid, splitMultiValue, updateMultiValue, deleteMultiValue } from '@/editors/style/utilities/style'
import { devLog } from '@/utilities/dev';

// Stores
import useStyleStore from '@/stores/style/store';

interface STYLE_STATE {
    getSingleStyle: (property: STYLES_CONSTANTS_KEY) => string;
    setSingleStyle: (property: STYLES_CONSTANTS_KEY, value: string) => void;
    getMultiStyle: (property: STYLES_CONSTANTS_KEY, separator: string) => string[];
    setMultiStyle: (property: STYLES_CONSTANTS_KEY, value: string, index: number, separator: string) => void;
}

export const useStyleState = (): STYLE_STATE => {
    /**
     * Sets a single style property value for current _device/_pseudo
     * @param {STYLES_CONSTANTS_KEY} property - The style property to set
     * @param {string} value - The value to set for the property
     * @throws {Error} If property conversion fails or value is invalid
     */
    const setSingleStyle = useCallback<STYLE_STATE['setSingleStyle']>((property: STYLES_CONSTANTS_KEY, value: string): void => {
        // If property is not valid
        if (!isPropertyValid(property)) return devLog.error(`Error setting single-style property: ${property} is not valid`);

        // If value is not empty and value is not valid
        if (value !== '' && !isSingleValueValid(property, value)) return devLog.error(`Error setting single-style value: ${value} is not valid`);

        useStyleStore.getState().setStyle(property, value);
    },
        []
    );

    /**
     * Gets a style with CSS-like cascading behavior
     * @param {STYLES_CONSTANTS_KEY} property - The style property to get
     * @returns {string} The current property value or empty string if not found
     * @throws {Error} If property conversion fails
    */
    const getSingleStyle = useCallback<STYLE_STATE['getSingleStyle']>((property: STYLES_CONSTANTS_KEY): string => {
        if (!isPropertyValid(property)) { devLog.error(`Error getting single-style property: ${property} is not valid`); return '' };
        return useStyleStore.getState().getStyle(property);
    },
        []
    );

    /**
     * Updates specific parts of a multi-value style property
     * @param {STYLES_CONSTANTS_KEY} property - The style property to update
     * @param {string} value - The new value part
     * @param {number} index - The index of the value part to update
     * @param {string} separator - The separator used in the multi-value string
     * @throws {Error} If any parameter is invalid or operation fails
     */
    const setMultiStyle = useCallback<STYLE_STATE['setMultiStyle']>((property: STYLES_CONSTANTS_KEY, value: string, index: number, separator: string): void => {
        // If property is not valid
        if (!isPropertyValid(property)) return devLog.error(`Error setting multi-style property: ${property} is not valid`);
        if (!isIndexValid(index)) return devLog.error(`Error setting multi-style.Invalid index: ${index}. Must be a non-negative number.`);

        const values = useStyleStore.getState().getStyle(property);

        // Handle value delete
        if (value.length === 0) {
            const updatedValues = deleteMultiValue(values, index, separator);
            useStyleStore.getState().setStyle(property, updatedValues);
            return;
        }

        // Handle value update
        const updatedValues = updateMultiValue(values, value, index, separator);
        if (!isMultiValueValid(property, updatedValues, separator)) return devLog.error(`Error setting multi-style value: ${value} is not valid`);

        useStyleStore.getState().setStyle(property, updatedValues);
    },
        []
    );

    /**
         * Gets multi-value style with cascading and splits it into multiple values
         * @param {STYLES_CONSTANTS_KEY} property - The style property to get
         * @param {string} separator - The separator used to split values
         * @returns {string[]} Array of split values or empty array on error
         * @throws {Error} If splitting fails
         */
    const getMultiStyle = useCallback<STYLE_STATE['getMultiStyle']>((property: STYLES_CONSTANTS_KEY, separator: string): string[] => {
        // Validate Inputs
        if (!isPropertyValid(property)) { devLog.error(`Error getting multi-style property: ${property} is not valid`); return [] };

        const style = useStyleStore.getState().getStyle(property);
        const result = splitMultiValue(style, separator);

        if (!Array.isArray(result)) {
            devLog.error(`Error getting multi-style property: ${property}. Split operation did not return an array`);
            return [];
        }

        return result;
    },
        []
    );

    return {
        getSingleStyle,
        setSingleStyle,
        getMultiStyle,
        setMultiStyle,
    }

}