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

export default function Home() {

  return (
    <LayoutProvider>
      <main className={CSS.main}>
        <PageEditor />
      </main>
    </LayoutProvider>
  );

}


