"use client";
// Styles
import CSS from "./page.module.scss";

// Components
import StyleEditor from "@/editors/style/component";
import BlockEditor from "@/editors/block/component";

export default function Home() {

  const version = process.env.NEXT_PUBLIC_APP_VERSION;
  return (
    <main className={CSS.main}>
      {/* Block Editor */}
      <BlockEditor />

      {/* Style Editor */}
      <StyleEditor />

      <div className={CSS.version}>
        <p>v{version}</p>
      </div>
    </main>



  );


}


