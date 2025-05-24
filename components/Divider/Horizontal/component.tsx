import React, { memo, ReactElement } from 'react';
// Style
import CSS from '@/components/Divider/Horizontal/styles.module.css';

// Types
import { HORIZONTAL_DIVIDER } from '@/components/Divider/Horizontal/types';


const HorizontalDivider: React.FC<HORIZONTAL_DIVIDER> = ({ type = 'straight' }: HORIZONTAL_DIVIDER): ReactElement => {
    return (
        <div className={CSS.HorizontalDivider} data-type={type} />
    );
};

export default memo(HorizontalDivider);