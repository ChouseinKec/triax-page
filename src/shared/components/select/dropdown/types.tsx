import { OptionDefinition } from "@/shared/components/types/option";

interface BaseProps {
  /** The list of options to display in the dropdown */
  options: OptionDefinition[];
  /** Placeholder text to display when no value is selected */
  placeholder?: string | React.ReactNode;
  /** Whether to force the placeholder to be shown even when a value is selected */
  forcePlaceholder?: boolean;
  /** Whether the dropdown supports searching options */
  searchable?: boolean;
  /** Whether the options should be displayed in groupable sections */
  groupable?: boolean;
  /** Whether the dropdown allows clearing the selection */
  clearable?: boolean;
  /** Optional title for the dropdown button */
  title?: string;
  /** Whether the dropdown is disabled */
  isDisabled?: boolean;
  /** Optional class name for the dropdown */
  className?: string;
  /** Whether the dropdown should close upon selecting an option */
  closeOnSelect?: boolean;
}

interface SingleProps extends BaseProps {
  /** The currently selected value */
  value: string;
  /** Callback function triggered when an option is selected */
  onChange: (value: string) => void;
  /** Whether the dropdown allows multiple selections */
  multiselectable?: false;
}

interface MultiProps extends BaseProps {
  /** The currently selected value */
  value: string[];
  /** Callback function triggered when an option is selected */
  onChange: (value: string[]) => void;
  /** Whether the dropdown allows multiple selections */
  multiselectable: true;
}

/** Props definition for the DropdownSelect component. */
export type DropdownSelectProps = SingleProps | MultiProps;
