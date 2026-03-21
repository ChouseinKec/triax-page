// Types
import type { TerminalDefinition } from '@/core/block/style/types/terminal';

// Utilities
import { matchToken as colorMatchTerminal, matchValue as colorGetValueToken, createOption as colorCreateOption, getDefault as colorGetDefault } from '@/config/block/style/terminal/color/utilities';
import { matchToken as numberMatchTerminal, matchValue as numberGetValueToken, createOption as numberCreateOption, getDefault as numberGetDefault } from '@/config/block/style/terminal/number/utilities';
import { matchToken as integerMatchTerminal, matchValue as integerGetValueToken, createOption as integerCreateOption, getDefault as integerGetDefault } from '@/config/block/style/terminal/integer/utilities';
import { matchToken as dimensionMatchTerminal, matchValue as dimensionGetValueToken, createOption as dimensionCreateOption, getDefault as dimensionGetDefault } from '@/config/block/style/terminal/dimension/utilities';
import { matchToken as keywordMatchTerminal, matchValue as keywordGetValueToken, createOption as keywordCreateOption, getDefault as keywordGetDefault } from '@/config/block/style/terminal/keyword/utilities';
import { matchToken as functionMatchTerminal, matchValue as functionGetValueToken, createOption as functionCreateOption, getDefault as functionGetDefault } from '@/config/block/style/terminal/function/utilities';
import { matchToken as gradientMatchTerminal, matchValue as gradientGetValueToken, createOption as gradientCreateOption, getDefault as gradientGetDefault } from '@/config/block/style/terminal/gradient/utilities';
import { matchToken as customIdentMatchTerminal, matchValue as customIdentGetValueToken, createOption as customIdentCreateOption, getDefault as customIdentGetDefault } from '@/config/block/style/terminal/custom-ident/utilities';
import { matchToken as stringMatchTerminal, matchValue as stringGetValueToken, createOption as stringCreateOption, getDefault as stringGetDefault } from '@/config/block/style/terminal/string/utilities';

// Component
import TokenColor from '@/config/block/style/terminal/color/component';
import TokenNumber from '@/config/block/style/terminal/number/component';
import TokenInteger from '@/config/block/style/terminal/integer/component';
import TokenDimension from '@/config/block/style/terminal/dimension/component';
import TokenKeyword from '@/config/block/style/terminal/keyword/component';
import SlotFunction from '@/config/block/style/terminal/function/component';
import TokenGradient from '@/config/block/style/terminal/gradient/component';
import TokenCustomIdent from '@/config/block/style/terminal/custom-ident/component';
import TokenString from '@/config/block/style/terminal/string/component';

/**
 * CSS terminals — the primitive data types resolved directly by the parser,
 * without further grammar expansion.
 */
export const TERMINALS: TerminalDefinition[] = [
	{
		key: '<keyword>',
		getDefault: (terminalToken) => keywordGetDefault(terminalToken),

		priority: 10,
		getComponent: (props) => <TokenKeyword {...props} />,
		matchValue: keywordGetValueToken,
		matchToken: keywordMatchTerminal,
		createOption: keywordCreateOption,
	},

	{
		// Matches CSS identifiers that contain uppercase letters or underscores,
		// such as font family names ('Geist', 'MyFont'). Pure lowercase-hyphen
		// identifiers are handled first by <keyword>.
		key: '<custom-ident>',
		getDefault: (terminalToken) => customIdentGetDefault(terminalToken),
		priority: 15,
		getComponent: (props) => <TokenCustomIdent {...props} />,
		matchValue: customIdentGetValueToken,
		matchToken: customIdentMatchTerminal,
		createOption: customIdentCreateOption,
	},

	{
		// Matches any CSS quoted string value, e.g. "hello" or 'hello'.
		key: '<string>',
		getDefault: (terminalToken) => stringGetDefault(terminalToken),
		priority: 17,
		getComponent: (props) => <TokenString {...props} />,
		matchValue: stringGetValueToken,
		matchToken: stringMatchTerminal,
		createOption: stringCreateOption,
	},

	{
		key: '<number>',
		getDefault: (terminalToken) => numberGetDefault(terminalToken),

		priority: 20,
		getComponent: (props) => <TokenNumber {...props} />,
		matchValue: numberGetValueToken,
		matchToken: numberMatchTerminal,
		createOption: numberCreateOption,
	},
	{
		key: '<integer>',
		getDefault: (terminalToken) => integerGetDefault(terminalToken),

		priority: 30,
		getComponent: (props) => <TokenInteger {...props} />,
		matchValue: integerGetValueToken,
		matchToken: integerMatchTerminal,
		createOption: integerCreateOption,
	},


	{
		key: '<percentage>',
		getDefault: (terminalToken) => dimensionGetDefault(terminalToken),

		priority: 40,
		getComponent: (props) => <TokenDimension {...props} />,
		matchValue: dimensionGetValueToken,
		matchToken: dimensionMatchTerminal,
		createOption: dimensionCreateOption
	},
	{
		key: '<length>',
		getDefault: (terminalToken) => dimensionGetDefault(terminalToken),

		priority: 50,
		getComponent: (props) => <TokenDimension {...props} />,
		matchValue: dimensionGetValueToken,
		matchToken: dimensionMatchTerminal,
		createOption: dimensionCreateOption
	},
	{
		key: '<angle>',
		getDefault: (terminalToken) => dimensionGetDefault(terminalToken),

		priority: 60,
		getComponent: (props) => <TokenDimension {...props} />,
		matchValue: dimensionGetValueToken,
		matchToken: dimensionMatchTerminal,
		createOption: dimensionCreateOption
	},
	{
		key: '<flex>',
		getDefault: (terminalToken) => dimensionGetDefault(terminalToken),

		priority: 70,
		getComponent: (props) => <TokenDimension {...props} />,
		matchValue: dimensionGetValueToken,
		matchToken: dimensionMatchTerminal,
		createOption: dimensionCreateOption

	},

	{
		key: '<dimension>',
		getDefault: (terminalToken) => dimensionGetDefault(terminalToken),

		priority: 80,
		getComponent: (props) => <TokenDimension {...props} />,
		matchValue: dimensionGetValueToken,
		matchToken: dimensionMatchTerminal,
		createOption: dimensionCreateOption
	},

	{
		key: '<color>',
		getDefault: (terminalToken) => colorGetDefault(terminalToken),

		priority: 90,
		getComponent: (props) => <TokenColor {...props} />,
		matchValue: colorGetValueToken,
		matchToken: colorMatchTerminal,
		createOption: colorCreateOption,
	},

	{
		// CSS gradient functions — handled as an atomic terminal rather than expanding
		// the full non-terminal grammar, which avoids deep recursive parsing overhead.
		key: '<gradient>',
		getDefault: (terminalToken) => gradientGetDefault(terminalToken),

		priority: 95,
		getComponent: (props) => <TokenGradient {...props} />,
		matchValue: gradientGetValueToken,
		matchToken: gradientMatchTerminal,
		createOption: gradientCreateOption,
	},

	{
		// Not a CSS spec primitive, but a UI rendering primitive —
		// handles all functional notation values (blur(), translate(), etc.)
		// as a single atomic editor unit.
		key: '<function>',
		getDefault: (terminalToken) => functionGetDefault(terminalToken),

		priority: 100,
		getComponent: (props) => <SlotFunction {...props} />,
		matchValue: functionGetValueToken,
		matchToken: functionMatchTerminal,
		createOption: functionCreateOption,
	},



];
