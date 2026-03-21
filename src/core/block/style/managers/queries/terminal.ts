// Types
import type { TerminalKey, TerminalDefinition, NonTerminalDefinition, NonTerminalKey } from '@/core/block/style/types';

// Registry
import { getRegisteredNonTerminals, getRegisteredTerminals } from '@/core/block/style/state/registry';

export function getTerminalDefinitions(): TerminalDefinition[] {
	return Object.values(getRegisteredTerminals());
}

export function getTerminalDefinition(terminalKey: TerminalKey): TerminalDefinition | undefined {
	const terminals = getTerminalDefinitions();
	return terminals.find((def) => def.key === terminalKey);
}

export function getNonTerminalDefinitions(): NonTerminalDefinition[] {
	return Object.values(getRegisteredNonTerminals());
}

export function getNonTerminalDefinition(nonTerminalKey: NonTerminalKey): NonTerminalDefinition | undefined {
	const nonTerminals = getNonTerminalDefinitions();
	return nonTerminals.find((def) => def.key === nonTerminalKey);
}
