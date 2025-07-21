"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";


// Context
import { LeftPanel as LeftPanelContext } from "@/context/layout/manager";

export default function LeftPanel() {
    const { items } = LeftPanelContext.usePanel();

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={CSS.LeftPanel}>
            {items.map(item => (
                <React.Fragment key={item.id}>
                    {item.component}
                </React.Fragment>
            ))}
        </div>
    );
}