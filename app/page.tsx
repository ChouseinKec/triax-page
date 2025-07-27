'use client';
// Registry
import "@/blocks/registry/init";

// Styles
import CSS from "./page.module.scss";

// Components
import BottomPanel from "@/layout/bottom/component";
import BlocksPanel from "@/layout/blocks/component";
import InspectorPanel from "@/layout/inspector/component";
import ViewPanel from "@/layout/view/component";
import TopBar from "@/layout/top/component";
import LeftBar from "@/layout/left/component";

// Context
import { LayoutProvider } from "@/context/layout/provider";

export default function Home() {

  return (
    <LayoutProvider>
      <main className={CSS.main}>
        <TopBar />
        <LeftBar />
        <BlocksPanel />
        <ViewPanel />
        <InspectorPanel />
        <BottomPanel />
      </main>
    </LayoutProvider>
  );

}


