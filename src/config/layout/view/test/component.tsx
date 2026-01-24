"use client";
import React, { memo } from "react";

// Styles
import styles from './styles.module.scss';

/**
 * TestComponent - A simple test component for the test view
 */
const TestComponent: React.FC = () => {
    return (
        <div className={styles.TestComponent}>
            <h1>Test View</h1>
            <p>This is a test view component that demonstrates the view system.</p>

            <div className={styles.Content}>
                <h2>What is a View?</h2>
                <p>
                    A <strong>View</strong> is a specialized component that renders content within the <strong>ViewEditor</strong>.
                    Views are the core building blocks that allow different types of content and functionality to be displayed
                    in the editor interface.
                </p>

                <h2>Plugin Extensibility</h2>
                <p>
                    Any plugin can register its own custom views and view actions. This enables plugins to create
                    specialized interfaces for their specific needs:
                </p>
                <ul>
                    <li><strong>Content-Specific Views</strong>: A markdown plugin could create a "Markdown View" that only displays and edits markdown blocks</li>
                    <li><strong>Tool-Specific Views</strong>: A design plugin could add a "Design View" with specialized design tools</li>
                    <li><strong>Data Views</strong>: A data plugin could provide "Chart View" or "Table View" for data visualization</li>
                </ul>

                <h2>How Views Work</h2>
                <p>
                    Views are registered in the system and can be selected through the view navigation.
                    Each view receives the full context of the current bench and can access shared data,
                    perform actions, and render custom UI components.
                </p>

                <div className={styles.Note}>
                    <strong>Note:</strong> This test view serves as an example. Real plugins would replace this
                    with their own meaningful content and functionality.
                </div>
            </div>
        </div>
    );
};

export default memo(TestComponent);