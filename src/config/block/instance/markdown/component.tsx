import React, { useCallback, useRef, useEffect, memo } from "react";

// Types
import type { BlockComponentProps } from '@/core/block/instance/types';

// Managers
import { selectBlock, } from '@/core/block/instance/managers';
import { getBlockContent, setBlockContent } from '@/core/block/instance/managers';
import { registerBarAction, unregisterBarAction, isBarActionRegistered } from '@/core/layout/bar/managers';
import { useBlockRenderedStyles } from '@/core/block/style/managers/';
import device from "@/config/layout/view/block/device";

const BlockMarkdownComponent: React.FC<BlockComponentProps> = ({ deviceKey, orientationKey, pseudoKey, instance, isSelected }) => {
    const blockID = instance.id;
    const BlockTag = instance.tag as React.ElementType;
    const renderedStyles = useBlockRenderedStyles(blockID, deviceKey, orientationKey, pseudoKey);

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

    // useEffect(() => {
    //     const barID = "main-block-actions";
    //     const buttonBold = `${blockID}-bold`;
    //     const iconBold = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M178.48,115.7A44,44,0,0,0,148,40H80a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM88,56h60a28,28,0,0,1,0,56H88Zm72,136H88V128h72a32,32,0,0,1,0,64Z" /></svg>

    //     if (!isSelected) {
    //         if (isBarActionRegistered(barID, buttonBold)) unregisterBarAction(barID, buttonBold);
    //         return;
    //     }

    //     registerBarAction(barID, {
    //         id: buttonBold,
    //         title: 'Convert to Bold',
    //         order: 10,
    //         render: () => (
    //             <button>
    //                 {iconBold}
    //             </button>
    //         )
    //     });

    //     // Cleanup: unregister on unmount
    //     return () => {
    //         if (isBarActionRegistered(barID, buttonBold)) unregisterBarAction(barID, buttonBold);

    //     };

    // }, [blockID, instance, isSelected]
    // );

    return (
        <>
            <BlockTag
                ref={textRef as React.RefObject<any>}
                className={`block-${blockID}`}
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