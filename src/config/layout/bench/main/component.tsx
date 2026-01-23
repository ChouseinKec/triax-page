"use client";
import React, { memo } from "react";

// Types
import type { BenchComponentProps } from "@/core/layout/bench/types";

// Components
import ViewEditor from "@/core/layout/view/components/editor";

/**
 * Renders the main workbench layout.
 * 
 * @param children - Child content to render inside the workbench
 * @returns JSX element representing the main workbench
 */
const BenchComponentMain: React.FC<BenchComponentProps> = () => {
    return (
        <ViewEditor />
    );
}
BenchComponentMain.displayName = "BenchComponentMain";
export default memo(BenchComponentMain);