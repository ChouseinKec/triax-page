export type DeviceName =
	| 'all'
	//
	| 'mobile-sm'
	| 'mobile-lg'
	| 'tablet-sm'
	| 'tablet-lg'
	| 'desktop-sm'
	| 'desktop-lg'
	| 'iphone-se'
	| 'iphone-14'
	| 'iphone-14-pro-max'
	| 'samsung-galaxy-s23'
	| 'ipad'
	| 'ipad-air'
	| 'ipad-pro-11'
	| 'ipad-pro-13'
	| 'macbook-air-13'
	| 'macbook-pro-14'
	| 'macbook-pro-16'
	| 'desktop-fhd'
	| 'desktop-qhd'
	| 'desktop-4k';

export type DeviceMedia = {
	min: number;
	max: number;
};

export type DeviceTemplate = {
	width: number;
	height: number;
}

export type Device = {
	name: string;
	value: DeviceName;
	media: DeviceMedia;
	template: DeviceTemplate;
	category: 'phone' | 'tablet' | 'laptop' | 'desktop' | 'tv' | 'watch' | 'custom';
	pointer: 'coarse' | 'fine'; // coarse=touch, fine=mouse
	hover: boolean; // false for touch devices, true for desktop
};
