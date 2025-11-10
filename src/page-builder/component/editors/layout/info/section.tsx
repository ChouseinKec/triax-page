"use client";
import React, { memo } from "react";

// Components
import Info from "./instance";

// Types
import type { InfoSectionProps } from "./types";

// Managers
import { getInfosByWorkbench } from "@/src/page-builder/service/managers/layout";

const InfoSection: React.FC<InfoSectionProps> = ({ selectedWorkbenchID }) => {
    const allInfos = getInfosByWorkbench(selectedWorkbenchID);

    return (
        allInfos && allInfos.length > 0
            ? allInfos.map(info => (
                <Info
                    key={info.id}
                    infoID={info.id}
                    position={info.position}
                    size={info.size}
                    grid={info.grid}
                    title={info.title}
                />
            ))
            : null
    )


};

export default memo(InfoSection);