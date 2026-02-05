import React, { useCallback, useRef, memo, useState } from "react";

// Style
import CSS from './styles.module.scss';

// Types
import type { NodeComponentProps } from '@/core/block/node/types/definition';
import type { NodeHighlight } from '@/core/block/node/types/instance';

// Managers
import { setBlockNodeSelectedNodeID, setBlockNodeHighlight } from '@/core/block/node/managers';
import { getBlockNodeData, setBlockNodeData } from '@/core/block/node/managers';
import { useBlockStylesRendered } from '@/core/block/style/managers';

// Hooks
import { useHighlight } from '@/shared/hooks/interface/useHighlight';

// Components
import Placeholder from '@/shared/components/placeholder/block/component';

// Custom input component for markdown placeholder
const MarkdownInput: React.FC<{ nodeID: string }> = ({ nodeID }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
    }, []);

    const handleOnBlur = useCallback(() => {
        setBlockNodeData(nodeID, { text: inputValue });
    }, [inputValue, nodeID]);

    return (
        <input
            className={CSS.Input}
            type="text"
            onBlur={handleOnBlur}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter markdown text..."
        />
    );
};


const BlockMarkdownComponent: React.FC<NodeComponentProps> = ({ deviceKey, orientationKey, pseudoKey, instance, isSelected, children }) => {
    const nodeID = instance.id;
    const NodeElementKey = instance.elementKey as React.ElementType;
    const renderedStyles = useBlockStylesRendered(nodeID, deviceKey, orientationKey, pseudoKey);

    // Get the current text value from data
    const data = getBlockNodeData(nodeID);

    // Check if this block has child segments
    const hasChildren = instance.childNodeIDs.length > 0;

    // Ref to access the element
    const elementRef = useRef<HTMLElement>(null);

    // Callbacks for select/deselect
    const handleHighlight = useCallback((range: Range, selectedText: string) => {
        if (!isSelected || hasChildren) return;

        // Check if the selection is within this element
        if (!elementRef.current?.contains(range.commonAncestorContainer)) return;

        const newHighlight: NodeHighlight = {
            id: nodeID,
            elementKey: instance.elementKey,
            text: selectedText,
            startOffset: range.startOffset,
            endOffset: range.endOffset,
        };

        setBlockNodeHighlight(newHighlight);
    }, [isSelected, hasChildren, nodeID, instance.elementKey]
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

    const hasContent = hasChildren || (data?.text && data.text.trim().length > 0);
    return (
        <>
            {hasContent
                ? (
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
                        {hasChildren ? children : data?.text}
                        <style>{renderedStyles}</style>
                    </NodeElementKey>
                )
                : (
                    <Placeholder
                        message="Empty Markdown Block"
                        description="Start writing your markdown content"
                        component={() => <MarkdownInput nodeID={nodeID} />}
                        onSelect={handleClick}
                        isSelected={isSelected}
                    />
                )}
        </>
    );

}

export default memo(BlockMarkdownComponent);