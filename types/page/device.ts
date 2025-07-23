export type DeviceName = 'all' | 'mobile' | 'tablet' | 'desktop';

export type DeviceMedia = {
	min: number;
	max: number;
};

export type Device = {
	name: string;
	value: DeviceName;
	media: DeviceMedia;
};
