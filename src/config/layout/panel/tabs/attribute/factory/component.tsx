import React from "react";

// Components
import BlockAttributeValue from "@/config/layout/panel/tabs/attribute/value/component";
import Property from "@/shared/components/layout/property/component";
import PropertyActions from "@/config/layout/panel/tabs/attribute/action/component";

// Types
import type { RenderAttributeRowProps } from "@/config/layout/panel/tabs/attribute/factory/types";

// Registry
import { getRegisteredAttribute } from "@/core/block/attribute/states/registry";

// Utilties
import { devRender } from "@/shared/utilities/dev";

/**
 * Renders a shared Property row for a given attribute key with name/description/actions wired.
 */
export function renderAttributeRow(options: RenderAttributeRowProps): React.ReactElement | null {
    if (options?.hidden) return null;

    const attributeDefinition = getRegisteredAttribute(options.attributeKey);
    if (!attributeDefinition) return devRender.error("[renderAttributeRow] No attribute definition found");

    return (
        <Property
            key={`${options.NodeID}-${options.attributeKey}`}
            label={options.label}
            name={options.label || attributeDefinition.key}

            description={attributeDefinition.description}
            styles={{ flexDirection: "row" }}
            disabled={options.disabled}
            content={() => <BlockAttributeValue NodeID={options.NodeID} attribute={options.attributeKey} />}
            actions={() => <PropertyActions NodeID={options.NodeID} property={options.attributeKey} />}
        />
    );
}