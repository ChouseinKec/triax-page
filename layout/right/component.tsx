"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Context
import { RightPanel as RightPanelContext } from "@/context/layout/manager";

export default function RightPanel() {
    const { items } = RightPanelContext.usePanel();
  
    if (!items || items.length === 0) {
        return null;
    }
    
    return (
        <div className={CSS.RightPanel}>
            {items.map(item => (
                <React.Fragment key={item.id}>
                    {item.component}
                </React.Fragment>
            ))}
        </div>
    );
}