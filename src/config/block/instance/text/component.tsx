import React, { useCallback, useRef, memo } from "react";

// Types
import type { BlockComponentProps } from '@/src/core/block/instance/types';

// Managers
import { selectBlock } from '@/src/core/block/instance/managers';
import { getBlockContent, setBlockContent } from '@/src/core/block/instance/managers';

const BlockTextComponent: React.FC<BlockComponentProps> = ({ isSelected, instance }) => {
    const blockID = instance.id;
    const BlockTag = instance.tag as React.ElementType;

    // Get the current text value from content
    const content = getBlockContent(blockID);
    const text = content?.text || "";

    // Ref to access the element
    const textRef = useRef<HTMLElement>(null);

    // Handle block selection
    const handleSelectBlock = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            selectBlock(blockID);
        },
        [blockID]
    );

    // Commit text to block content only on blur (focus lost)
    const handleBlur = useCallback(() => {
        const currentText = textRef.current?.innerText ?? "";
        setBlockContent(blockID, { text: currentText });
    }, [blockID]
    );

    return (
        <BlockTag
            ref={textRef as React.RefObject<any>}
            className={`block-${blockID}`}
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
