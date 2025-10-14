export function applyClassNames(...classNames: (string | undefined)[]): string {
	return classNames.filter(Boolean).join(' ');
}
