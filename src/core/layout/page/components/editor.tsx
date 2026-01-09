"use client";
import React, { useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Editors
import Workbench from "@/src/core/layout/workbench/components/editor";

//Managers
import { useSelectedWorkbench } from "@/src/core/layout/page/managers";

// Registry
import { getRegisteredActions } from "@/src/core/layout/page/registries"

/**
 * Page Component
 * Renders the layout editor UI, including page actions and open editors.
 * @param props - PageEditorProps
 * @returns ReactElement
 */
const Page: React.FC = () => {
    const selectedWorkbench = useSelectedWorkbench();
    const allActions = Object.values(getRegisteredActions());

    const actionInstances = useMemo(() => (
        allActions
            .map((action) => (
                <React.Fragment key={action.id}>
                    {<action.component />}
                </React.Fragment>
            ))
    ), [allActions]);


    if (!selectedWorkbench) return <p>No workbench selected.</p>;

    return (
        <div className={CSS.Page}>

            <div className={CSS.Toolbar}>
                {actionInstances}
            </div>

            <Workbench selectedWorkbench={selectedWorkbench} />
        </div>
    );
};

export default Page;