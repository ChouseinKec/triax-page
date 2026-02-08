import type { DeviceDefinition } from '@/core/layout/page/types';
import { registerDevices } from '@/core/layout/page/registries';

export const CoreDevices: DeviceDefinition[] = [
	// All devices - catch-all (global base styles)
	{
		name: 'default',
		key: 'default',
		media: { min: 0, max: Infinity },
		template: { width: 1440, height: 900 },
		hidden: true,
		category: 'default',
	},

	// Mobile ranges (0-767)
	{
		name: 'mobile-default',
		key: 'mobile-default',
		media: { min: 0, max: 767 },
		template: { width: 375, height: 667 },
		hidden: true,
		category: 'mobile',
	},
	{
		name: 'mobile-sm',
		key: 'mobile-sm',
		media: { min: 0, max: 320 },
		template: { width: 280, height: 600 },
		category: 'mobile',
	},
	{
		name: 'mobile-md',
		key: 'mobile-md',
		media: { min: 321, max: 480 },
		template: { width: 390, height: 844 },
		category: 'mobile',
	},
	{
		name: 'mobile-lg',
		key: 'mobile-lg',
		media: { min: 481, max: 767 },
		template: { width: 530, height: 720 },
		category: 'mobile',
	},

	// Tablet ranges (768-1199)
	{
		name: 'tablet-default',
		key: 'tablet-default',
		media: { min: 768, max: 1199 },
		template: { width: 820, height: 1180 },
		hidden: true,
		category: 'tablet',
	},
	{
		name: 'tablet-sm',
		key: 'tablet-sm',
		media: { min: 768, max: 834 },
		template: { width: 768, height: 1024 },
		category: 'tablet',
	},
	{
		name: 'tablet-md',
		key: 'tablet-md',
		media: { min: 835, max: 1024 },
		template: { width: 900, height: 1200 },
		category: 'tablet',
	},
	{
		name: 'tablet-lg',
		key: 'tablet-lg',
		media: { min: 1025, max: 1199 },
		template: { width: 1100, height: 1300 },
		category: 'tablet',
	},

	// Desktop ranges (1200+)
	{
		name: 'desktop-default',
		key: 'desktop-default',
		media: { min: 1200, max: Infinity },
		template: { width: 1440, height: 900 },
		hidden: true,
		category: 'desktop',
	},
	{
		name: 'desktop-sm',
		key: 'desktop-sm',
		media: { min: 1200, max: 1439 },
		template: { width: 1280, height: 800 },
		category: 'desktop',
	},
	{
		name: 'desktop-md',
		key: 'desktop-md',
		media: { min: 1440, max: 1919 },
		template: { width: 1440, height: 900 },
		category: 'desktop',
	},
	{
		name: 'desktop-lg',
		key: 'desktop-lg',
		media: { min: 1920, max: 3839 },
		template: { width: 1920, height: 1080 },
		category: 'desktop',
	},
	{
		name: 'desktop-xl',
		key: 'desktop-xl',
		media: { min: 3840, max: Infinity },
		template: { width: 3840, height: 2160 },
		category: 'desktop',
	},
] as const;

// Register devices directly
registerDevices(CoreDevices);
