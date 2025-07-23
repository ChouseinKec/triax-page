"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Context
import { TopPanel as TopPanelContext } from "@/context/layout/manager";

// Hooks
import { usePageFactory } from "@/hooks/page/factory";

export default function TopPanel() {
    const { items } = TopPanelContext.usePanel();
    const { renderDeviceSelect } = usePageFactory();
    const deviceSelect = renderDeviceSelect();
    
    // if (!items || items.length === 0) {
    //     return null;
    // }

    return (
        <div className={CSS.TopPanel}>
            {deviceSelect}

            {items.map(item => (
                <React.Fragment key={item.id}>
                    {item.component}
                </React.Fragment>
            ))}
        </div>
    );
}