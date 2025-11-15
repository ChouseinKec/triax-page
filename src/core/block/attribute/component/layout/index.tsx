"use client";
import React, { memo } from "react";

// Styles
import CSS from "./styles.module.scss";

// Types
import type { BlockID } from "@/src/core/block/instance/types";

// Components
import TabGroup from "@/src/shared/components/group/tab/component";
import GroupLayout from "@/src/shared/components/layout/group/component";

// Constants
import { getPropertyGroup } from "@/src/core/block/attribute/constants";

// Factory
import { renderAttributeRow } from "./factory";

type AttributesLayoutProps = { blockID: BlockID };

// Tab icons object
const TAB_ICONS = {
  global: (
    <svg aria-label="Global Attributes" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
      <path fill="black" d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V96H40V56ZM40,112H96v88H40Zm176,88H112V112H216v88Z" />
    </svg>
  ),
  schema: (
    <svg aria-label="Schema Attributes" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
      <path fill="black" d="M40,56a16,16,0,0,1,16-16H96a16,16,0,0,1,16,16V96a16,16,0,0,1-16,16H56A16,16,0,0,1,40,96ZM160,56a16,16,0,0,1,16-16h40a16,16,0,0,1,16,16V96a16,16,0,0,1-16,16H176a16,16,0,0,1-16-16ZM40,160a16,16,0,0,1,16-16H96a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16Zm120,0a16,16,0,0,1,16-16h40a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H176a16,16,0,0,1-16-16Z" />
    </svg>
  ),
  accessibility: (
    <svg aria-label="Accessibility Attributes" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
      <path fill="black" d="M128,24a24,24,0,1,0,24,24A24,24,0,0,0,128,24Zm88,72H160V72a8,8,0,0,0-16,0v24H112V72a8,8,0,0,0-16,0v24H40a8,8,0,0,0,0,16H92v40H72a8,8,0,0,0,0,16h32v56a8,8,0,0,0,16,0V168h32a8,8,0,0,0,0-16H148V112h52a8,8,0,0,0,0-16Z" />
    </svg>
  ),
  specific: (
    <svg aria-label="Specific Attributes" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
      <path fill="black" d="M224,56V200a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V56A16,16,0,0,1,48,40H208A16,16,0,0,1,224,56ZM56,56V200H200V56Z" />
    </svg>
  ),
} as const;

const AttributesLayout: React.FC<AttributesLayoutProps> = ({ blockID }) => {
  const globalAttributes = getPropertyGroup('global');
  const schemaAttributes = getPropertyGroup('schema');
  const accessibilityAttributes = getPropertyGroup('accesibility');
  const specificAttributes = getPropertyGroup('specific');

  const renderGroup = (title: string, attributes: typeof globalAttributes) => (
    <GroupLayout
      dividerTitle={title}
      isExpandable={false}
      content={() => (
        <div>
          {attributes.map((p) =>
            renderAttributeRow({
              blockID,
              attribute: p.name,
              label: p.name,
              styles: undefined,
            })
          )}
        </div>
      )}
    />
  );

  const tabItems = [
    { label: TAB_ICONS.global, title: 'Global', content: renderGroup('Global', globalAttributes) },
    { label: TAB_ICONS.schema, title: 'Schema', content: renderGroup('Schema', schemaAttributes) },
    { label: TAB_ICONS.accessibility, title: 'Accessibility', content: renderGroup('Accessibility', accessibilityAttributes) },
    { label: TAB_ICONS.specific, title: 'Specific', content: renderGroup('Specific', specificAttributes) },
  ];

  return (
    <div className={CSS.BlockAttributesLayouts}>
      <TabGroup items={tabItems} />
    </div>
  );
};

export default memo(AttributesLayout);
