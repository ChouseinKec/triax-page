"use client";
import React, { useCallback, memo } from "react";

// Components
import ActionGroup from "@/src/shared/components/group/action/component";

// Managers
import { setPanelLockedState, setPanelOpenState } from "@/src/core/layout/panel/managers";

// Types
import type { ActionsProps } from "./types";

/**
 * Actions Component
 * Renders the header actions for a panel (lock and close buttons).
 */
const Actions: React.FC<ActionsProps> = ({ panelKey, isLocked }) => {

    const handleLock = useCallback(() => {
        setPanelLockedState(panelKey, !isLocked);
    }, [panelKey, isLocked]
    );

    const handleClose = useCallback(() => {
        setPanelOpenState(panelKey, false);
    }, [panelKey]
    );

    return (
        <ActionGroup>
            <button title="Lock" data-is-active={isLocked} onClick={handleLock}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffffff" viewBox="0 0 256 256">
                    <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z" />
                </svg>
            </button>
            <button onClick={handleClose} title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffffff" viewBox="0 0 256 256">
                    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                </svg>
            </button>
        </ActionGroup>
    );
};

export default memo(Actions);