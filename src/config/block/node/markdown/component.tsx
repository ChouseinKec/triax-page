import React, { useCallback, useRef, memo } from "react";

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Managers
import { selectNode, setHighlightNodeText } from '@/core/block/node/managers';
import { getNodeContent, setNodeContent } from '@/core/block/node/managers';
import { useBlockRenderedStyles } from '@/core/block/style/managers';

const BlockMarkdownComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, instance, isSelected, children }) => {
    const nodeID = instance.id;
    const BlockTag = instance.tag as React.ElementType;
    const renderedStyles = useBlockRenderedStyles(nodeID, deviceKey, orientationKey, pseudoKey);

    // Get the current text value from content
    const content = getNodeContent(nodeID);
    const text = content?.text || "Enter something...";

    // Check if this block has child segments
    const hasChildren = instance.contentIDs.length > 0;

    // Ref to access the element
    const elementRef = useRef<HTMLElement>(null);

    // Handle block selection
    const handleSelect = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            selectNode(nodeID);
        },
        [nodeID]
    );

    // Commit text to block content only on blur (focus lost) - only if no children
    const handleBlur = useCallback(() => {
        if (hasChildren) return;

        const currentText = elementRef.current?.innerText ?? "";
        setNodeContent(nodeID, { text: currentText });
    }, [nodeID, hasChildren]
    );

    // Handle text highlight - only if no children
    const handleHighlight = useCallback(() => {
        if (!isSelected || hasChildren) return;

        // Get the current selection
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return setHighlightNodeText(null);

        // Get the first range of the selection
        const range = selection.getRangeAt(0);
        const selectedText = selection.toString();
        if (selectedText.length <= 0) return setHighlightNodeText(null);

        // Set the highlightedNode text in the store
        setHighlightNodeText({
            id: nodeID,
            tag: instance.tag,
            text: selectedText,
            startOffset: range.startOffset,
            endOffset: range.endOffset,
        });

    }, [isSelected, hasChildren, nodeID]
    );

    return (
        <>
            <BlockTag
                ref={elementRef as React.RefObject<any>}
                className={`block-${nodeID}`}
                onClick={handleSelect}
                onBlur={handleBlur}
                onSelect={handleHighlight}
                data-block-type="container"
                data-is-selected={isSelected}
                contentEditable={!hasChildren}
                suppressContentEditableWarning={!hasChildren}
            >
                {hasChildren ? children : text}
            </BlockTag>
            <style>{renderedStyles}</style>
        </>
    );
}

export default memo(BlockMarkdownComponent);