"use client";
import React, { memo, Fragment } from "react";

// Types
import type { ViewportProps } from "./types";

// Styles
import CSS from "./styles.module.scss";

// Components
import View from "./view";
import Select from "./select";
import ActionGroup from "@/shared/components/group/action/component";

// Managers
import { useSelectedView, getActionDefinitions } from "@/core/layout/viewport/managers/";
import { useSelectedBenchKey } from "@/core/layout/workbench/managers/";



const Viewport: React.FC<ViewportProps> = () => {
    const selectedBenchKey = useSelectedBenchKey();
    const viewDefinition = useSelectedView(selectedBenchKey);
    const actionDefinitions = Object.values(getActionDefinitions(viewDefinition?.key)).sort((a, b) => a.order - b.order);


    return (
        <div className={CSS.Viewport}>
            <div className={CSS.Toolbar}>
                <Select />
                <span className={CSS.Divider} />

                <ActionGroup direction="horizontal">
                    {actionDefinitions.map((actionDefinition, index) => (
                        <Fragment key={index}>
                            <actionDefinition.component />
                            {index < actionDefinitions.length - 1 && <span key={`${actionDefinition.key}-divider`} className={CSS.Divider} />}
                        </Fragment>
                    ))}
                </ActionGroup>
            </div>

            {
                viewDefinition
                    ? <View viewDefinition={viewDefinition} />
                    : <div className={CSS.Empty}>No view selected.</div>
            }
        </div>
    );
}
export default memo(Viewport);