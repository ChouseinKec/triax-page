import { Option } from '@/components/Select/Options/types';

export type DROPDOWN_SELECT = {
  value: string;
  options: Option[];

  placeholder?: string;
  hasSearch?: boolean;
  isGrouped?: boolean;
  toggleStyle?: React.CSSProperties;

  onChange: (value: string) => void;
};
