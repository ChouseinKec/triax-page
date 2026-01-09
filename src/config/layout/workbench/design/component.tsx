"use client";
import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

const WorkbenchDesignRender: React.FC = () => {
    return (
        <div className={CSS.WorkbenchDesign}>
            <p>Design (CSS)</p>
        </div>
    );
}

export default memo(WorkbenchDesignRender);