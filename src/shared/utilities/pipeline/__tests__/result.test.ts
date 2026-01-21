// Utilities
import { validate, pick, find, collect, check, operate, ResultPipeline } from '../result';

// Types
import type { ValidateResult, PickResult, FindResult, CollectResult, CheckResult, OperateResult } from '@/shared/types/result';

describe('validate', () => {
	// Validates single successful result
	it('should return valid with value from single successful validation', () => {
		const result = validate({ name: { valid: true, value: 'John' } as ValidateResult<string> });
		expect(result.valid).toBe(true);
		if (result.valid) {
			expect(result.values.name).toBe('John');
		}
	});

	// Validates multiple successful results
	it('should return valid with all values from multiple successful validations', () => {
		const result = validate({
			name: { valid: true, value: 'John' } as ValidateResult<string>,
			age: { valid: true, value: 30 } as ValidateResult<number>,
			email: { valid: true, value: 'john@example.com' } as ValidateResult<string>,
		});
		expect(result.valid).toBe(true);
		if (result.valid) {
			expect(result.values.name).toBe('John');
			expect(result.values.age).toBe(30);
			expect(result.values.email).toBe('john@example.com');
		}
	});

	// Returns first error encountered
	it('should return invalid with first error message', () => {
		const result = validate({
			name: { valid: true, value: 'John' } as ValidateResult<string>,
			age: { valid: false, message: 'Age must be a number' } as ValidateResult<number>,
			email: { valid: false, message: 'Invalid email' } as ValidateResult<string>,
		});
		expect(result.valid).toBe(false);
		if (!result.valid) {
			expect(result.message).toBe('Age must be a number');
		}
	});

	// Handles empty validation object
	it('should handle empty validation object', () => {
		const result = validate({});
		expect(result.valid).toBe(true);
		if (result.valid) {
			expect(Object.keys(result.values)).toHaveLength(0);
		}
	});
});

describe('pick', () => {
	// Picks single successful result
	it('should return success with data from single successful pick', () => {
		const result = pick({ user: { success: true, data: { id: 1, name: 'John' } } as PickResult<{ id: number; name: string }> });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.user).toEqual({ id: 1, name: 'John' });
		}
	});

	// Picks multiple successful results
	it('should return success with data from multiple successful picks', () => {
		const result = pick({
			user: { success: true, data: { id: 1 } } as PickResult<{ id: number }>,
			posts: { success: true, data: [{ id: 1, title: 'Post 1' }] } as PickResult<Array<{ id: number; title: string }>>,
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.user).toEqual({ id: 1 });
			expect(result.data.posts).toEqual([{ id: 1, title: 'Post 1' }]);
		}
	});

	// Returns first error encountered
	it('should return failure with first error message', () => {
		const result = pick({
			user: { success: true, data: { id: 1 } } as PickResult<{ id: number }>,
			posts: { success: false, error: 'Failed to fetch posts' } as PickResult<Array<any>>,
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Failed to fetch posts');
		}
	});

	// Handles empty pick object
	it('should handle empty pick object', () => {
		const result = pick({});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(Object.keys(result.data)).toHaveLength(0);
		}
	});
});

describe('find', () => {
	// Finds single found result
	it('should return success with data from found result', () => {
		const result = find({ user: { status: 'found', data: { id: 1, name: 'John' } } as FindResult<{ id: number; name: string }> });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.user).toEqual({ id: 1, name: 'John' });
		}
	});

	// Finds single not-found result
	it('should return success with null for not-found result', () => {
		const result = find({ user: { status: 'not-found' } as FindResult<{ id: number }> });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.user).toBeNull();
		}
	});

	// Finds multiple mixed results
	it('should handle mixed found and not-found results', () => {
		const result = find({
			user: { status: 'found', data: { id: 1 } } as FindResult<{ id: number }>,
			post: { status: 'not-found' } as FindResult<{ id: number; title: string }>,
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.user).toEqual({ id: 1 });
			expect(result.data.post).toBeNull();
		}
	});

	// Returns error on error status
	it('should return failure with error message on error status', () => {
		const result = find({
			user: { status: 'found', data: { id: 1 } } as FindResult<{ id: number }>,
			post: { status: 'error', error: 'Database error' } as FindResult<any>,
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Database error');
		}
	});

	// Handles empty find object
	it('should handle empty find object', () => {
		const result = find({});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(Object.keys(result.data)).toHaveLength(0);
		}
	});
});

describe('collect', () => {
	// Collects single successful result
	it('should return success with data from single successful collection', () => {
		const result = collect({ items: { success: true, data: [1, 2, 3] } as CollectResult<number[]> });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.items).toEqual([1, 2, 3]);
		}
	});

	// Collects multiple successful results
	it('should return success with data from multiple successful collections', () => {
		const result = collect({
			items: { success: true, data: [1, 2, 3] } as CollectResult<number[]>,
			tags: { success: true, data: ['a', 'b', 'c'] } as CollectResult<string[]>,
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.items).toEqual([1, 2, 3]);
			expect(result.data.tags).toEqual(['a', 'b', 'c']);
		}
	});

	// Returns first error encountered
	it('should return failure with first error message', () => {
		const result = collect({
			items: { success: true, data: [1, 2, 3] } as CollectResult<number[]>,
			tags: { success: false, error: 'Failed to collect tags' } as CollectResult<string[]>,
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Failed to collect tags');
		}
	});

	// Handles empty collect object
	it('should handle empty collect object', () => {
		const result = collect({});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(Object.keys(result.data)).toHaveLength(0);
		}
	});
});

describe('check', () => {
	// Checks single passing check
	it('should return success with passed true for passing check', () => {
		const result = check({ isValid: { success: true, passed: true } as CheckResult });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.isValid).toBe(true);
		}
	});

	// Checks single failing check
	it('should return success with passed false for failing check', () => {
		const result = check({ isValid: { success: true, passed: false } as CheckResult });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.isValid).toBe(false);
		}
	});

	// Checks multiple results
	it('should handle multiple check results', () => {
		const result = check({
			isValid: { success: true, passed: true } as CheckResult,
			isActive: { success: true, passed: false } as CheckResult,
			isEnabled: { success: true, passed: true } as CheckResult,
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.isValid).toBe(true);
			expect(result.data.isActive).toBe(false);
			expect(result.data.isEnabled).toBe(true);
		}
	});

	// Returns error on failure
	it('should return failure with error message on check error', () => {
		const result = check({
			isValid: { success: true, passed: true } as CheckResult,
			isActive: { success: false, error: 'Check failed' } as CheckResult,
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Check failed');
		}
	});

	// Handles empty check object
	it('should handle empty check object', () => {
		const result = check({});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(Object.keys(result.data)).toHaveLength(0);
		}
	});
});

describe('operate', () => {
	// Operates single successful result
	it('should return success with data from single successful operation', () => {
		const result = operate({ result: { success: true, data: 42 } as OperateResult<number> });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.result).toBe(42);
		}
	});

	// Operates multiple successful results
	it('should return success with data from multiple successful operations', () => {
		const result = operate({
			sum: { success: true, data: 100 } as OperateResult<number>,
			product: { success: true, data: 50 } as OperateResult<number>,
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.sum).toBe(100);
			expect(result.data.product).toBe(50);
		}
	});

	// Returns first error encountered
	it('should return failure with first error message', () => {
		const result = operate({
			sum: { success: true, data: 100 } as OperateResult<number>,
			product: { success: false, error: 'Overflow error' } as OperateResult<number>,
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error).toBe('Overflow error');
		}
	});

	// Handles empty operate object
	it('should handle empty operate object', () => {
		const result = operate({});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(Object.keys(result.data)).toHaveLength(0);
		}
	});
});

describe('ResultPipeline', () => {
	// Initializes with context
	it('should initialize with context', () => {
		const pipeline = new ResultPipeline('TestContext');
		expect(pipeline).toBeDefined();
	});

	// Chains single validate
	it('should chain single validate call', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.validate({
				name: { valid: true, value: 'John' } as ValidateResult<string>,
			})
			.execute();

		expect(result).not.toBeNull();
		expect(result?.name).toBe('John');
	});

	// Chains multiple validates
	it('should chain multiple validate calls', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.validate({
				name: { valid: true, value: 'John' } as ValidateResult<string>,
			})
			.validate((data) => ({
				age: { valid: true, value: 30 } as ValidateResult<number>,
			}))
			.execute();

		expect(result).not.toBeNull();
		expect(result?.name).toBe('John');
		expect(result?.age).toBe(30);
	});

	// Stops on validation error
	it('should stop pipeline on validation error', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.validate({
				name: { valid: false, message: 'Invalid name' } as ValidateResult<string>,
			})
			.validate({
				age: { valid: true, value: 30 } as ValidateResult<number>,
			})
			.execute();

		expect(result).toBeNull();
	});

	// Chains validate and pick
	it('should chain validate and pick calls', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.validate({
				name: { valid: true, value: 'John' } as ValidateResult<string>,
			})
			.pick({
				data: { success: true, data: 'some data' } as PickResult<string>,
			})
			.execute();

		expect(result).not.toBeNull();
		expect(result?.name).toBe('John');
		expect(result?.data).toBe('some data');
	});

	// Chains validate and find
	it('should chain validate and find calls', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.validate({
				id: { valid: true, value: 1 } as ValidateResult<number>,
			})
			.find({
				user: { status: 'found', data: { name: 'John' } } as FindResult<{ name: string }>,
			})
			.execute();

		expect(result).not.toBeNull();
		expect(result?.user).toEqual({ name: 'John' });
	});

	// Chains find with not-found result
	it('should handle find with not-found result', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.find({
				user: { status: 'not-found' } as FindResult<{ name: string }>,
			})
			.execute();

		expect(result).not.toBeNull();
		expect(result?.user).toBeNull();
	});

	// Chains collect
	it('should chain collect call', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.collect({
				items: { success: true, data: [1, 2, 3] } as CollectResult<number[]>,
			})
			.execute();

		expect(result).not.toBeNull();
		expect(result?.items).toEqual([1, 2, 3]);
	});

	// Chains check
	it('should chain check call', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.check({
				isValid: { success: true, passed: true } as CheckResult,
			})
			.execute();

		expect(result).not.toBeNull();
		expect(result?.isValid).toBe(true);
	});

	// Chains operate
	it('should chain operate call', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.operate({
				result: { success: true, data: 42 } as OperateResult<number>,
			})
			.execute();

		expect(result).not.toBeNull();
		expect(result?.result).toBe(42);
	});

	// Uses function callbacks with previous data
	it('should allow function callbacks that use previous data', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.validate({
				name: { valid: true, value: 'John' } as ValidateResult<string>,
			})
			.validate((data) => ({
				greeting: { valid: true, value: `Hello, ${data.name}` } as ValidateResult<string>,
			}))
			.execute();

		expect(result).not.toBeNull();
		expect(result?.greeting).toBe('Hello, John');
	});

	// Runs side effect on success
	it('should run side effect on success', () => {
		let sideEffectCalled = false;
		const pipeline = new ResultPipeline('test');
		pipeline
			.validate({
				name: { valid: true, value: 'John' } as ValidateResult<string>,
			})
			.run((data) => {
				sideEffectCalled = true;
			})
			.execute();

		expect(sideEffectCalled).toBe(true);
	});

	// Skips side effect on failure
	it('should skip side effect on pipeline failure', () => {
		let sideEffectCalled = false;
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.validate({
				name: { valid: false, message: 'Invalid' } as ValidateResult<string>,
			})
			.run((data) => {
				sideEffectCalled = true;
			})
			.execute();

		expect(sideEffectCalled).toBe(false);
		expect(result).toBeNull();
	});

	// Runs complex pipeline
	it('should run complex multi-step pipeline', () => {
		const pipeline = new ResultPipeline('test');
		const result = pipeline
			.validate({
				id: { valid: true, value: 1 } as ValidateResult<number>,
			})
			.pick({
				user: { success: true, data: { name: 'John' } } as PickResult<{ name: string }>,
			})
			.collect({
				posts: { success: true, data: [{ id: 1, title: 'Post' }] } as CollectResult<Array<{ id: number; title: string }>>,
			})
			.check({
				isValid: { success: true, passed: true } as CheckResult,
			})
			.execute();

		expect(result).not.toBeNull();
		expect(result?.id).toBe(1);
		expect(result?.user).toEqual({ name: 'John' });
		expect(result?.posts).toHaveLength(1);
		expect(result?.isValid).toBe(true);
	});
});
