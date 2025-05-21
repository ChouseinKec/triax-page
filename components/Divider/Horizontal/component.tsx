import React, { memo, ReactElement } from 'react';
// Style
import CSS from '@/components/Divider/Horizontal/styles.module.css';

// Types
import { HORIZONTAL_DIVIDER } from '@/components/Divider/Horizontal/types';


const horizontalDivider: React.FC<HORIZONTAL_DIVIDER> = ({ }: HORIZONTAL_DIVIDER): ReactElement => {


    return (
        <div className={CSS.HorizontalDivider}>

        </div>
    );
};

export default memo(horizontalDivider);