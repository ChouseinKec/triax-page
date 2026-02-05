import React from 'react';

// Types
import type { PlaceholderProps } from './types';

// Styles
import CSS from './styles.module.scss';

/**
 * Shared Placeholder Component
 *
 * A flexible placeholder component for empty states in block components.
 * Provides consistent styling with customization options.
 */
const Placeholder: React.FC<PlaceholderProps> = ({ message, description, actions, icon, component: CustomComponent, onSelect, as: Element = 'div', isSelected, wrap }) => {

    const renderWrapped = (content: React.ReactNode, wrappers: (React.ElementType | string)[]): React.ReactNode => {
        return wrappers.reduceRight((acc, Wrapper) => React.createElement(Wrapper, {}, acc), content);
    };

    const placeholderContent = (
        <>
            {icon && (
                <div className={CSS.icon}>
                    {icon}
                </div>
            )}

            <div className={CSS.message}>
                {message}
            </div>

            {description && (
                <div className={CSS.description}>
                    {description}
                </div>
            )}

            {CustomComponent && (
                <div className={CSS.customComponent}>
                    <CustomComponent />
                </div>
            )}

            {actions && actions.length > 0 && (
                <div className={CSS.actions}>
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.onClick}
                            className={index === 0 ? CSS.button : CSS.secondaryButton}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </>
    );

    const finalContent = wrap ? renderWrapped(placeholderContent, wrap) : placeholderContent;

    return (
        <Element
            className={CSS.placeholder}
            onClick={onSelect}
            data-is-selected={isSelected}
        >
            {finalContent}
        </Element>
    );
};

export default Placeholder;