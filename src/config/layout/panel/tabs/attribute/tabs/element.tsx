"use client";
import React from "react";

// Styles
import CSS from "../styles.module.scss";

// Types
import type { NodeID } from "@/core/block/node/types/instance";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderAttributeRow } from "../factory/component";

// Managers
import { getBlockAttributeCompatibleDefinitions } from '@/core/block/attribute/managers/queries/definition';

// Utilities
import { toKebabCase } from "@/shared/utilities/string";


export const renderElementTab = (nodeID: NodeID): React.ReactElement => {
    const blockElementAttributes = getBlockAttributeCompatibleDefinitions(nodeID, "element");
    if (blockElementAttributes.length === 0) {
        return (
            <p className={CSS.Empty}>
                The selected block-node's element does not have any element-specific customizable attributes.
            </p>
        );
    }


    return (
        <GroupLayout
            styles={{ gridTemplateColumns: "1fr" }}
            content={() => blockElementAttributes.map((attribute) => {
                return renderAttributeRow({
                    nodeID,
                    label: toKebabCase(attribute.key).replace('-', ' '),
                    attributeKey: attribute.key,
                });
            })}
        />
    );
};