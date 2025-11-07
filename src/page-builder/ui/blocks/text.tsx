import React, { useCallback, useRef } from "react";

// Types
import type { BlockInstance } from '@/src/page-builder/core/block/block/types';

// Managers
import { useIsBlockSelected, selectBlock, useRenderedBlockAttributes, useRenderedBlockStyles } from '@/src/page-builder/services/managers/block';
import { getBlockContent, setBlockContent } from '@/src/page-builder/services/managers/block';

const TextRender: React.FC<{ instance: BlockInstance }> = ({ instance }) => {
    const blockID = instance.id;
    const BlockTag = instance.tag;
    const isSelected = useIsBlockSelected(blockID);
    const renderedAttributes = useRenderedBlockAttributes(blockID);
    const renderedStyles = useRenderedBlockStyles(blockID);

    // Get the current text value from content
    const content = getBlockContent(blockID);
    const text = content?.text || "Enter something...";

    // Ref to access the <p> element
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
        <>
            <BlockTag
                ref={textRef as React.RefObject<any>}
                id={`block-${blockID}`}
                onClick={handleSelectBlock}
                onBlur={handleBlur}
                data-block-type="container"
                data-is-selected={isSelected}
                contentEditable
                suppressContentEditableWarning
                {...renderedAttributes}
            >
                {text}

            </BlockTag>
            <style>{renderedStyles}</style>
        </>
    );
}

export default TextRender;