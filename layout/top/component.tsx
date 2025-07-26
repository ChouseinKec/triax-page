"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Context
import { TopBar as TopBarContext } from "@/context/layout/manager";

// Hooks
import { usePageFactory } from "@/hooks/page/factory";

export default function TopBar() {
    const { items } = TopBarContext.usePanel();
    const { renderDeviceSelect } = usePageFactory();
    const deviceSelect = renderDeviceSelect();
    const version = process.env.NEXT_PUBLIC_APP_VERSION;

    return (
        <div className={CSS.TopBar}>
            {deviceSelect}

            {items.map(item => (
                <React.Fragment key={item.id}>
                    {item.component}
                </React.Fragment>
            ))}

            <div className={CSS.Version}>
                v{version}
            </div>
        </div>
    );
}