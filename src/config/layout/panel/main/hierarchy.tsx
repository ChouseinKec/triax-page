// Types
import type { PanelDefinition } from '@/src/core/layout/panel/types';

/**
 * Block Hierarchy panel definition.
 * A panel that displays the hierarchical structure of blocks in the editor.
 */
const MainHierarchy: PanelDefinition = {
    id: "main-hierarchy",
    title: "Hierarchy",
    initialPosition: { top: "3.5%", left: "1.5%" },
    initialSize: { width: "200px", height: "96%", minWidth: 200, minHeight: 250 },
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256">
            <path fill="white" d="M176,152h32a16,16,0,0,0,16-16V104a16,16,0,0,0-16-16H176a16,16,0,0,0-16,16v8H88V80h8a16,16,0,0,0,16-16V32A16,16,0,0,0,96,16H64A16,16,0,0,0,48,32V64A16,16,0,0,0,64,80h8V192a24,24,0,0,0,24,24h64v8a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V192a16,16,0,0,0-16-16H176a16,16,0,0,0-16,16v8H96a8,8,0,0,1-8-8V128h72v8A16,16,0,0,0,176,152ZM64,32H96V64H64ZM176,192h32v32H176Zm0-88h32v32H176Z" />
        </svg>
    ),
    workbenchKey: "main",
    initialLocked: true,
    initialOpen: true,
    order: 20,
};

export default MainHierarchy;
