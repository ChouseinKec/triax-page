import React, { memo } from "react";

// Styles
import CSS from './styles.module.css';

// Types
import type { ActionGroupProps } from './types';

// Utilities
import { devLog } from '@/utilities/dev';

/**
 * ActionGroup Component
 * 
 * A simple wrapper for grouping action buttons or controls, such as those used in toolbars or block editors.
 * Provides consistent structure and styling for collections of actions throughout the UI.
 * Useful for maintaining layout and code consistency when rendering groups of interactive elements.
 * @param {ActionGroupProps} props - Component properties
 * @param {React.ReactNode[]} props.children - Child components to render within the action group
*/
const ActionGroup: React.FC<ActionGroupProps> = (props: ActionGroupProps) => {
    const { children } = props;

    // Guard Clause
    if (!children || (Array.isArray(children) && children.length === 0)) {
        devLog.warn('[ActionGroup] No children provided');
        return null;
    }

    return (
        <div className={CSS.ActionGroup}>
            {children}
        </div>
    );
};

export default memo(ActionGroup);