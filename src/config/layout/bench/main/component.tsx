"use client";
import React, { memo } from "react";

// Types
import type { BenchComponentProps } from "@/src/core/layout/workbench/types";

// Components
import Viewport from "@/src/core/layout/viewport/components/editor";

/**
 * Renders the main workbench layout.
 * 
 * @param children - Child content to render inside the workbench
 * @returns JSX element representing the main workbench
 */
const BenchComponentMain: React.FC<BenchComponentProps> = () => {
    return (
        <Viewport />
    );
}
BenchComponentMain.displayName = "BenchComponentMain";
export default memo(BenchComponentMain);