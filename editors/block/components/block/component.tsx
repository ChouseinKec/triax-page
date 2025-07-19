import React, { useCallback, memo, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import CSS from "./styles.module.scss";

// Types
import type { BlockProps } from "./types";

// Components
import FloatReveal from "@/components/reveal/float/component";
import ActionGroup from "@/components/group/action/component";
import DropdownReveal from "@/components/reveal/dropdown/component";

// Utilities & Context
import { useBlockEditorContext } from "../blocks/context";

/**
 * Block Component
 * Renders a single block and its children recursively.
 * Handles selection, styling, and block actions via context.
 */
const Block: React.FC<BlockProps> = memo((props) => {
    const {
        id,
        content,
        isSelected,
        hasSelectedChild,
        styles,
        permittedContent,
        tag,
    } = props;

    // Context: block data and actions
    const {
        addBlock,
        deleteBlock,
        selectBlock,
        generateCSS,
        blocksNode,
    } = useBlockEditorContext();

    // Ref for positioning floating UI (works for any HTML element)
    const blockRef = useRef<HTMLElement | null>(null);

    // Generate block-specific CSS styles
    const styleSTR = useMemo(
        () => generateCSS(id, styles),
        [id, styles, generateCSS]
    );

    // Handle block selection (prevents bubbling to parent blocks)
    const handleSelect = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            selectBlock(id);
        },
        [id, selectBlock]
    );

    // Render block actions (toolbar)
    const ToolbarActions = useMemo(() => {
        const addIcon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" />
            </svg>
        );

        return (
            <ActionGroup>
                <DropdownReveal placeholder={addIcon} isDisabled={!permittedContent?.length}>
                    {permittedContent?.map((childTag) => (
                        <button
                            key={childTag}
                            title={`Add ${childTag} Block`}
                            onClick={() => addBlock(childTag, id)}
                        >
                            {childTag}
                        </button>
                    ))}
                </DropdownReveal>
                <button title="Delete Block" onClick={() => deleteBlock(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#201d1d" viewBox="0 0 256 256">
                        <path d="M176,128a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,128Zm56,0A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                    </svg>
                </button>
            </ActionGroup>
        );
    }, [addBlock, deleteBlock, id, permittedContent]);

    // Use dynamic tag for block rendering
    // 'as any' is used for flexibility with dynamic tags in JSX
    const Tag = tag as any;

    return (
        <>
            {/* Main block element */}
            <Tag
                id={`block-${id}`}
                className={CSS.Block}
                data-is-selected={isSelected}
                data-has-selected-descendant={hasSelectedChild}
                onClick={handleSelect}
                ref={blockRef}
            >
                {/* Inject block-specific styles */}
                <style>{styleSTR}</style>

                {/* Render child blocks recursively */}
                {content?.map((child) => (
                    <Block key={child.id} {...child} />
                ))}
            </Tag>

            {/* Render floating toolbar as a portal when block is selected */}
            {blocksNode &&
                createPortal(
                    <FloatReveal isOpen={isSelected} targetRef={blockRef} position="top">
                        {ToolbarActions}
                    </FloatReveal>,
                    blocksNode
                )}
        </>
    );
});

export default Block;