import React from "react";

// Managers
import { canBlockHaveAttribute } from "@/src/core/block/instance/manager/queries";

// Constants
import { ATTRIBUTE_DEFINITIONS } from "@/src/core/block/attribute/constants";

// Components
import BlockAttributeValue from "@/src/core/block/attribute/component";
import Property from "@/src/shared/components/layout/property/component";
import PropertyActions from "@/src/config/layout/panel/main/block/attribute/actions";

// Types
import type { RenderAttributeRowProps } from "@/src/config/layout/panel/main/block/attribute/types";

// Utilties
import { devRender } from "@/src/shared/utilities/dev";

/**
 * Renders a shared Property row for a given attribute key with name/description/actions wired.
 * Applies allowedAttributes filtering via canBlockHaveAttribute before rendering.
 */
export function renderAttributeRow(options: RenderAttributeRowProps): React.ReactElement | null {
    if (options?.hidden) return null;
    if (!canBlockHaveAttribute(options.blockID, options.attributeKey)) return null;

    const propertyDef = ATTRIBUTE_DEFINITIONS[options.attributeKey];
    if (!propertyDef) return devRender.error("[renderAttributeRow] No attribute definition found");

    return (
        <Property
            key={`${options.blockID}-${options.attributeKey}`}
            label={options.label}
            name={options.label || propertyDef.name}

            description={propertyDef.description}
            styles={{ flexDirection: "row" }}
            disabled={options.disabled}
            content={() => <BlockAttributeValue blockID={options.blockID} attribute={options.attributeKey} />}
            actions={() => <PropertyActions blockID={options.blockID} property={options.attributeKey} />}
        />
    );
}