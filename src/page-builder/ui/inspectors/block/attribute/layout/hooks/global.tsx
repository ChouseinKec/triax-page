"use client";

import React from "react";

// Types
import type { BlockAttributesLayoutProps } from "@/src/page-builder/ui/inspectors/block/types";
import type { AttributeKey } from "@/src/page-builder/core/block/attribute/types";

// Constants
import { getPropertyGroup } from "@/src/page-builder/core/block/attribute/constants";

// Managers
import { useSelectedBlockID } from "@/src/page-builder/services/managers/block";

// Components
import BlockAttributesValue from "@/src/page-builder/ui/inspectors/block/attribute/value/component";


/**
 * useGlobalLayout Hook
 * Provides the global attributes layout with reactive updates for better user experience.
 *
 * @returns The layout props with icon, title, and global attribute components
 */
export const useGlobalLayout = (): BlockAttributesLayoutProps => {
    const selectedBlockID = useSelectedBlockID();
    const layoutIcon = <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256"        >            <path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z" />  </svg>;

    if (!selectedBlockID) return { label: layoutIcon, title: "Global", groups: [] };

    const globalProps = getPropertyGroup("global")
        .filter((p) => p.name !== "id")
        .map((p) => {
            const key = p.name as AttributeKey;
            return {
                label: p.name,
                property: p.name,
                component: () => <BlockAttributesValue blockID={selectedBlockID} attribute={key} />,
            };
        });


    return {
        label: layoutIcon,
        title: "Global",
        groups: [
            {
                styles: { gridTemplateColumns: "minmax(0,1fr)" },
                properties: globalProps,
            },
        ],
    }
};