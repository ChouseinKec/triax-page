"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Context
import { BottomPanel as BottomPanelContext } from "@/context/layout";

export default function BottomPanel() {
    const { items } = BottomPanelContext.usePanel();
   
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={CSS.BottomPanel}>
            {items.map(item => (
                <React.Fragment key={item.id}>
                    {item.component}
                </React.Fragment>
            ))}
        </div>
    );
}