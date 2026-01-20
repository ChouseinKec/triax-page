"use client";
import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

const BenchLogicComponent: React.FC = () => {
    return (
        <div className={CSS.WorkbenchLogic}>
            <p>Logic (JS)</p>
        </div>
    );
}

export default memo(BenchLogicComponent);