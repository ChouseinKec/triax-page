import React, { memo, useState } from 'react';

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

    const [isExpanded, setIsExpanded] = useState(false);

    if (isHidden) return null;

    const isContentVisible = !isExpandable || isExpanded;

    const Header = isExpandable ? 'button' : 'div';

    return (
        <div className={CSS.GroupLayout}>

            <Header
                className={CSS.Header}
                {...(isExpandable && {
                    onClick: () => setIsExpanded(prev => !prev),
                    'data-is-open': isExpanded,
                })}
            >
                <span>{dividerTitle}</span>
            </Header>

            {isContentVisible && (
                <div className={CSS.Content} style={styles}>
                    {content()}
                </div>
            )}

        </div>
    );
};


export default memo(GroupLayout);
