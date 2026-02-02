import React, { useCallback, useRef, memo } from "react";

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';
import type { HighlightedNode } from '@/core/block/node/types/instance';

// Managers
import { setSelectedNodeID, setHighlightNodeText } from '@/core/block/node/managers';
import { getNodeInstanceData, setNodeInstanceData } from '@/core/block/node/managers';
import { useBlockRenderedStyles } from '@/core/block/style/managers';

// Hooks
import { useHighlight } from '@/shared/hooks/interface/useHighlight';

// Components
// import Placeholder from '@/shared/components/placeholder/block/component';


const BlockMarkdownComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, instance, isSelected, children }) => {
    const nodeID = instance.id;
    const NodeElementKey = instance.elementKey as React.ElementType;
    const renderedStyles = useBlockRenderedStyles(nodeID, deviceKey, orientationKey, pseudoKey);

    // Get the current text value from data
    const data = getNodeInstanceData(nodeID);
    const text = data?.text || "Start writing your markdown content here...";

    // Check if this block has child segments
    const hasChildren = instance.childNodeIDs.length > 0;

    // Ref to access the element
    const elementRef = useRef<HTMLElement>(null);

    // Callbacks for select/deselect
    const handleHighlight = useCallback((range: Range, selectedText: string) => {
        if (!isSelected || hasChildren) return;

        // Check if the selection is within this element
        if (!elementRef.current?.contains(range.commonAncestorContainer)) return;

        const newHighlight: HighlightedNode = {
            id: nodeID,
            elementKey: instance.elementKey,
            text: selectedText,
            startOffset: range.startOffset,
            endOffset: range.endOffset,
        };

        setHighlightNodeText(newHighlight);
    }, [isSelected, hasChildren, nodeID, instance.elementKey]
    );

    // Deselect callback
    const handleDehighlight = useCallback(() => {
        setHighlightNodeText(null);
    }, []
    );

    // Handle block selection
    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            setSelectedNodeID(nodeID);
        },
        [nodeID]
    );

    // Commit text to block data only on blur (focus lost) - only if no children
    const handleBlur = useCallback(() => {
        if (hasChildren) return;

        const currentText = elementRef.current?.innerText ?? "";
        const defaultText = "Start writing your markdown content here...";

        // Only save if text is different from default placeholder
        if (currentText !== defaultText) {
            setNodeInstanceData(nodeID, { text: currentText });
        } else {
            // Clear the data if it's just the default text
            setNodeInstanceData(nodeID, { text: "" });
        }
    }, [nodeID, hasChildren]
    );

    // Use highlight hook
    useHighlight(handleHighlight, handleDehighlight);


    return (
        <>
            <NodeElementKey
                ref={elementRef as React.RefObject<any>}
                className={`block-${nodeID}`}
                onClick={handleClick}
                onBlur={handleBlur}
                data-block-type="container"
                data-is-selected={isSelected}
                contentEditable={!hasChildren}
                suppressContentEditableWarning={!hasChildren}
            >
                {hasChildren ? children : text}
            </NodeElementKey>
            < style > {renderedStyles}</style >
        </>
    );

}

export default memo(BlockMarkdownComponent);