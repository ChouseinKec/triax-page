"use client";

// Registry
import "@/src/page-builder/state/registries";

// Styles
import CSS from "./page.module.scss";

// Editors
import PageEditor from "@/src/page-builder/ui/editors/page/component";


export default function Home() {

  return (
    <main className={CSS.main}>
      <PageEditor />
    </main>
  );

}


