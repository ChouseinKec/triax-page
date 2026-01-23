"use client";
import React, { useMemo } from "react";

// Managers
import { useSelectedBenchKey, setSelectedBenchEditorKey } from "@/core/layout/bench/managers";

// Components
import RadioSelect from "@/shared/components/select/radio/component";

// Registry
import { getRegisteredBenches } from "@/core/layout/bench/state/registry";

/**
 * BenchSelect Component
 * Renders a radio select component for choosing the active workbench.
 *
 * @returns The rendered workbench selector component
 */
const BenchSelect: React.FC = () => {
    const benchDefinitions = getRegisteredBenches();
    const selectedBenchKey = useSelectedBenchKey();

    // Prepare options for the workbench selector
    const benchOptions = useMemo(() => {
        return Object.values(benchDefinitions).map((bench) => ({
            name: bench.name,
            value: bench.key,
            icon: bench.icon,
            order: bench.order,
        })).sort((a, b) => a.order - b.order);
    }, [benchDefinitions]
    );

    return (
        <RadioSelect
            value={selectedBenchKey}
            options={benchOptions}
            onChange={(value) => setSelectedBenchEditorKey(value as string)}
            prioritizeIcons
            clearable={false}
            direction="vertical"
        />
    );
};

export default BenchSelect;
