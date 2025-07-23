'use client';
// Registry
import "@/blocks/registry/init";

// Styles
import CSS from "./page.module.scss";

// Components
import BottomPanel from "@/layout/bottom/component";
import LeftPanel from "@/layout/left/component";
import RightPanel from "@/layout/right/component";
import ViewPanel from "@/layout/view/component";
import TopPanel from "@/layout/top/component";

// Context
import { LayoutProvider } from "@/context/layout/provider";

export default function Home() {
  const version = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <LayoutProvider>
      <main className={CSS.main}>
        <div className={CSS.version}>
          <p>v{version}</p>
        </div>

        <TopPanel />
        <LeftPanel />
        <ViewPanel />
        <RightPanel />
        <BottomPanel />

      </main>
    </LayoutProvider>
  );


}


