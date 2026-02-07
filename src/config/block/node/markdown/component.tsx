import React, { useCallback, useRef, memo, useState, useEffect } from "react";

// Style
import CSS from './styles.module.scss';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';
import type { NodeHighlight } from '@/core/block/node/types/instance';

// Managers
import { setBlockNodeSelectedNodeID, setBlockNodeHighlight } from '@/core/block/node/managers';
import { getBlockNodeData, setBlockNodeData, getBlockNodeChildNodeIDs, useBlockNodeElementKey } from '@/core/block/node/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Hooks
import { useHighlight } from '@/shared/hooks/interface/useHighlight';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

// Custom input component for markdown placeholder
const MarkdownInput: React.FC<{ nodeID: string }> = ({ nodeID }) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const defaultText = "Start writing your markdown content here...";

    // Set initial text
    useEffect(() => {
        if (spanRef.current) spanRef.current.innerText = defaultText;

    }, []
    );

    const handleSpanBlur = useCallback(() => {
        const currentText = spanRef.current?.innerText ?? "";
        const trimmedText = currentText.trim();

        // Only save if text is different from default placeholder and not empty
        if (trimmedText && trimmedText !== defaultText) {
            setBlockNodeData(nodeID, { text: trimmedText });
        } else {
            // Clear the data if it's just the default text or empty/whitespace
            setBlockNodeData(nodeID, { text: "" });
        }
    }, [nodeID, defaultText]);

    return (
        <span
            ref={spanRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleSpanBlur}
            className={CSS.EditableSpan}
        />
    );
};


const BlockMarkdownComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, nodeID, isSelected, children }) => {
    const nodeElementKey = useBlockNodeElementKey(nodeID);
    const renderedStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    // Get the current text value from data
    const data = getBlockNodeData(nodeID);

    // Check if this block has child segments
    const childNodeIDs = getBlockNodeChildNodeIDs(nodeID);
    const hasChildren = childNodeIDs ? childNodeIDs.length > 0 : false;

    // Ref to access the element
    const elementRef = useRef<HTMLElement>(null);

    // Callbacks for select/deselect
    const handleHighlight = useCallback((range: Range, selectedText: string) => {
        if (!isSelected || !nodeElementKey || hasChildren) return;

        // Check if the selection is within this element
        if (!elementRef.current?.contains(range.commonAncestorContainer)) return;

        const newHighlight: NodeHighlight = {
            id: nodeID,
            elementKey: nodeElementKey,
            text: selectedText,
            startOffset: range.startOffset,
            endOffset: range.endOffset,
        };

        setBlockNodeHighlight(newHighlight);
    }, [isSelected, hasChildren, nodeID, nodeElementKey]
    );

    // Deselect callback
    const handleDehighlight = useCallback(() => {
        setBlockNodeHighlight(null);
    }, []
    );

    // Handle block selection
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            setBlockNodeSelectedNodeID(nodeID);
        },
        [nodeID]
    );

    // Commit text to block data only on blur (focus lost) - only if no children
    const handleBlur = useCallback(() => {
        if (hasChildren) return;
        const currentText = elementRef.current?.innerText ?? "";

        setBlockNodeData(nodeID, { text: currentText });

    }, [nodeID, hasChildren]
    );

    // Use highlight hook
    useHighlight(handleHighlight, handleDehighlight);

    const showPlaceholder = (hasChildren || (data?.text && data.text.trim().length > 0));
    const Tag = nodeElementKey as React.ElementType;
    return (
        <>
            {showPlaceholder
                ? (
                    <Tag
                        ref={elementRef as React.RefObject<any>}
                        className={`block-${nodeID}`}
                        onClick={handleClick}
                        onBlur={handleBlur}
                        data-block-type="container"
                        data-is-selected={isSelected}
                        contentEditable={!hasChildren}
                        suppressContentEditableWarning={!hasChildren}
                    >
                        {hasChildren ? children : data?.text}
                        <style>{renderedStyles}</style>
                    </Tag>
                )
                : (
                    <Placeholder
                        component={() => <MarkdownInput nodeID={nodeID} />}
                        onSelect={handleClick}
                        isSelected={isSelected}
                    />
                )}
        </>
    );

}

export default memo(BlockMarkdownComponent);