"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { WorkbenchProps } from "./types";

// Managers
import { useSelectedBench, getActionDefinitions } from "@/core/layout/workbench/managers/";

// Components
import ActionGroup from "@/shared/components/group/action/component";
import Panels from "@/core/layout/panel/components/editor";
import BenchSelect from "./select";

/**
 * Workbench Component
 * Renders the workbench editor UI, including the current workbench and workbench selection actions.
 *
 * @returns The rendered workbench editor with selection controls
 */
const Workbench: React.FC<WorkbenchProps> = () => {
    const selectedBench = useSelectedBench();
    if (!selectedBench) return null;

    const actions = getActionDefinitions(selectedBench.key);

    return (
        <div className={CSS.Workbench}>

            <div className={CSS.Toolbar}>
                <BenchSelect />
                <span className={CSS.Divider} />

                <ActionGroup direction="vertical">
                    {actions.map((action, index) => (
                        <React.Fragment key={action.key}>
                            <action.component key={action.key} />
                            {index < actions.length - 1 && <span key={`${action.key}-divider`} className={CSS.Divider} />}
                        </React.Fragment>

                    ))}

                </ActionGroup>

            </div>

            <Panels benchKey={selectedBench.key} />

            <div className={CSS.Bench}>
                {selectedBench
                    ? (<selectedBench.component />)
                    : (<div className={CSS.EmptyState}>No workbench selected.</div>)
                }
            </div>
        </div>

    );
};


export default memo(Workbench);