"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Context
import { ViewPanel as ViewPanelContext } from "@/context/layout/manager";

// Content
import BlockEditor from "@/editors/block/component";

export default function ViewPanel() {
    const { items } = ViewPanelContext.usePanel();

    // if (!items || items.length === 0) {
    //     return null;
    // }

    return (
        <div className={CSS.ViewPanel}>
            <BlockEditor />
            {items.map(item => (
                <React.Fragment key={item.id}>
                    {item.component}
                </React.Fragment>
            ))}
        </div>
    );
}