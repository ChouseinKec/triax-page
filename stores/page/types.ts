import type { Device, DeviceName } from '@/types/page/device';
import type { Orientation, OrientationName } from '@/types/page/orientation';
import type { Pseudo, PseudoName } from '@/types/page/pseudo';

export type PageStore = {
	allDevices: Device[];
	currentDevice: Device;
	setDevice: (value: DeviceName) => void;

	allOrientations: Orientation[];
	currentOrientation: Orientation;
	setOrientation: (value: OrientationName) => void;

	allPseudos: Pseudo[];
	currentPseudo: Pseudo;
	setPseudo: (value: PseudoName) => void;
};
