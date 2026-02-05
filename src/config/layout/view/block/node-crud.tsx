"use client";
import React, { useCallback, useMemo } from "react";

// Managers
import { deleteBlockNode, canBlockNodeBeDeleted, useSelectedBlockNodeID, } from "@/core/block/node/managers";
import { setPanelOpenState } from "@/core/layout/panel/managers";

const deleteIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" /></svg>)
const addIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" /></svg>)

const NodeCrud: React.FC = () => {
    // Retrieve selected node data using selective hooks for granular re-rendering
    const selectedNodeID = useSelectedBlockNodeID();


    // Handle element key change by updating the node's element key in the store
    const handleDelete = useCallback(() => {
        deleteBlockNode(selectedNodeID);
    }, [selectedNodeID]
    );

    const handleAdd = useCallback(() => {
        setPanelOpenState('library', true);
    }, []);

    const isDeletable = useMemo(() => {
        if (!selectedNodeID) return false;
        return canBlockNodeBeDeleted(selectedNodeID);
    }, [selectedNodeID]
    );

    return (
        <>
            <button
                onClick={handleDelete}
                data-is-disabled={!isDeletable}
            >
                {deleteIcon}
            </button>

            {/* <button
                onClick={handleAdd}
            >
                {addIcon}
            </button> */}
        </>
    );
};

export default NodeCrud;