"use client";
// Styles
import CSS from "./page.module.css";

// Components
import StyleEditor from "@/editors/style/component";

// Hooks
import { useBlockEditor } from "@/editors/block/hooks/state";

// Stores
import useBlockStore from "@/stores/block/store";

import { test } from '@/utilities/style/parse';

export default function Home() {
  const { setSelected } = useBlockStore();
  const { generateBlockStyles } = useBlockEditor();
  const selectedBlock = useBlockStore(state => state.selectedBlock);
  const version = process.env.NEXT_PUBLIC_APP_VERSION;
  test();
  return (
    <main className={CSS.main}>
      {/* Styles */}
      <StyleEditor className='CSS' />

      <div className={CSS.blocks}>

        <div data-selected={selectedBlock === "1"} className='block-1' onClick={() => setSelected("1")}>
          <p>Block 1A</p>
          <p>Block 1B</p>
          <p>Block 1C</p>
          <style>{generateBlockStyles('1')}</style>
        </div>

        <div data-selected={selectedBlock === "2"} className='block-2' onClick={() => setSelected("2")}>
          <p>Block 2A</p>
          <p>Block 2B</p>
          <p>Block 2C</p>
          <style>{generateBlockStyles('2')}</style>
        </div>


      </div>

      <div className={CSS.version}>
        <p>v{version}</p>
      </div>
    </main>



  );


}


