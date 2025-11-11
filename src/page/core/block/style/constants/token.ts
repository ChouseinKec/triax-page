// Types
import { TokenDefinition, TokenKeys } from '@/src/page/core/block/style/types';
import JSON from './tokens.json';

/**
 * A lookup table of all supported CSS data type tokens and their definitions.
 * Each entry is a TokenDefinition object describing the token's name and syntax.
 */
export const TOKEN_DEFINITIONS: Record<TokenKeys, TokenDefinition> = JSON.tokens as Record<TokenKeys, TokenDefinition>;

/**
 * Default values for common CSS data types.
 * Used for initializing properties and ensuring valid defaults.
 */
export const TOKEN_DEFAULTS: Partial<Record<TokenKeys, string>> = JSON.defaults as Partial<Record<TokenKeys, string>>;
