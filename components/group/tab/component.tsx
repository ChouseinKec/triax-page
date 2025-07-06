import React, { memo, ReactElement, useCallback, useState } from 'react';

// Style
import CSS from './styles.module.css';

// Component
import RadioSelect from '@/components/select/radio/component';

// Type
import type { TabGroupProps } from './types';
import type { OptionData } from '@/types/option';

/**
 * TabGroup Component
 *
 * A compound component that manages a collection of tab items.
 * Only one item can be expanded at a time (accordion behavior).
 * 
 * @component
 * @param {TabGroupProps} props - Component props
 * @param {TabGroupItemsProps[]} props.items - Array of tab items with title/content pairs
 * @returns {ReactElement} - Returns a memoized tab group component
 */
const TabGroup: React.FC<TabGroupProps> = (props: TabGroupProps): ReactElement => {
    const { items } = props;

    // State to track which tab is currently selected
    const [selected, setSelected] = useState<string>('0');

    const handleSelect = useCallback((value: string): void => {
        if(!value) return setSelected('0');
        setSelected(value);
    }, []);

    /**
     * Renders the clickable toggle button for each tab item
     * @param {ReactElement} title - The title content to display
     * @param {number} index - Position of the item in the array
     * @returns {ReactElement} - Button element with click handler
     */
    const renderButtons = useCallback((): ReactElement => {
        const options: OptionData[] = items.map((item, idx) => ({
            name: typeof item.title === 'string' ? item.title : idx.toString(),
            icon: typeof item.title === 'object' ? item.title : undefined,
            value: idx.toString(),
        }));

        return <RadioSelect options={options} value={selected} onChange={handleSelect} />;

    }, [items, selected]);

    /**
     * Renders the collapsible content section for each item
     * @param {ReactElement} content - The content to display when expanded
     * @returns {ReactElement} - Content container div
     */
    const renderContent = useCallback((): ReactElement => {
        return items[parseInt(selected, 10)].content;
    }, [items, selected]);

    return (
        <div
            className={CSS.TabGroup}
            role="tablist"
            aria-multiselectable="false"
        >
            <>
                {renderContent()}
                {renderButtons()}
            </>
        </div>
    );
};

export default memo(TabGroup);