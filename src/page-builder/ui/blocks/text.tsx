import React, { useCallback, useRef } from "react";

// Types
import type { BlockInstance } from '@/src/page-builder/core/block/block/types';

// Managers
import { useIsBlockSelected, selectBlock, useRenderedBlockAttributes, useRenderedBlockStyles } from '@/src/page-builder/services/managers/block';
import { setBlockAttribute, useBlockAttribute } from "@/src/page-builder/services/managers/block/attribute";

const TextRender: React.FC<{ instance: BlockInstance }> = ({ instance }) => {
    const blockID = instance.id;
    const isSelected = useIsBlockSelected(blockID);
    const blockAttributes = useRenderedBlockAttributes(blockID);
    const blockStyles = useRenderedBlockStyles(blockID);

    // Get the current text value from attributes
    const text = useBlockAttribute(blockID, "text") || "Enter something...";

    // Ref to access the <p> element
    const textRef = useRef<HTMLParagraphElement>(null);

    // Handle block selection
    const handleSelectBlock = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            selectBlock(blockID);
        },
        [blockID]
    );

    // Commit text to block attribute only on blur (focus lost)
    const handleBlur = useCallback(() => {
        const currentText = textRef.current?.innerText ?? "";
        setBlockAttribute(blockID, "text", currentText);
    }, [blockID]
    );

    return (
        <>
            <p
                ref={textRef}
                id={`block-${blockID}`}
                onClick={handleSelectBlock}
                onBlur={handleBlur}
                data-block-type="container"
                data-is-selected={isSelected}
                contentEditable
                suppressContentEditableWarning
                {...blockAttributes}
            >
                {text}

            </p>
            <style>{blockStyles}</style>
        </>
    );
}

export default TextRender;