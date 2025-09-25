export type OrientationName = string;

export type OrientationID = string;

export type OrientationValue = string;

export type OrientationRecord = Record<string, OrientationInstance>;

export interface OrientationDefinition {
	name: OrientationName;
	value: OrientationValue;
}

export interface OrientationInstance extends OrientationDefinition {
	id: OrientationID;
}
