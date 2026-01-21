"use client";
import React from "react";

// Types
import type { BlockID } from "@/core/block/instance/types";

// Components
import GroupLayout from "@/shared/components/layout/group/component";
import { renderAttributeRow } from "../factory";

// Registry
import { getRegisteredAttributes } from "@/core/block/attribute/registries";

// Utilities
import { toKebabCase } from "@/shared/utilities/string";


export const renderGlobalTab = (blockID: BlockID): React.ReactElement => {
    return (
        <GroupLayout
            styles={{ gridTemplateColumns: "1fr" }}
            content={() => Object.values(getRegisteredAttributes()).map((attribute) =>
                attribute?.category === 'global'
                    ? renderAttributeRow({
                        blockID,
                        label: toKebabCase(attribute.key).replace('-', ' '),
                        attributeKey: attribute.key,
                    })
                    : null
            )}
        />
    );
};
