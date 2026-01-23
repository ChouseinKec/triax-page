import { memo, useMemo } from "react";

// Managers
import { getPanelDefinitions, usePanels, setPanelOpenState } from "@/core/layout/panel/managers";
import { useSelectedBenchKey } from "@/core/layout/bench/managers";

// Components
import RadioSelect from "@/shared/components/select/radio/component";

/**
 * Renders a test action component for the main bench.
 * 
 * @returns JSX element representing the main action
 */
const PanelSelect: React.FC = () => {
    const selectedBenchKey = useSelectedBenchKey();
    const panelDefinitions = getPanelDefinitions(selectedBenchKey);
    const openPanelEditor = usePanels(selectedBenchKey, { open: true }) || [];

    const selectedKeys = useMemo(() => {
        return panelDefinitions.filter(pd => openPanelEditor.some(op => op.key === pd.key)).map(pd => pd.key);
    }, [panelDefinitions, openPanelEditor]
    );

    const options = useMemo(() => {
        return panelDefinitions.map(pd => ({
            name: pd.title,
            value: pd.key,
            icon: pd.icon,
        }));
    }, [panelDefinitions]
    );

    const handleChange = (keys: string | string[]) => {
        const selected = Array.isArray(keys) ? keys : [keys];

        panelDefinitions.forEach(pd => {
            const shouldOpen = selected.includes(pd.key);
            setPanelOpenState(pd.key, shouldOpen);
        });
    };

    if (options.length === 0) return null;

    return (
        <RadioSelect
            value={selectedKeys}
            options={options}
            onChange={handleChange}
            multiselectable={true}
            prioritizeIcons={true}
            clearable={true}
            direction="vertical"
        />
    );
}

PanelSelect.displayName = "PanelSelect";
export default memo(PanelSelect);