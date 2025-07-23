import type { Device } from '@/types/page/device';

export const DeviceDefinitions: Device[] = [
	{ name: 'all', value: 'all', media: { min: 0, max: Infinity } },
	{ name: 'mobile', value: 'mobile', media: { min: 0, max: 767 } },
	{ name: 'tablet', value: 'tablet', media: { min: 768, max: 1024 } },
	{ name: 'desktop', value: 'desktop', media: { min: 1200, max: Infinity } },
] as const;
