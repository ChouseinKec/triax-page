"use client";

import React, { memo, useMemo } from "react";

// Components
import ActionGroup from "@/src/shared/components/group/action/component";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { LayoutBarProps } from "./types";
import type { BarActionInstance } from "@/src/page-builder/core/editor/layout/types/bar";

// Managers
import { useBarActions } from "@/src/page-builder/services/managers/layout/bar";

/**
 * LayoutBar Component
 * A simple bar component with actions and close functionality.
 *
 * @param props - LayoutBarProps
 * @returns The rendered LayoutBar or null if no actions
 */
const LayoutBar: React.FC<LayoutBarProps> = ({ title = "LayoutBar", position = { top: "0px", left: "0px" }, size = { width: "25%", height: "35px" }, barID, isTransparent }) => {
    const actions = useBarActions(barID);

    const actionInstances = useMemo(() => (
        actions && actions.length > 0
            ? actions
                .sort((a, b) => a.order - b.order)
                .map((action: BarActionInstance) => (
                    <React.Fragment key={action.id}>
                        {action.render()}
                    </React.Fragment>
                ))
            : null
    ), [actions]
    );

    const styles = useMemo(() => ({
        top: position.top,
        left: position.left,
        width: 'width' in size && size.width ? size.width : 'auto',
        height: 'height' in size && size.height ? size.height : undefined,
        minWidth: 'minWidth' in size && size.minWidth ? size.minWidth : undefined,
        maxWidth: 'maxWidth' in size && size.maxWidth ? size.maxWidth : undefined,
        background: isTransparent ? 'transparent' : undefined,
        boxShadow: isTransparent ? 'none' : undefined,
    }), [position, size, isTransparent]
    );

    return (
        <div className={CSS.LayoutBar} style={styles} title={title} data-transparent={String(isTransparent)}>
            {actionInstances &&
                <ActionGroup direction="horizontal">
                    {actionInstances}
                </ActionGroup>
            }
        </div>
    );
};

export default memo(LayoutBar);