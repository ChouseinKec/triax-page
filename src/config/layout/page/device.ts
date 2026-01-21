import type { DeviceDefinition } from '@/core/layout/page/types';
import { registerDevices } from '@/core/layout/page/registries';

export const CoreDevices: DeviceDefinition[] = [
	// All devices - catch-all
	{
		name: 'default',
		key: 'default',
		media: { min: 0, max: Infinity },
		template: { width: 1200, height: 800 },
		hidden: true,
		category: 'default',
	},

	// Mobile ranges
	{
		name: 'mobile-sm',
		key: 'mobile-sm',
		media: { min: 0, max: 480 },
		template: { width: 375, height: 667 },
		category: 'phone',
	},
	{
		name: 'mobile-lg',
		key: 'mobile-lg',
		media: { min: 481, max: 767 },
		template: { width: 414, height: 896 },
		category: 'phone',
	},

	// Tablet ranges
	{
		name: 'tablet-sm',
		key: 'tablet-sm',
		media: { min: 768, max: 1024 },
		template: { width: 768, height: 1024 },
		category: 'tablet',
	},
	{
		name: 'tablet-lg',
		key: 'tablet-lg',
		media: { min: 1025, max: 1199 },
		template: { width: 1024, height: 1366 },
		category: 'tablet',
	},

	// Desktop ranges
	{
		name: 'desktop-sm',
		key: 'desktop-sm',
		media: { min: 1200, max: 1919 },
		template: { width: 1440, height: 900 },
		category: 'laptop',
	},
	{
		name: 'desktop-lg',
		key: 'desktop-lg',
		media: { min: 1920, max: Infinity },
		template: { width: 1920, height: 1080 },
		category: 'desktop',
	},

	// Popular specific devices
	{
		name: 'iphone-se',
		key: 'iphone-se',
		media: { min: 375, max: 375 },
		template: { width: 375, height: 667 },
		category: 'phone',
	},
	{
		name: 'iphone-14',
		key: 'iphone-14',
		media: { min: 390, max: 390 },
		template: { width: 390, height: 844 },
		category: 'phone',
	},
	{
		name: 'iphone-14-pro-max',
		key: 'iphone-14-pro-max',
		media: { min: 430, max: 430 },
		template: { width: 430, height: 926 },
		category: 'phone',
	},
	{
		name: 'samsung-galaxy-s23',
		key: 'samsung-galaxy-s23',
		media: { min: 360, max: 360 },
		template: { width: 360, height: 780 },
		category: 'phone',
	},
	{
		name: 'ipad',
		key: 'ipad',
		media: { min: 768, max: 768 },
		template: { width: 768, height: 1024 },
		category: 'tablet',
	},
	{
		name: 'ipad-air',
		key: 'ipad-air',
		media: { min: 820, max: 820 },
		template: { width: 820, height: 1180 },
		category: 'tablet',
	},
	{
		name: 'ipad-pro-11',
		key: 'ipad-pro-11',
		media: { min: 834, max: 834 },
		template: { width: 834, height: 1194 },
		category: 'tablet',
	},
	{
		name: 'ipad-pro-13',
		key: 'ipad-pro-13',
		media: { min: 1024, max: 1024 },
		template: { width: 1024, height: 1366 },
		category: 'tablet',
	},
	{
		name: 'macbook-air-13',
		key: 'macbook-air-13',
		media: { min: 1440, max: 1440 },
		template: { width: 1440, height: 900 },
		category: 'laptop',
	},
	{
		name: 'macbook-pro-14',
		key: 'macbook-pro-14',
		media: { min: 1512, max: 1512 },
		template: { width: 1512, height: 982 },
		category: 'laptop',
	},
	{
		name: 'macbook-pro-16',
		key: 'macbook-pro-16',
		media: { min: 1728, max: 1728 },
		template: { width: 1728, height: 1117 },
		category: 'laptop',
	},
	{
		name: 'desktop-fhd',
		key: 'desktop-fhd',
		media: { min: 1920, max: 1920 },
		template: { width: 1920, height: 1080 },
		category: 'desktop',
	},
	{
		name: 'desktop-qhd',
		key: 'desktop-qhd',
		media: { min: 2560, max: 2560 },
		template: { width: 2560, height: 1440 },
		category: 'desktop',
	},
	{
		name: 'desktop-4k',
		key: 'desktop-4k',
		media: { min: 3840, max: 3840 },
		template: { width: 3840, height: 2160 },
		category: 'desktop',
	},
] as const;

// Register devices directly
registerDevices(CoreDevices);
