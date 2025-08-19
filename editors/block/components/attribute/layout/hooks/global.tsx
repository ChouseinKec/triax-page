"use client";

import React, { useMemo } from "react";

// Types
import type { LayoutProps } from "../type";
import type { HTMLPropertyKey } from "@/types/block/attribute/property";

// Hooks
import { useAttributeFactory } from "@/hooks/block/attribute/factory";

// Constants
import { HTMLPropertyDefinitions } from "@/constants/block/attribute";

/**
 * Custom hook to render the layout for global attributes.
 * This hook generates the structure and behavior of the "Global" section in the attributes panel.
 *
 */
export const useGlobalLayout = (): LayoutProps => {
    const { renderValue } = useAttributeFactory();

    const icon = useMemo(() => (
        <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="black"
            viewBox="0 0 256 256"
        >
            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z" />
        </svg>
    ),
        []
    );

    // Collect global properties from registry once
    const globalProps = useMemo(() =>
        Object.values(HTMLPropertyDefinitions)
            .filter((p) => p?.category === "global" && p.name !== "id")
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((p) => {
                const key = p.name as HTMLPropertyKey;
                return {
                    label: p.name,
                    property: p.name,
                    component: () => renderValue(key),
                };
            }),
        [renderValue]
    );

    // Final layout object (memoized)
    return useMemo(
        () => ({
            label: icon,
            title: "Global",
            groups: [
                {
                    styles: { gridTemplateColumns: "minmax(0,1fr)" },
                    properties: globalProps.length ? globalProps : [],
                },
            ],
        }),
        [icon, globalProps]
    );
};