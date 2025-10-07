
import React from 'react';

export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Development logging utility that only outputs logs in development environment.
 * All methods are no-ops in production. Provides error, warning, and standard logging.
 */
export const devLog = {
	/**
	 * Logs error messages (development only).
	 * @param {...unknown} args - Values to log as an error.
	 * @example
	 * devLog.error('API Failed:', error);
	 */
	error: (...args: unknown[]): void => {
		if (isDevelopment) {
			console.error(...args);
		}
	},

	/**
	 * Logs warning messages (development only).
	 * @param {...unknown} args - Values to log as a warning.
	 * @example
	 * devLog.warn('Deprecated function called');
	 */
	warn: (...args: unknown[]): void => {
		if (isDevelopment) {
			console.warn(...args);
		}
	},

	/**
	 * Logs messages (development only).
	 * @param {...unknown} args - Values to log.
	 * @example
	 * devLog.log('Component mounted');
	 */
	log: (...args: unknown[]): void => {
		if (isDevelopment) {
			console.log(...args);
		}
	},

	/**
	 * Logs info messages (development only).
	 * @param {...unknown} args - Values to log as info.
	 * @example
	 * devLog.info('Data fetched', data);
	 */
	info: (...args: unknown[]): void => {
		if (isDevelopment) {
			console.info(...args);
		}
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
		if (isDevelopment) {
			console.table(data, columns);
		}
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
