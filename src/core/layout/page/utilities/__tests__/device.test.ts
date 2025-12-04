// Utilities
import { isDeviceMediaValid, isDeviceTemplateValid, isDeviceNameValid, isDeviceCategoryValid, isDeviceValueValid, isDeviceIDValid, isDeviceDefinitionValid } from '@/src/core/layout/page/utilities/device';

// Media query validation: min/max with proper range constraints
describe('isDeviceMediaValid', () => {
	it('accepts valid media with min <= max', () => {
		expect(isDeviceMediaValid({ min: 0, max: 768 })).toBe(true);
		expect(isDeviceMediaValid({ min: 768, max: 1024 })).toBe(true);
		expect(isDeviceMediaValid({ min: 0, max: 0 })).toBe(true);
	});

	it('rejects media with max < min', () => {
		expect(isDeviceMediaValid({ min: 768, max: 0 })).toBe(false);
		expect(isDeviceMediaValid({ min: 1024, max: 768 })).toBe(false);
	});

	it('rejects negative min values', () => {
		expect(isDeviceMediaValid({ min: -1, max: 768 })).toBe(false);
	});

	it('rejects non-number min or max', () => {
		expect(isDeviceMediaValid({ min: '0', max: 768 })).toBe(false);
		expect(isDeviceMediaValid({ min: 0, max: '768' })).toBe(false);
	});

	it('rejects objects missing min or max', () => {
		expect(isDeviceMediaValid({ min: 0 })).toBe(false);
		expect(isDeviceMediaValid({ max: 768 })).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isDeviceMediaValid(null)).toBe(false);
		expect(isDeviceMediaValid(undefined)).toBe(false);
		expect(isDeviceMediaValid('media')).toBe(false);
	});
});

// Viewport/template validation: positive width and height
describe('isDeviceTemplateValid', () => {
	it('accepts valid template with positive dimensions', () => {
		expect(isDeviceTemplateValid({ width: 375, height: 667 })).toBe(true);
		expect(isDeviceTemplateValid({ width: 1920, height: 1080 })).toBe(true);
	});

	it('rejects zero or negative dimensions', () => {
		expect(isDeviceTemplateValid({ width: 0, height: 667 })).toBe(false);
		expect(isDeviceTemplateValid({ width: 375, height: 0 })).toBe(false);
		expect(isDeviceTemplateValid({ width: -375, height: 667 })).toBe(false);
	});

	it('rejects non-number width or height', () => {
		expect(isDeviceTemplateValid({ width: '375', height: 667 })).toBe(false);
		expect(isDeviceTemplateValid({ width: 375, height: '667' })).toBe(false);
	});

	it('rejects objects missing width or height', () => {
		expect(isDeviceTemplateValid({ width: 375 })).toBe(false);
		expect(isDeviceTemplateValid({ height: 667 })).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isDeviceTemplateValid(null)).toBe(false);
		expect(isDeviceTemplateValid(undefined)).toBe(false);
	});
});

// Device name validation: non-empty string
describe('isDeviceNameValid', () => {
	it('accepts valid non-empty strings', () => {
		expect(isDeviceNameValid('iphone-14')).toBe(true);
		expect(isDeviceNameValid('Desktop')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isDeviceNameValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isDeviceNameValid(123)).toBe(false);
		expect(isDeviceNameValid(null)).toBe(false);
		expect(isDeviceNameValid(undefined)).toBe(false);
	});
});

// Device category validation: non-empty string
describe('isDeviceCategoryValid', () => {
	it('accepts valid category strings', () => {
		expect(isDeviceCategoryValid('phone')).toBe(true);
		expect(isDeviceCategoryValid('tablet')).toBe(true);
		expect(isDeviceCategoryValid('desktop')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isDeviceCategoryValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isDeviceCategoryValid(null)).toBe(false);
		expect(isDeviceCategoryValid(456)).toBe(false);
	});
});

// Device value validation: non-empty string
describe('isDeviceValueValid', () => {
	it('accepts valid value strings', () => {
		expect(isDeviceValueValid('mobile-sm')).toBe(true);
		expect(isDeviceValueValid('desktop-lg')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isDeviceValueValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isDeviceValueValid(789)).toBe(false);
		expect(isDeviceValueValid(null)).toBe(false);
	});
});

// Device ID validation: non-empty string
describe('isDeviceIDValid', () => {
	it('accepts valid ID strings', () => {
		expect(isDeviceIDValid('desktop-sm')).toBe(true);
		expect(isDeviceIDValid('mobile-lg')).toBe(true);
	});

	it('rejects empty strings', () => {
		expect(isDeviceIDValid('')).toBe(false);
	});

	it('rejects non-string values', () => {
		expect(isDeviceIDValid(100)).toBe(false);
		expect(isDeviceIDValid(null)).toBe(false);
	});
});

// Device definition validation: object with all required properties
describe('isDeviceDefinitionValid', () => {
	it('accepts valid device definition', () => {
		const device = {
			name: 'iPhone',
			value: 'iphone-14',
			media: { min: 0, max: 768 },
			template: { width: 375, height: 667 },
			category: 'phone',
		};
		expect(isDeviceDefinitionValid(device)).toBe(true);
	});

	it('rejects objects missing required properties', () => {
		expect(isDeviceDefinitionValid({ name: 'iPhone', value: 'iphone-14', media: {}, template: {} })).toBe(false);
		expect(isDeviceDefinitionValid({ value: 'iphone-14', media: {}, template: {}, category: 'phone' })).toBe(false);
		expect(isDeviceDefinitionValid({ name: 'iPhone', media: {}, template: {}, category: 'phone' })).toBe(false);
		expect(isDeviceDefinitionValid({ name: 'iPhone', value: 'iphone-14', template: {}, category: 'phone' })).toBe(false);
		expect(isDeviceDefinitionValid({ name: 'iPhone', value: 'iphone-14', media: {}, category: 'phone' })).toBe(false);
	});

	it('rejects non-object values', () => {
		expect(isDeviceDefinitionValid(null)).toBe(false);
		expect(isDeviceDefinitionValid(undefined)).toBe(false);
		expect(isDeviceDefinitionValid('device')).toBe(false);
	});

	it('accepts definitions with additional properties', () => {
		const device = {
			name: 'iPhone',
			value: 'iphone-14',
			media: { min: 0, max: 768 },
			template: { width: 375, height: 667 },
			category: 'phone',
			extra: 'property',
		};
		expect(isDeviceDefinitionValid(device)).toBe(true);
	});
});
