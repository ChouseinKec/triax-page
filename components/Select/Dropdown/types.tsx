import { OptionData } from "@/types/option";
import React from "react";

export type DropdownSelectProps = {
  /** The currently selected value */
  value: string;

  /** The list of options to display in the dropdown */
  options: OptionData[];

  /** Callback function triggered when an option is selected */
  onChange: (value: string) => void;

  /** Placeholder text to display when no value is selected */
  placeholder?: string | React.ReactNode;

  /** Whether to force the placeholder to be shown even when a value is selected */
  forcePlaceholder?: boolean;

  /** Whether the dropdown supports searching options */
  searchable?: boolean;

  /** Whether the options should be displayed in groupable sections */
  groupable?: boolean;

  /** Optional title for the dropdown button */
  title?: string;

  /** Optional ARIA label for accessibility */
  ariaLabel?: string;

  /** Whether the dropdown is disabled */
  isDisabled?: boolean;
};
