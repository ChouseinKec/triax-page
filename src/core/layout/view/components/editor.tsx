"use client";
import React, { memo, Fragment } from "react";

// Types
import type { ViewEditorProps } from "./types";

// Styles
import CSS from "./styles.module.scss";

// Components
import View from "./view";
import Select from "./select";
import ActionGroup from "@/shared/components/group/action/component";

// Managers
import { useSelectedView, getActionDefinitions } from "@/core/layout/view/managers";
import { useSelectedBenchKey } from "@/core/layout/bench/managers/";



const ViewEditor: React.FC<ViewEditorProps> = () => {
    const selectedBenchKey = useSelectedBenchKey();
    const viewDefinition = useSelectedView(selectedBenchKey);
    const actionDefinitions = Object.values(getActionDefinitions(viewDefinition?.key)).sort((a, b) => a.order - b.order);


    return (
        <div className={CSS.ViewEditor}>
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
export default memo(ViewEditor);