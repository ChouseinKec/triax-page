"use client";
// Styles
import pageStyles from "./page.module.css";

// Components
import StyleEditor from "@/editors/style/component";

// Hooks
import { useBlockEditor } from "@/editors/block/hooks/state";

// Stores
import useBlockStore from "@/stores/block/store";

export default function Home() {
  const { setSelected } = useBlockStore();
  const { generateBlockStyles } = useBlockEditor();
  const selectedBlock = useBlockStore(state => state.selectedBlock);

  return (

    <main className={pageStyles.main}>
      {/* Styles */}
      <fieldset className={pageStyles.fieldset}>
        <legend>Styles</legend>
        <StyleEditor />
      </fieldset>

      <fieldset className={pageStyles.fieldset}>
        <legend>Blocks</legend>

        <div className={pageStyles.blocks}>

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

      </fieldset>

    </main>

  );
}
