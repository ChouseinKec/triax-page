import React, { ReactElement } from 'react';
// Style
import CSS from '@/components/Divider/Horizontal/styles.module.css';

// Types
import { HorizontalDividerProps } from '@/components/divider/horizontal/types';


const HorizontalDivider: React.FC<HorizontalDividerProps> = ({ type = 'straight' }: HorizontalDividerProps): ReactElement => {
    return (
        <div className={CSS.HorizontalDivider} data-type={type} />
    );
};

export default HorizontalDivider;