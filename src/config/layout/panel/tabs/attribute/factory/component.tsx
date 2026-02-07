import React from "react";

// Components
import BlockAttributeValue from "@/config/layout/panel/tabs/attribute/value/component";
import Property from "@/shared/components/layout/property/component";
import PropertyActions from "@/config/layout/panel/tabs/attribute/action/component";

// Types
import type { RenderAttributeRowProps } from "@/config/layout/panel/tabs/attribute/factory/types";

// Managers
import { getBlockAttributeDefinition } from "@/core/block/attribute/managers/";

// Utilties
import { devRender } from "@/shared/utilities/dev";

/**
 * Renders a shared Property row for a given attribute key with name/description/actions wired.
 */
export function renderAttributeRow(options: RenderAttributeRowProps): React.ReactElement | null {
    if (options?.hidden) return null;

    const attributeDefinition = getBlockAttributeDefinition(options.attributeKey);
    if (!attributeDefinition) return devRender.error("[renderAttributeRow] No attribute definition found");

    return (
        <Property
            key={`${options.nodeID}-${options.attributeKey}`}
            label={options.label}
            name={options.label || attributeDefinition.key}

            description={attributeDefinition.description}
            styles={{ flexDirection: "row" }}
            disabled={options.disabled}
            content={() => <BlockAttributeValue nodeID={options.nodeID} attribute={options.attributeKey} />}
            actions={() => <PropertyActions nodeID={options.nodeID} property={options.attributeKey} />}
        />
    );
}