import { info } from 'console';

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
