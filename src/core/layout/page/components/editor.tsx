"use client";
import React, { useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Editors
import Workbench from "@/src/core/layout/workbench/components/editor";

// Registry
import { getRegisteredActions } from "@/src/core/layout/page/registries"

/**
 * Page Component
 * Renders the layout editor UI, including page actions and open editors.
 * @param props - PageEditorProps
 * @returns ReactElement
 */
const Page: React.FC = () => {
    const allActions = Object.values(getRegisteredActions());

    const actionInstances = useMemo(() => (
        allActions
            .map((action) => (
                <React.Fragment key={action.id}>
                    {<action.component />}
                </React.Fragment>
            ))
    ), [allActions]);

    return (
        <div className={CSS.Page}>

            <div className={CSS.Toolbar}>
                {actionInstances}
            </div>

            <Workbench />
        </div>
    );
};

export default Page;