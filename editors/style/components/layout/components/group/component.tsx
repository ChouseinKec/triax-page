"use client";

import { memo, ReactElement } from "react";

// Styles
import CSS from "./styles.module.scss";

// Components
import Property from "@/editors/style/components/layout/components/property/components";
import DividerReveal from "@/components/reveal/divider/component";
import HorizontalDivider from "@/components/divider/horizontal/component";

// Types
import type { LayoutGroup } from "@/editors/style/components/layout/components/group/types";

/**
 * Group component renders a grid layout of properties within a style editor.
 * Each property is rendered as a separate component within the grid structure.
 * 
 * @param {LayoutGroup} props - The props for the Group component.
 * @param {LayoutProps[]} props.properties - The properties to render in the group.
 * @param {string} [props.columns="1fr 1fr"] - The grid column layout.
 * @param {string} [props.rows="auto"] - The grid row layout.
 * @param {boolean} [props.hidden] - Flag to determine if the group should be visible.
 * @returns {ReactElement} The rendered Group component.
*/
const Group: React.FC<LayoutGroup> = (props: LayoutGroup): ReactElement => {
    const {
        properties = [],
        hidden = false,
        isExpandable = false,
        dividerTitle,
        styles = {},
    } = props;


    // If the `hidden` prop is explicitly set to `false`, return nothing (hide the group)
    if (hidden === true) return <></>;



    const render = () => {
        const _properties = properties.map((property, index) => (
            <Property
                key={index}
                {...property}
            />
        ))

        if (!isExpandable) return (
            <>
                {dividerTitle !== undefined && <HorizontalDivider className="GroupDivider" title={dividerTitle} />}
                {_properties}
            </>
        );

        return (
            <DividerReveal className="GroupDividerReveal" title={dividerTitle} contentStyles={styles}>
                {_properties}
            </DividerReveal>
        )
    }

    return (
        <div className={CSS.Group} style={styles}>
            {render()}
        </div>
    );
};

export default memo(Group);