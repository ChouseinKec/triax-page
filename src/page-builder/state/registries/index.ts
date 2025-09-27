import { initializeRegistry as initializeBlockRegistry } from './block/init';
import { initializeRegistry as initializeLayoutRegistry } from './layout/init';
import { initializeRegistry as initializeViewportRegistry } from './viewport/init';
import { initializeRegistry as initializeWorkbenchRegistry } from './workbench/init';
import { initializeRegistry as initializePageRegistry } from './page/init';

export { initializeBlockRegistry, initializeLayoutRegistry, initializeViewportRegistry, initializeWorkbenchRegistry, initializePageRegistry };

/**
 * Initialize all registries asynchronously
 * @returns Promise that resolves when all registries are initialized
 */
export async function initializeAllRegistries(): Promise<void> {
	await initializeBlockRegistry();
	await initializeLayoutRegistry();
	await initializeViewportRegistry();
	await initializeWorkbenchRegistry();
	await initializePageRegistry();
}
