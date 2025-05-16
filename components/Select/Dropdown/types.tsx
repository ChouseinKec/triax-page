import { OPTIONS_SELECT_OPTION } from '@/components/Select/Options/types';

export type DROPDOWN_SELECT = {
  value: string;
  options: OPTIONS_SELECT_OPTION[];

  placeholder?: string;
  hasSearch?: boolean;
  isGrouped?: boolean;
  toggleStyle?: React.CSSProperties;

  onChange: (value: string) => void;
};
