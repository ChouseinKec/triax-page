'use client';
// Registry
import "@/registry/blocks/init";
import "@/registry/layout/init";

// Styles
import CSS from "./page.module.scss";

// Editors
import PageEditor from "@/editors/page/component";

// Context
import { LayoutProvider } from "@/context/layout";
import { BlockProvider } from "@/editors/block/context";

export default function Home() {

  return (
    <LayoutProvider>
      <BlockProvider>
        <main className={CSS.main}>
          <PageEditor />
        </main>
      </BlockProvider>
    </LayoutProvider>
  );

}


