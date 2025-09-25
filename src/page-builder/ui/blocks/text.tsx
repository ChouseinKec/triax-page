import React, { useCallback, useRef } from "react";

// Types
import type { BlockInstance } from '@/src/page-builder/core/block/block/types';

// Managers
import { useHasBlockSelectedContent, useIsBlockSelected, selectBlock, useRenderedBlockAttributes, useRenderedBlockStyles } from '@/src/page-builder/services/managers/block';
import { setBlockAttribute, useBlockAttribute } from "@/src/page-builder/services/managers/block/attribute";

const TextRender: React.FC<{ instance: BlockInstance }> = ({ instance }) => {
    const isSelected = useIsBlockSelected(instance.id);
    const hasChildSelected = useHasBlockSelectedContent(instance.id);
    const BlockAttributes = useRenderedBlockAttributes(instance.id);
    const BlockStyles = useRenderedBlockStyles(instance.id);

    // Get the current text value from attributes
    const text = useBlockAttribute(instance.id, "text") || "Enter something...";

    // Ref to access the <p> element
    const pRef = useRef<HTMLParagraphElement>(null);

    // Handle block selection
    const handleSelectBlock = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            selectBlock(instance.id);
        },
        [selectBlock, instance.id]
    );

    // Commit text to block attribute only on blur (focus lost)
    const handleBlur = useCallback(() => {
        const currentText = pRef.current?.innerText ?? "";
        setBlockAttribute(instance.id, "text", currentText);
    }, [setBlockAttribute, instance.id]
    );

    return (
        <>
            <p
                ref={pRef}
                id={`block-${instance.id}`}
                onClick={handleSelectBlock}
                onBlur={handleBlur}
                data-block-type="container"
                data-is-selected={isSelected}
                data-has-selected-descendant={hasChildSelected}
                contentEditable
                suppressContentEditableWarning
                {...BlockAttributes}
            >
                {text}

            </p>
            <style>{BlockStyles}</style>
        </>
    );
}

export default TextRender;