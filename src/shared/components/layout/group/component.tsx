import React, { memo } from 'react';

// Components
import DividerReveal from '@/shared/components/reveal/divider/component';
import HorizontalDivider from '@/shared/components/divider/horizontal/component';

// Types
import type { GroupLayoutProps } from './types';

// Styles
import CSS from './styles.module.scss';

export const GroupLayout: React.FC<GroupLayoutProps> = ({
    isHidden = false,
    isExpandable = false,
    content,
    dividerTitle,
    styles,
}) => {

    if (isHidden) return null;

    if (isExpandable) {
        return (
            <div className={CSS.GroupLayout}>
                <DividerReveal title={dividerTitle}>
                    <div className={CSS.Content} style={styles}>
                        {content()}
                    </div>
                </DividerReveal>
            </div>
        );
    }

    return (
        <div className={CSS.GroupLayout}>

            {dividerTitle && <HorizontalDivider title={dividerTitle} />}

            <div className={CSS.Content} style={styles}>
                {content()}
            </div>


        </div>
    );
};


export default memo(GroupLayout);
