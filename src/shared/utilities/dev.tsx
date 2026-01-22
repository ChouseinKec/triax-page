
import React from 'react';

// Components
import DropdownReveal from '@/shared/components/reveal/dropdown/component';


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
	 * Renders a development indicator component with an icon (development only)
	 * @param icon Icon to display (e.g., emoji or React element)
	 * @param message Message to display
	 * @param context Optional context information
	 * @param color Text color
	 * @param bgColor Background color
	 * @param borderColor Border color
	 * @returns React element in development, null in production
	 */
	indicator: (
		icon: string | React.ReactElement,
		message: string,
		context?: Record<string, unknown>,
		color: string = 'black',
		bgColor: string = '#f0f0f0',
		borderColor: string = '#ccc'
	): React.ReactElement | null => {
		if (!isDevelopment) return null;
		const contextStr = context ? ` (${JSON.stringify(context)})` : '';
		return (
			<div
				style={{
					color,
					fontSize: '12px',
					padding: '4px',
					border: `1px solid ${borderColor}`,
					backgroundColor: bgColor,
					borderRadius: '3px'
				}}
			>

				<DropdownReveal
					placeholder={`${icon} Oops`}
				>
					{`${message}${contextStr}`}

				</DropdownReveal>
			</div>
		);
	},

	/**
	 * Renders error indicator component (development only)
	 * @param message Error message to display
	 * @param context Optional context information
	 * @returns React element in development, null in production
	 * @example
	 * devRender.error('Unknown attribute', { attribute: 'unknownProp' })
	 * devRender.error('Block not found', { NodeID: 'missing-123' })
	 */
	error: (message: string, context?: Record<string, unknown>): React.ReactElement | null => {
		return devRender.indicator('🚨', message, context, 'red', '#ffeaea', 'red');
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
		return devRender.indicator('⚠️', message, context, 'orange', '#fff8e6', 'orange');
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
		return devRender.indicator('ℹ️', message, context, 'blue', '#e6f4ff', 'blue');
	},
};
