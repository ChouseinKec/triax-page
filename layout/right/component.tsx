"use client";
import React, { useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import PanelGroup from "@/components/group/panel/component";

// Types
import type { PanelGroupItemsProps } from "@/components/group/panel/types";

// Context
import { RightPanel as RightPanelContext } from "@/context/layout/manager";

export default function RightPanel() {
    const { items } = RightPanelContext.usePanel();

    if (!items || items.length === 0) {
        return null;
    }

    const PanelItems: PanelGroupItemsProps[] = items
        .filter(item => item.component !== undefined)
        .map((item) => ({
            label: item.icon,
            title: item.id,
            content: item.component
        }));

    return (
        <div className={CSS.RightPanel}>
            <PanelGroup
                tabPosition="left"
                items={PanelItems}
            />
        </div>
    );
}