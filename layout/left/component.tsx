"use client";
import React from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import ActionGroup from "@/components/group/action/component";

// Context
import { LeftBar as LeftBarContext } from "@/context/layout/manager";

export default function LeftBar() {
    const { items } = LeftBarContext.usePanel();

    return (
        <div className={CSS.LeftBar}>
            <ActionGroup direction="vertical">
                {items.sort((a, b) => a.order - b.order).map(item => (
                    <React.Fragment key={item.id}>
                        {item.component}
                    </React.Fragment>
                ))}
            </ActionGroup>
        </div>
    );
}