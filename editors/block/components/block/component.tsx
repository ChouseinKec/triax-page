import React, { useCallback, memo, useMemo, useRef } from "react";
import CSS from './styles.module.css';

// Types
import type { BlockProps } from "./types";

// Components
import FloatReveal from "@/components/reveal/float/component";
import ActionGroup from "@/components/group/actions/component";

// Utilities & Context
import { useBlockEditorContext } from "../blocks/context";

/**
 * Block Component
 * Renders a single block and its children recursively.
 * Handles selection, styling, and block actions via context.
 */
const Block: React.FC<BlockProps> = memo(({ id }) => {
    // Context: block data and actions
    const {
        allBlocks,
        addBlock,
        deleteBlock,
        selectBlock,
        getBlockSelectedChild,
        selectedBlockID,
        getBlockChildren,
        getBlockCSS
    } = useBlockEditorContext();

    // Ref for positioning floating UI
    const containerRef = useRef<HTMLDivElement>(null);

    const isSelected = selectedBlockID === id;
    const children = getBlockChildren(id);
    const selectedChild = getBlockSelectedChild(id);
    const styleSTR = getBlockCSS(id);

    // Handle block selection (prevents bubbling to parent blocks)
    const handleSelect = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        selectBlock(id);
    },
        [id, selectBlock]
    );

    // Render block actions (toolbar)
    const ToolbarActions = (
        <ActionGroup>
            <button title='Add Block' onClick={() => { addBlock(id); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path></svg>
            </button>

            <button title='Delete Block' onClick={() => { deleteBlock(id); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256"><path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
            </button>
        </ActionGroup>
    );

    return (
        <div
            id={`block-${id}`}
            className={CSS.Block}
            data-is-selected={isSelected}
            data-has-selected-child={!!selectedChild}
            onClick={handleSelect}
            ref={containerRef}
        >
            {/* Block ID for debugging */}
            <span className={CSS.Block__id}>{id}</span>

            {/* Inject block-specific styles */}
            <style>{styleSTR}</style>

            {/* Render children recursively */}
            {children && (
                children.map(childId =>
                    allBlocks[childId] ? (
                        <Block key={childId} id={childId} />
                    ) : null
                )
            )}

            {/* Floating toolbar for block actions */}
            <FloatReveal isOpen={isSelected} targetRef={containerRef} position="top">
                <div className={CSS.Toolbar}>{ToolbarActions}</div>
            </FloatReveal>
        </div>
    );
});

export default Block;