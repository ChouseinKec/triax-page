import React from "react";

// Managers
import { canNodeHaveAttribute } from "@/core/block/node/instance/managers/queries";

// Components
import BlockAttributeValue from "@/config/layout/panel/tabs/attribute/value";
import Property from "@/shared/components/layout/property/component";
import PropertyActions from "@/config/layout/panel/tabs/attribute/action";

// Types
import type { RenderAttributeRowProps } from "@/config/layout/panel/tabs/attribute/factory/types";

// Registry
import { getRegisteredAttribute } from "@/core/block/attribute/registries";

// Utilties
import { devRender } from "@/shared/utilities/dev";

/**
 * Renders a shared Property row for a given attribute key with name/description/actions wired.
 * Applies allowedAttributes filtering via canNodeHaveAttribute before rendering.
 */
export function renderAttributeRow(options: RenderAttributeRowProps): React.ReactElement | null {
    if (options?.hidden) return null;
    if (!canNodeHaveAttribute(options.NodeID, options.attributeKey)) return null;

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