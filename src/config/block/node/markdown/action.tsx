import React, { memo } from 'react';

// Styles
import CSS from './styles.module.scss';

// Types
import type { ElementKey } from '@/core/block/element/types';

// Managers
import { convertBlockNodeHighlightToNodes, useBlockNodeHighlight, useSelectedBlockNodeElementKey } from '@/core/block/node/managers';

// Components
import ActionGroup from '@/shared/components/group/action/component';
import DropdownReveal from '@/shared/components/reveal/dropdown/component';

// Define types for actions
type ButtonAction = { tag: ElementKey; label: string; icon: React.ReactNode };
type DropdownAction = { tag: ElementKey; label: string };

// Define the supported actions
const buttonActions: ButtonAction[] = [
    { tag: 'small', label: 'Small', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M87.24,52.59a8,8,0,0,0-14.48,0l-64,136a8,8,0,1,0,14.48,6.81L39.9,160h80.2l16.66,35.4a8,8,0,1,0,14.48-6.81ZM47.43,144,80,74.79,112.57,144ZM200,96c-12.76,0-22.73,3.47-29.63,10.32a8,8,0,0,0,11.26,11.36c3.8-3.77,10-5.68,18.37-5.68,13.23,0,24,9,24,20v3.22A42.76,42.76,0,0,0,200,128c-22.06,0-40,16.15-40,36s17.94,36,40,36a42.73,42.73,0,0,0,24-7.25,8,8,0,0,0,16-.75V132C240,112.15,222.06,96,200,96Zm0,88c-13.23,0-24-9-24-20s10.77-20,24-20,24,9,24,20S213.23,184,200,184Z" /></svg> },
    { tag: 'del', label: 'Delete', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960" fill="white"><path d="m576-80-56-56 104-104-104-104 56-56 104 104 104-104 56 56-104 104 104 104-56 56-104-104L576-80ZM120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Z" /></svg> },
    { tag: 'ins', label: 'Insert', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960" fill="white"><path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z" /></svg> },
    { tag: 'u', label: 'Underline', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M60.59,175.24a8,8,0,0,0,10.65-3.83L87.9,136h80.2l16.66,35.41a8,8,0,1,0,14.48-6.82l-64-136a8,8,0,0,0-14.48,0l-64,136A8,8,0,0,0,60.59,175.24ZM128,50.79,160.57,120H95.43ZM224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Z" /></svg> },
    { tag: 'mark', label: 'Mark', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M253.66,106.34a8,8,0,0,0-11.32,0L192,156.69,107.31,72l50.35-50.34a8,8,0,1,0-11.32-11.32L96,60.69A16,16,0,0,0,93.18,79.5L72,100.69a16,16,0,0,0,0,22.62L76.69,128,18.34,186.34a8,8,0,0,0,3.13,13.25l72,24A7.88,7.88,0,0,0,96,224a8,8,0,0,0,5.66-2.34L136,187.31l4.69,4.69a16,16,0,0,0,22.62,0l21.19-21.18A16,16,0,0,0,203.31,168l50.35-50.34A8,8,0,0,0,253.66,106.34ZM93.84,206.85l-55-18.35L88,139.31,124.69,176ZM152,180.69,83.31,112,104,91.31,172.69,160Z" /></svg> },
    { tag: 'sub', label: 'Subscript', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M248,208a8,8,0,0,1-8,8H192a8,8,0,0,1-6.4-12.8l43.17-57.56a16,16,0,1,0-27.86-15,8,8,0,0,1-15.09-5.34,32.18,32.18,0,0,1,4.63-8.59,32,32,0,0,1,51.11,38.52L208,200h32A8,8,0,0,1,248,208ZM149.24,50a8,8,0,0,0-11.29.81L92,103.78l-45.95-53A8,8,0,0,0,34,61.24L81.41,116,34,170.76a8,8,0,0,0,12.1,10.48l46-53,45.95,53a8,8,0,1,0,12.1-10.48L102.59,116l47.46-54.76A8,8,0,0,0,149.24,50Z" /></svg> },
    { tag: 'sup', label: 'Superscript', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M248,144a8,8,0,0,1-8,8H192a8,8,0,0,1-6.4-12.8l43.17-57.55a16,16,0,1,0-27.86-15,8,8,0,0,1-15.09-5.33,32,32,0,1,1,55.74,29.92L208,136h32A8,8,0,0,1,248,144ZM149.24,74a8,8,0,0,0-11.29.8L92,127.79l-45.95-53A8,8,0,0,0,34,85.24L81.41,140,34,194.76a8,8,0,0,0,12.1,10.48l46-53,45.95,53a8,8,0,1,0,12.1-10.48L102.59,140l47.46-54.76A8,8,0,0,0,149.24,74Z" /></svg> },
    { tag: 'code', label: 'Code', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z" /></svg> },
    { tag: 's', label: 'Strikethrough', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H175.93c9.19,7.11,16.07,17.2,16.07,32,0,13.34-7,25.7-19.75,34.79C160.33,211.31,144.61,216,128,216s-32.33-4.69-44.25-13.21C71,193.7,64,181.34,64,168a8,8,0,0,1,16,0c0,17.35,22,32,48,32s48-14.65,48-32c0-14.85-10.54-23.58-38.77-32H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM76.33,104a8,8,0,0,0,7.61-10.49A17.3,17.3,0,0,1,83.11,88c0-18.24,19.3-32,44.89-32,18.84,0,34.16,7.42,41,19.85a8,8,0,0,0,14-7.7C173.33,50.52,152.77,40,128,40,93.29,40,67.11,60.63,67.11,88a33.73,33.73,0,0,0,1.62,10.49A8,8,0,0,0,76.33,104Z" /></svg> },
    { tag: 'dfn', label: 'Definition', icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z" /></svg> },
];

const dropdownActions = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960" fill="white"><path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" /></svg>,
        actions: [
            { tag: 'b', label: 'Bold' },
            { tag: 'strong', label: 'Strong' },
        ] as DropdownAction[],
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960" fill="white"><path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" /></svg>,
        actions: [
            { tag: 'i', label: 'Italic' },
            { tag: 'em', label: 'Emphasis' },
        ] as DropdownAction[],
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 -960 960 960" fill="white"><path d="m228-240 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T458-480L320-240h-92Zm360 0 92-160q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 23-5.5 42.5T818-480L680-240h-92ZM320-500q25 0 42.5-17.5T380-560q0-25-17.5-42.5T320-620q-25 0-42.5 17.5T260-560q0 25 17.5 42.5T320-500Zm360 0q25 0 42.5-17.5T740-560q0-25-17.5-42.5T680-620q-25 0-42.5 17.5T620-560q0 25 17.5 42.5T680-500Zm0-60Zm-360 0Z" /></svg>,
        actions: [
            { tag: 'q', label: 'Quote' },
            { tag: 'cite', label: 'Cite' },
        ] as DropdownAction[],
    },
];

/**
 * Calculates if an action should be disabled based on the selected tag and highlighted text.
 */
const getIsDisabled = (actionTag: ElementKey, selectedTag: ElementKey, highlightedText: any): boolean => {
    const hasHighlight = highlightedText?.text?.length > 0;
    return actionTag === selectedTag ? false : !hasHighlight;
};

/**
 * Creates a button element for an action with proper disable logic.
 */
const createActionButton = (
    action: { tag: ElementKey; label?: string; icon?: React.ReactNode },
    selectedTag: ElementKey,
    highlightedText: any,
    onAction: (tag: ElementKey) => void,
    className?: string,
): React.ReactElement => {
    const isDisabled = getIsDisabled(action.tag, selectedTag, highlightedText);
    return (
        <button
            className={className}
            key={action.tag}
            title={action.label || action.tag}
            onClick={() => !isDisabled && onAction(action.tag)}
            data-is-disabled={isDisabled ? 'true' : 'false'}
            data-is-active={action.tag === selectedTag ? 'true' : 'false'}
        >
            {action.icon || action.label}
        </button>
    );
};

/**
 * Component that renders a toolbar with buttons for all supported markdown actions.
 */
const MarkdownActionToolbar: React.FC = () => {
    const highlightedText = useBlockNodeHighlight();
    const selectedTag = useSelectedBlockNodeElementKey();

    if (!selectedTag) return null;

    const hasHighlight = (highlightedText?.text?.length ?? 0) > 0;
    return (
        <ActionGroup direction="horizontal">
            {dropdownActions.map((dropdown, index) => (
                <DropdownReveal
                    key={index}
                    placeholder={dropdown.icon}
                    isDisabled={!hasHighlight && !dropdown.actions.some(action => action.tag === selectedTag)}
                    isActive={dropdown.actions.some(action => action.tag === selectedTag)}
                    anchor="top"
                >
                    {dropdown.actions.map(action =>
                        createActionButton(action, selectedTag, highlightedText, tag => convertBlockNodeHighlightToNodes('core-markdown', tag), CSS.Action)
                    )}
                </DropdownReveal>
            ))}

            {buttonActions.map(action =>
                createActionButton(action, selectedTag, highlightedText, tag => convertBlockNodeHighlightToNodes('core-markdown', tag))
            )}
        </ActionGroup>
    );
};

export default memo(MarkdownActionToolbar);