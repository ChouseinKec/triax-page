import { STYLE_VALUE } from '@/editors/style/constants/types';
import { RefObject } from 'react';

/**
 * LENGTH_INPUT
 * @typedef {Object} LENGTH_INPUT
 * @property {string} [value] - The current value of the length input, e.g., "10px", "auto", "calc(1, 20px)".
 * @property {number} [minValue] - The minimum numeric value allowed, default is -Infinity.
 * @property {number} [maxValue] - The maximum numeric value allowed, default is Infinity.
 * @property {STYLE_VALUE[]} [options] - Available length options, default is LENGTH.
 * @property {(value: string) => void} [onChange] - Callback function to handle value changes.
 * @property {boolean} [isStrict] - If true, empty inputs are replaced with defaults, default is false.
 * @property {RefObject<HTMLDivElement | null>} [ref] - Optional ref for the input container.
 */
export type LENGTH_INPUT = {
  /**
   * The current value of the length input, e.g., "10px", "auto", "repeat(1, 20px)".
   * @type {string}
   */
  value?: string;

  /**
   * The minimum numeric value allowed, default is -Infinity.
   * @type {number}
   */
  minValue?: number;

  /**
   * The maximum numeric value allowed, default is Infinity.
   * @type {number}
   */
  maxValue?: number;

  /**
   * Available length options, default is LENGTH.
   * @type {STYLE_VALUE[]}
   */
  options?: STYLE_VALUE[];


  /**
   * If true, empty inputs are replaced with defaults, default is false.
   * @type {boolean}
   */
  isStrict?: boolean;

  /**
   * Optional ref for the input container.
   * @type {RefObject<HTMLDivElement | null>}
   */
  ref?: RefObject<HTMLDivElement | null>;

  /**
   * Callback function to handle value changes.
   * @type {(value: string) => void}
   */
  onChange?: (value: string) => void;


  /**
   * Callback function to handle focus events.
   * @type {() => void}
   */
  onFocus?: () => void;

  /**
   * Callback function to handle blur events.
   * @type {() => void}
   */
  onBlur?: () => void;
};

