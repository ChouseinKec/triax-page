"use client";
import React, { useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Editors
import WorkbenchEditor from "@/src/page-builder/component/editors/workbench/component";
import ViewportEditor from "@/src/page-builder/component/editors/viewport/component";
import LayoutEditor from "@/src/page-builder/component/editors/layout/component";

//Managers
import { usePageActions } from "@/src/page-builder/service/managers/page";

/**
 * PageEditor Component
 * Renders the layout editor UI, including page actions and open editors.
 * @param props - PageEditorProps
 * @returns ReactElement
 */
const PageEditor: React.FC = () => {
    const allActions = usePageActions();

    const actionInstances = useMemo(() => (
        allActions
            .map((action) => (
                <React.Fragment key={action.id}>
                    {action.render()}
                </React.Fragment>
            ))
    ), [allActions]);

    return (
        <div className={CSS.PageEditor}>

            <div className={CSS.PageEditor__Actions}>
                {actionInstances}
            </div>

            <LayoutEditor />
            <WorkbenchEditor />
            <ViewportEditor />
        </div>
    );
};

export default PageEditor;