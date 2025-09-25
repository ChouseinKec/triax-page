"use client";

import React, { memo, useMemo, useEffect } from "react";

// Components
import ActionGroup from "@/src/shared/components/group/action/component";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { ActionInstance } from "@/src/page-builder/core/editor/layout/types/bar";
import type { LayoutBarProps } from "@/src/page-builder/ui/editors/layout/types/bar";

// Managers
import { useBarActions } from "@/src/page-builder/services/managers/layout/bar";

/**
 * LayoutBar Component
 * A simple bar component with actions and close functionality.
 *
 * @param props - LayoutBarProps
 * @returns The rendered LayoutBar or null if no actions
 */
const LayoutBar: React.FC<LayoutBarProps> = ({ title = "LayoutBar", position = { top: "0px", left: "0px" }, size = { width: "25%", height: "35px" }, barID }) => {
    const actions = useBarActions(barID);

    const actionInstances = useMemo(() => (
        actions
            .sort((a, b) => a.order - b.order)
            .map((action: ActionInstance) => (
                <React.Fragment key={action.id}>
                    {action.render()}
                </React.Fragment>
            ))
    ), [actions]
    );

    const styles = useMemo(() => ({
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
    }), [position, size]
    );

    return (
        <div className={CSS.LayoutBar} style={styles} title={title}>
            {actionInstances.length > 0 &&
                <ActionGroup direction="horizontal" >
                    {actionInstances}
                </ActionGroup>
            }
        </div>
    );
};

export default memo(LayoutBar);