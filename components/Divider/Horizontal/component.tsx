import React, { memo, ReactElement } from 'react';
// Style
import CSS from '@/components/Divider/Horizontal/styles.module.css';

// Types
import { HORIZONTAL_DIVIDER } from '@/components/Divider/Horizontal/types';


const HorizontalDivider: React.FC<HORIZONTAL_DIVIDER> = ({ type = 'straight', className }: HORIZONTAL_DIVIDER): ReactElement => {
    return (
        <div className={` ${className} ${CSS.HorizontalDivider}`} data-type={type} />
    );
};

export default memo(HorizontalDivider);