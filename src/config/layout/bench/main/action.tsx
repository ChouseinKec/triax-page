import { memo, useMemo } from "react";

// Managers
import { getPanelDefinitions, usePanelInstances, setPanelOpenState } from "@/src/core/layout/panel/managers";
import { useSelectedBenchKey } from "@/src/core/layout/workbench/managers";

// Components
import RadioSelect from "@/src/shared/components/select/radio/component";

/**
 * Renders a test action component for the main bench.
 * 
 * @returns JSX element representing the main action
 */
const PanelSelect: React.FC = () => {
    const selectedBenchKey = useSelectedBenchKey();
    const panelDefinitions = getPanelDefinitions(selectedBenchKey);
    const openPanels = usePanelInstances(selectedBenchKey, { open: true }) || [];

    const selectedKeys = useMemo(() => {
        return panelDefinitions.filter(pd => openPanels.some(op => op.key === pd.key)).map(pd => pd.key);
    }, [panelDefinitions, openPanels]
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