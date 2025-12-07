// Utilities
import { validateDeviceID, validateDeviceName, validateDeviceValue, validateDeviceMedia, validateDeviceTemplate, validateDeviceCategory, validateDeviceDefinition } from '../device';
import { mockDeviceInstance } from '@/src/shared/helpers/mock';

describe('validateDeviceID', () => {
	it('accepts valid device ID', () => {
		const result = validateDeviceID('device-1');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('device-1');
	});

	it('rejects non-string values', () => {
		const results = [validateDeviceID(123), validateDeviceID(null), validateDeviceID(undefined), validateDeviceID({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Device ID must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateDeviceID('');
		expect(result.valid).toBe(false);
	});
});

describe('validateDeviceName', () => {
	it('accepts valid device name', () => {
		const result = validateDeviceName('Mobile');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('Mobile');
	});

	it('rejects non-string values', () => {
		const results = [validateDeviceName(123), validateDeviceName(null), validateDeviceName(undefined), validateDeviceName({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Device name must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateDeviceName('');
		expect(result.valid).toBe(false);
	});
});

describe('validateDeviceValue', () => {
	it('accepts valid device value', () => {
		const result = validateDeviceValue('mobile');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('mobile');
	});

	it('rejects non-string values', () => {
		const results = [validateDeviceValue(123), validateDeviceValue(null), validateDeviceValue(undefined), validateDeviceValue({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Device value must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateDeviceValue('');
		expect(result.valid).toBe(false);
	});
});

describe('validateDeviceMedia', () => {
	it('accepts valid device media', () => {
		const media = { min: 0, max: 767 };
		const result = validateDeviceMedia(media);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(media);
	});

	it('rejects non-object values', () => {
		const results = [validateDeviceMedia('invalid'), validateDeviceMedia(123), validateDeviceMedia(null), validateDeviceMedia(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;

			expect(result.message).toContain('Device media must be valid');
		});
	});

	it('rejects missing properties', () => {
		const results = [validateDeviceMedia({}), validateDeviceMedia({ min: 0 }), validateDeviceMedia({ max: 767 })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property types', () => {
		const results = [validateDeviceMedia({ min: '0', max: 767 }), validateDeviceMedia({ min: 0, max: '767' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});

describe('validateDeviceTemplate', () => {
	it('accepts valid device template', () => {
		const template = { width: 375, height: 667 };
		const result = validateDeviceTemplate(template);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(template);
	});

	it('rejects non-object values', () => {
		const results = [validateDeviceTemplate('invalid'), validateDeviceTemplate(123), validateDeviceTemplate(null), validateDeviceTemplate(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;
            
			expect(result.message).toContain('Device template must be valid');
		});
	});

	it('rejects missing properties', () => {
		const results = [validateDeviceTemplate({}), validateDeviceTemplate({ width: 375 }), validateDeviceTemplate({ height: 667 })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property types', () => {
		const results = [validateDeviceTemplate({ width: '375', height: 667 }), validateDeviceTemplate({ width: 375, height: '667' })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});

describe('validateDeviceCategory', () => {
	it('accepts valid device category', () => {
		const result = validateDeviceCategory('phone');

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toBe('phone');
	});

	it('rejects non-string values', () => {
		const results = [validateDeviceCategory(123), validateDeviceCategory(null), validateDeviceCategory(undefined), validateDeviceCategory({})];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;
            
			expect(result.message).toContain('Device category must be a valid string');
		});
	});

	it('rejects empty string', () => {
		const result = validateDeviceCategory('');
		expect(result.valid).toBe(false);
	});
});

describe('validateDeviceDefinition', () => {
	it('accepts valid device definition', () => {
		const device = mockDeviceInstance();
		const result = validateDeviceDefinition(device);

		expect(result.valid).toBe(true);
		if (!result.valid) return;

		expect(result.value).toEqual(device);
	});

	it('rejects non-object values', () => {
		const results = [validateDeviceDefinition('invalid'), validateDeviceDefinition(123), validateDeviceDefinition(null), validateDeviceDefinition(undefined)];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
			if (result.valid) return;
            
			expect(result.message).toContain('Device definition must be an object');
		});
	});

	it('rejects missing required properties', () => {
		const device = mockDeviceInstance();

		const results = [validateDeviceDefinition({ ...device, name: undefined }), validateDeviceDefinition({ ...device, value: undefined }), validateDeviceDefinition({ ...device, media: undefined }), validateDeviceDefinition({ ...device, template: undefined }), validateDeviceDefinition({ ...device, category: undefined })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});

	it('rejects invalid property values', () => {
		const device = mockDeviceInstance();

		const results = [validateDeviceDefinition({ ...device, name: 123 }), validateDeviceDefinition({ ...device, value: null }), validateDeviceDefinition({ ...device, media: 'invalid' }), validateDeviceDefinition({ ...device, template: {} }), validateDeviceDefinition({ ...device, category: [] })];

		results.forEach((result) => {
			expect(result.valid).toBe(false);
		});
	});
});