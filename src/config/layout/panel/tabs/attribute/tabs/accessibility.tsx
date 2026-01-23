"use client";
import React from "react";

// Types
import type { NodeID } from "@/core/block/node/instance/types/instance";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderAttributeRow } from "../factory/component";

// Registry
import { getRegisteredAttributes } from "@/core/block/attribute/definition/states/registry";

// Utilities
import { toKebabCase } from "@/shared/utilities/string";


export const renderAccessibilityTab = (NodeID: NodeID): React.ReactElement => {
    return (
        <GroupLayout
            styles={{ gridTemplateColumns: "1fr" }}
            content={() => Object.values(getRegisteredAttributes()).map((attribute) =>
                attribute?.category === 'accessibility'
                    ? renderAttributeRow({
                        NodeID,
                        label: toKebabCase(attribute.key).replace('-', ' '),
                        attributeKey: attribute.key,
                    })
                    : null
            )}
        />
    );
};
