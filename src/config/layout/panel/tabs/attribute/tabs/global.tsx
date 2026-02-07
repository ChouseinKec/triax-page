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


export const renderGlobalTab = (nodeID: NodeID): React.ReactElement => {
    const blockGlobalAttributes = getBlockAttributeCompatibleDefinitions(nodeID, "global");
    if (blockGlobalAttributes.length === 0) {
        return (
            <p className={CSS.Empty}>
                The selected block-node's element does not have any global-specific customizable attributes.
            </p>
        );
    }

    return (
        <GroupLayout
            styles={{ gridTemplateColumns: "1fr" }}
            content={() => blockGlobalAttributes.map((attribute) => {
                return renderAttributeRow({
                    nodeID,
                    label: toKebabCase(attribute.key).replace('-', ' '),
                    attributeKey: attribute.key,
                });
            })}
        />
    );
};
