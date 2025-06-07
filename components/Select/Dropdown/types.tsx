import { OptionData } from "@/types/interface/option";

/**
 * Props for the DropdownSelect component.
 *
 * @property value - The currently selected value.
 * @property options - The list of options to display in the dropdown.
 * @property placeholder - Placeholder text to display when no value is selected.
 * @property searchable - Whether the dropdown supports searching options.
 * @property grouped - Whether the options should be displayed in grouped sections.
 * @property buttonStyle - Custom style for the dropdown trigger/button.
 * @property onChange - Callback function triggered when an option is selected.
 */
export type DROPDOWN_SELECT = {
  /** The currently selected value */
  value: string;
  /** The list of options to display in the dropdown */
  options: OptionData[];

  /** Placeholder text to display when no value is selected */
  placeholder?: string;
  /** Whether the dropdown supports searching options */
  searchable?: boolean;
  /** Whether the options should be displayed in grouped sections */
  grouped?: boolean;
  /** Custom style for the dropdown trigger/button */
  buttonStyle?: React.CSSProperties;

  /** Callback function triggered when an option is selected */
  onChange: (value: string) => void;
};
