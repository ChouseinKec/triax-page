import React, { useCallback, useRef, useEffect, memo } from "react";

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';

// Managers
import { selectNode, } from '@/core/block/node/managers';
import { getNodeContent, setNodeContent } from '@/core/block/node/managers';
import { useBlockRenderedStyles } from '@/core/block/style/managers';

const BlockMarkdownComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, instance, isSelected }) => {
    const NodeID = instance.id;
    const BlockTag = instance.tag as React.ElementType;
    const renderedStyles = useBlockRenderedStyles(NodeID, deviceKey, orientationKey, pseudoKey);

    // Get the current text value from content
    const content = getNodeContent(NodeID);
    const text = content?.text || "Enter something...";

    // Ref to access the <p> element
    const textRef = useRef<HTMLElement>(null);

    // Handle block selection
    const handleSelectBlock = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            selectNode(NodeID);
        },
        [NodeID]
    );

    // Commit text to block content only on blur (focus lost)
    const handleBlur = useCallback(() => {
        const currentText = textRef.current?.innerText ?? "";
        setNodeContent(NodeID, { text: currentText });
    }, [NodeID]
    );

    return (
        <>
            <BlockTag
                ref={textRef as React.RefObject<any>}
                className={`block-${NodeID}`}
                onClick={handleSelectBlock}
                onBlur={handleBlur}
                data-block-type="container"
                data-is-selected={isSelected}
                contentEditable
                suppressContentEditableWarning
            >
                {text}

            </BlockTag>
            <style>{renderedStyles}</style>
        </>
    );
}

export default memo(BlockMarkdownComponent);