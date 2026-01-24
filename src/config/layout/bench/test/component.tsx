"use client";
import { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

const BenchTestComponent: React.FC = () => {
    return (
        <div className={CSS.BenchEditorLogic}>
            <h1>Test Bench</h1>
            <p>This is a test bench component that demonstrates the bench system.</p>

            <div className={CSS.Content}>
                <h2>What is a Bench?</h2>
                <p>
                    A <strong>Bench</strong> represents a complete workspace or working area within the application.
                    It's the highest level organizational unit that contains and manages multiple panels.
                    Think of it as a "desktop" or "workspace" where different tools and views come together.
                </p>

                <h2>Bench-Panel Relationship</h2>
                <p>
                    Each bench owns and manages its collection of panels. The <strong>BenchEditor</strong> is responsible for:
                </p>
                <ul>
                    <li>Rendering the selected bench's panels</li>
                    <li>Managing bench-level navigation and actions</li>
                    <li>Providing the layout context for panels</li>
                </ul>

                <h2>Plugin Extensibility</h2>
                <p>
                    Plugins can register their own custom benches to create specialized workspaces:
                </p>
                <ul>
                    <li><strong>Content Creation Bench</strong>: A writing plugin could provide a bench focused on content creation with panels for editing, preview, and publishing</li>
                    <li><strong>Design Bench</strong>: A design plugin could create a bench with panels for canvas, tools, layers, and properties</li>
                    <li><strong>Development Bench</strong>: A coding plugin could offer a bench with panels for code editor, terminal, file explorer, and debugging</li>
                </ul>

                <h2>Optional ViewEditor Integration</h2>
                <p>
                    While benches have complete freedom in their rendering, they can optionally integrate with the <strong>ViewEditor</strong> system.
                    Benches that want to provide view-based content can:
                </p>
                <ul>
                    <li>Include <code>&lt;ViewEditor /&gt;</code> in their component</li>
                    <li>Register custom views scoped to their bench</li>
                    <li>Provide specialized views for their specific use cases</li>
                </ul>
                <p>
                    For example, a "Design Bench" could register views for "Canvas", "Tools", and "Properties" panels.
                </p>

                <div className={CSS.Note}>
                    <strong>Note:</strong> This test bench serves as an example. Real plugins would implement
                    meaningful bench logic and panel management for their specific use cases.
                </div>
            </div>
        </div>
    );
}

export default memo(BenchTestComponent);