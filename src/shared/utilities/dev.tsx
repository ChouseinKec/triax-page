
import React from 'react';

export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Development logging utility that only outputs logs in development environment.
 * All methods are no-ops in production. Provides error, warning, and standard logging.
 */
export const devLog = {
	/**
	 * Logs error messages and returns a specified value (development only).
	 * The last argument is returned, and all preceding arguments are logged.
	 * @param {...unknown} args - One or more values to log, with the last being the return value.
	 * @returns The last argument passed to the function.
	 * @example
	 * return devLog.error('API Failed:', error, null); // Logs 'API Failed:' and error, returns null
	 */
	error: <T,>(...args: [...messages: unknown[], returnValue: T]): T => {
		if (isDevelopment) {
			const messages = args.slice(0, -1);
			console.error(...messages);
		}
		return args[args.length - 1] as T;
	},

	/**
	 * Logs warning messages and returns a specified value (development only).
	 * The last argument is returned, and all preceding arguments are logged.
	 * @param {...unknown} args - One or more values to log, with the last being the return value.
	 * @returns The last argument passed to the function.
	 * @example
	 * return devLog.warn('Deprecated function called', undefined); // Logs message, returns undefined
	 */
	warn: <T,>(...args: [...messages: unknown[], returnValue: T]): T => {
		if (isDevelopment) {
			const messages = args.slice(0, -1);
			console.warn(...messages);
		}
		return args[args.length - 1] as T;
	},

	/**
	 * Logs messages and returns a specified value (development only).
	 * The last argument is returned, and all preceding arguments are logged.
	 * @param {...unknown} args - One or more values to log, with the last being the return value.
	 * @returns The last argument passed to the function.
	 * @example
	 * return devLog.log('Component mounted', true); // Logs message, returns true
	 */
	log: <T,>(...args: [...messages: unknown[], returnValue: T]): T => {
		if (isDevelopment) {
			const messages = args.slice(0, -1);
			console.log(...messages);
		}
		return args[args.length - 1] as T;
	},

	/**
	 * Logs info messages and returns a specified value (development only).
	 * The last argument is returned, and all preceding arguments are logged.
	 * @param {...unknown} args - One or more values to log, with the last being the return value.
	 * @returns The last argument passed to the function.
	 * @example
	 * return devLog.info('Data fetched', data, data); // Logs 'Data fetched' and data, returns data
	 */
	info: <T,>(...args: [...messages: unknown[], returnValue: T]): T => {
		if (isDevelopment) {
			const messages = args.slice(0, -1);
			console.info(...messages);
		}
		return args[args.length - 1] as T;
	},

	/**
	 * Logs tabular data to console.table (development only)
	 * @param data - Array of objects or object to display as table
	 * @param columns - Optional array of column names to display
	 * @example
	 * devLog.table([{ id: 'user1', status: 'active' }, { id: 'user2', status: 'inactive' }]);
	 * devLog.table(data, ['id', 'status']);
	 */
	table: (data: unknown[] | Record<string, unknown>, columns?: string[]): void => {
		return;
		if (isDevelopment) { console.table(data, columns) };
	},
};

/**
 * Development UI rendering utility that only renders components in development environment.
 * Returns null in production. Provides error indicators and debug components for development.
 */
export const devRender = {
	/**
	 * Renders error indicator component (development only)
	 * @param message Error message to display
	 * @param context Optional context information
	 * @returns React element in development, null in production
	 * @example
	 * devRender.error('Unknown attribute', { attribute: 'unknownProp' })
	 * devRender.error('Block not found', { blockID: 'missing-123' })
	 */
	error: (message: string, context?: Record<string, unknown>): React.ReactElement | null => {
		if (!isDevelopment) return null;
		const contextStr = context ? ` (${JSON.stringify(context)})` : '';
		return React.createElement(
			'div',
			{
				style: {
					color: 'red',
					fontSize: '12px',
					padding: '4px',
					border: '1px solid red',
					backgroundColor: '#ffeaea',
					borderRadius: '3px'
				}
			},
			`🚨 ${message}${contextStr}`
		);
	},

	/**
	 * Renders warning indicator component (development only)
	 * @param message Warning message to display
	 * @param context Optional context information
	 * @returns React element in development, null in production
	 * @example
	 * devRender.warn('Deprecated attribute', { attribute: 'oldProp' })
	 * devRender.warn('Performance issue detected')
	 */
	warn: (message: string, context?: Record<string, unknown>): React.ReactElement | null => {
		if (!isDevelopment) return null;
		const contextStr = context ? ` (${JSON.stringify(context)})` : '';
		return React.createElement(
			'div',
			{
				style: {
					color: 'orange',
					fontSize: '12px',
					padding: '4px',
					border: '1px solid orange',
					backgroundColor: '#fff8e6',
					borderRadius: '3px'
				}
			},
			`⚠️ ${message}${contextStr}`
		);
	},

	/**
	 * Renders info indicator component (development only)
	 * @param message Info message to display
	 * @param context Optional context information
	 * @returns React element in development, null in production
	 * @example
	 * devRender.info('Component rendered', { props: { id: 'test' } })
	 * devRender.info('Debug info', { state: currentState })
	 */
	info: (message: string, context?: Record<string, unknown>): React.ReactElement | null => {
		if (!isDevelopment) return null;
		const contextStr = context ? ` (${JSON.stringify(context)})` : '';
		return React.createElement(
			'div',
			{
				style: {
					color: 'blue',
					fontSize: '12px',
					padding: '4px',
					border: '1px solid blue',
					backgroundColor: '#e6f4ff',
					borderRadius: '3px'
				}
			},
			`ℹ️ ${message}${contextStr}`
		);
	},
};
