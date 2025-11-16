"use client";
import React from "react";

// Types
import type { BlockID } from "@/src/core/block/instance/types";

// Components
import GroupLayout from "@/src/shared/components/layout/group/component";
import { renderAttributeRow } from "./factory";

// Constants
import { ATTRIBUTE_DEFINITIONS } from "@/src/core/block/attribute/constants/";

// Utilities
import { toKebabCase } from "@/src/shared/utilities/string";


export const renderGlobalTab = (blockID: BlockID): React.ReactElement => {
    return (
        <GroupLayout
            styles={{ gridTemplateColumns: "1fr" }}
            content={() => Object.values(ATTRIBUTE_DEFINITIONS).map((attribute) =>
                attribute.category === 'global'
                    ? renderAttributeRow({
                        blockID,
                        label: toKebabCase(attribute.name).replace('-', ' '),
                        attributeKey: attribute.name,
                    })
                    : null
            )}
        />
    );
};
