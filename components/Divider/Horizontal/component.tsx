import React, { ReactElement } from 'react';
// Style
import CSS from './styles.module.css';

// Types
import { HorizontalDividerProps } from '@/components/divider/horizontal/types';


const HorizontalDivider: React.FC<HorizontalDividerProps> = (props: HorizontalDividerProps): ReactElement => {
    const { title } = props;
    const _style = { '--divider-title': title ? `"${title}"` : '""' } as React.CSSProperties;

    return <div className={CSS.HorizontalDivider} data-title={title} style={_style} />;
};

export default HorizontalDivider;