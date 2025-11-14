"use client";
import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

const WorkbenchSemanticRender: React.FC = () => {
    return (
        <div className={CSS.WorkbenchSemantic}>
            <p>Semantic (HTML)</p>
        </div>
    );
}

export default memo(WorkbenchSemanticRender);