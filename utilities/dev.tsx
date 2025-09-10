
import React from 'react';

export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Development logging utility that only outputs logs in development environment.
 * All methods are no-ops in production. Provides error, warning, and standard logging.
 */
export const devLog = {
	/**
	 * Logs error messages to console.error (development only)
	 * @param {...unknown} args - One or more values to log (same signature as console.error)
	 * @example
	 * devLog.error('API Failed:', error);
	 * devLog.error('Validation errors:', error1, error2);
	 */
	error: (...args: unknown[]): void => {
		if (isDevelopment) console.error(...args);
	},

	/**
	 * Logs warning messages to console.warn (development only)
	 * @param {...unknown} args - One or more values to log (same signature as console.warn)
	 * @example
	 * devLog.warn('Deprecated function called');
	 * devLog.warn('Low disk space:', { available: '10MB' });
	 */
	warn: (...args: unknown[]): void => {
		if (isDevelopment) console.warn(...args);
	},

	/**
	 * Logs messages to console.log (development only)
	 * @param {...unknown} args - One or more values to log (same signature as console.log)
	 * @example
	 * devLog.log('Component mounted');
	 * devLog.log('State update:', prevState, '→', newState);
	 */
	log: (...args: unknown[]): void => {
		if (isDevelopment) console.log(...args);
	},

	/**
	 * Logs info messages to console.info (development only)
	 * @param {...unknown} args - One or more values to log (same signature as console.info)
	 * @example
	 * devLog.info('User logged in:', user);
	 * devLog.info('Data fetched successfully');
	 */
	info: (...args: unknown[]): void => {
		if (isDevelopment) console.info(...args);
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
