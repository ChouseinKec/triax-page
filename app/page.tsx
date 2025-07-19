"use client";

// Styles
import CSS from "./page.module.scss";

// Components
import StyleEditor from "@/editors/style/component";
import BlockEditor from "@/editors/block/component";

// Hooks
import { useDeviceRender } from '@/hooks/device/hooks';
import { useOrientationRender } from '@/hooks/orientation/hooks';
import { usePseudoRender } from '@/hooks/pseudo/hooks';
import { useMemo } from "react";

export default function Home() {
  const { renderDeviceSelect, currentDevice } = useDeviceRender();
  const { renderOrientationSelect } = useOrientationRender();
  const { renderPseudoSelect } = usePseudoRender();

  const deviceSelect = useMemo(() => renderDeviceSelect(), [renderDeviceSelect]);
  const orientationSelect = useMemo(() => renderOrientationSelect(), [renderOrientationSelect]);
  const pseudoSelect = useMemo(() => renderPseudoSelect(), [renderPseudoSelect]);


  const version = process.env.NEXT_PUBLIC_APP_VERSION;
  return (
    <main className={CSS.main}>
      {/* Block Editor */}



      <div className={CSS.version}>
        <p>v{version}</p>
      </div>



      <div className={CSS.TopBar}>
        <div className={CSS.Devices}>
          {deviceSelect}
          {orientationSelect}
          {pseudoSelect}
        </div>
      </div>

      <div className={CSS.HierarchyPanel}>

      </div>


      <div className={CSS.InspectorPanel}>
        <StyleEditor />
      </div>


      <div className={CSS.ViewPanel}>
        <BlockEditor />
      </div>


    </main>





  );


}


