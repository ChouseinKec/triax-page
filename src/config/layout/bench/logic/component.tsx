"use client";
import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

const BenchLogicComponent: React.FC = () => {
    return (
        <div className={CSS.BenchEditorLogic}>
            <p>Logic (JS)</p>
        </div>
    );
}

export default memo(BenchLogicComponent);