"use client";
import React, { ReactElement, useMemo } from "react";

// Styles
import CSS from "./style.module.scss";

// Types
import type { PageEditorProps } from "./types";

// Editors
import ViewEditor from "@/editors/view/component";
import LayoutEditor from "@/editors/layout/component";

// Hooks
import { usePageFactory } from "@/hooks/page/factory";


/**
 * PageEditor Component
 * Renders the layout editor UI, including panel actions and open panels.
 * @param props - PageEditorProps
 * @returns ReactElement
 */
const PageEditor: React.FC<PageEditorProps> = (props: PageEditorProps): ReactElement => {
    const { renderDeviceSelect } = usePageFactory();
    const deviceSelect = renderDeviceSelect();
    const version = process.env.NEXT_PUBLIC_APP_VERSION;

    return (
        <div className={CSS.PageEditor}>

            <div className={CSS.Bar}>
                {deviceSelect}
                <div className={CSS.Version}>
                    v{version}
                </div>
            </div>

            {/* Render the layout editor */}
            <LayoutEditor {...props} />

            {/* Render the view editor */}
            <ViewEditor {...props} />
        </div>
    );
};

export default PageEditor;