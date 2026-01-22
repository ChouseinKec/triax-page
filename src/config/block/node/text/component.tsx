import React, { useCallback, useRef, memo } from "react";

// Types
import type { NodeComponentProps } from '@/core/block/node/definition/types/definition';

// Managers
import { selectNode } from '@/core/block/node/instance/managers';
import { getNodeContent, setNodeContent } from '@/core/block/node/instance/managers';

const BlockTextComponent: React.FC<NodeComponentProps> = ({ isSelected, instance }) => {
    const NodeID = instance.id;
    const BlockTag = instance.tag as React.ElementType;

    // Get the current text value from content
    const content = getNodeContent(NodeID);
    const text = content?.text || "";

    // Ref to access the element
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
        <BlockTag
            ref={textRef as React.RefObject<any>}
            className={`block-${NodeID}`}
            onClick={handleSelectBlock}
            onBlur={handleBlur}
            data-block-type="plain-text"
            data-is-selected={isSelected}
            contentEditable
            suppressContentEditableWarning
        >
            {text}
        </BlockTag>
    );
}

export default memo(BlockTextComponent);
