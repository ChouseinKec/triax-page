import { STYLE_VALUE } from '@/editors/style/constants/types';

/**
 * Props for the LengthInput component.
 * 
 * @param {string} [value] - Current value (e.g., "12px" or "auto")
 * @param {number} [minValue] - Minimum numeric value allowed (default: -Infinity)
 * @param {number} [maxValue] - Maximum numeric value allowed (default: Infinity)
 * @param {STYLE_VALUE[]} [options] - Unit options to show in the dropdown
 * @param {(value: string) => void} [onChange] - Callback triggered on value change
 * @param {boolean} [isStrict] - If true, enforces fallback/defaults on empty values (default: false)
 */
export type UNIT_INPUT = {
  value?: string;
  minValue?: number;
  maxValue?: number;
  options?: STYLE_VALUE[];
  onChange?: (value: string) => void;
  isStrict?: boolean;
};

