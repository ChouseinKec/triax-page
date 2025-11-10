"use client";

import React, { memo, useMemo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { InfoDataInstance } from "@/src/page-builder/core/editor/layout/types/info";
import type { InfoProps } from "./types";

// Managers
import { useInfoData } from "@/src/page-builder/services/managers/layout";

/**
 * Info Component
 * A static information display component that renders data items in a grid layout.
 * Not draggable or scalable, always visible for displaying contextual information.
 *
 * @param props - InfoProps
 * @returns The rendered Info or null if no data
 */
const Info: React.FC<InfoProps> = ({ title = "Info", position = { top: "0px", left: "0px" }, size = { width: "300px", height: "50px" }, infoID, grid = { columns: 1, rows: 1 } }) => {
    const dataItems = useInfoData(infoID);

    const dataInstances = useMemo(() => (
        dataItems && dataItems.length > 0
            ? dataItems
                .sort((a: InfoDataInstance, b: InfoDataInstance) => a.order - b.order)
                .map((dataItem: InfoDataInstance) => (
                    <div key={dataItem.id} className={CSS.GridItem}>
                        {dataItem.render()}
                    </div>
                ))
            : null
    ), [dataItems]
    );

    const styles = useMemo(() => ({
        top: position.top,
        left: position.left,
        width: size.width,
        height: size.height,
    }), [position, size]
    );

    const gridStyles = useMemo(() => ({
        gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
        gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
    }), [grid]
    );

    if(!dataInstances || dataInstances.length === 0) return null;

    return (
        <div className={CSS.Info} style={styles} title={title}>
            <div className={CSS.Grid} style={gridStyles}>
                {dataInstances}
            </div>
        </div>
    );
};

export default memo(Info);
