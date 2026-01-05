"use client";
import React from "react";

// Types
import type { BlockID } from "@/src/core/block/instance/types";

// Components
import GroupLayout from "@/src/shared/components/layout/group/component";
import { renderAttributeRow } from "../factory";

// Registry
import { getRegisteredAttributes } from "@/src/core/block/attribute/registries";

// Utilities
import { toKebabCase } from "@/src/shared/utilities/string";


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
