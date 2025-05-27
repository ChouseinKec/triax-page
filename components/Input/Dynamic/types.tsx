import { STYLE_VALUE } from '@/editors/style/constants/types';


export type DYNAMIC_INPUT = {
    value?: string;
    onChange?: (value: string) => void;
    type?: string;
    option?: STYLE_VALUE;
};

