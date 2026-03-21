// Types
import type { NonTerminalDefinition } from '@/core/block/style/types/';

/**
 * Generic non-terminals shared across multiple CSS modules.
 * Includes URLs, images, color interpolation, position,
 * and shared value types used by multiple module groups.
 *
 * Note: `<gradient>` is handled as a terminal (atomic editor unit) rather than
 * expanding its full grammar here, avoiding deep recursive parsing overhead.
 */
export const GENERIC_NON_TERMINALS: NonTerminalDefinition[] = [
    // URL (CSS Values and Units Module Level 4)
    { key: '<url>', value: '<url()>' },
    // Image (CSS Images Module Level 3 & 4)
    { key: '<image>', value: '<url> | <cross-fade()> | <gradient>' },
    { key: '<cf-image>', value: '[ <url> | <color> ] && <percentage [0,100]>?' },
    // Position (CSS Backgrounds and Borders Module Level 3)
    { key: '<position>', value: '<position-one> | <position-two> | <position-four>' },
    { key: '<position-one>', value: '[ left | center | right | top | bottom | x-start | x-end | y-start | y-end | block-start | block-end | inline-start | inline-end | <length-percentage> ]' },
    { key: '<position-two>', value: '[ left | center | right | x-start | x-end ] && [ top | center | bottom | y-start | y-end ] | [ left | center | right | x-start | x-end | <length-percentage> ] [ top | center | bottom | y-start | y-end | <length-percentage> ] | [ block-start | center | block-end ] && [ inline-start | center | inline-end ] | [ start | center | end ]{2}' },
    { key: '<position-three>', value: '[ left | center | right ] && [ [ top | bottom ] <length-percentage> ] | [ [ left | right ] <length-percentage> ] && [ top | center | bottom ]' },
    { key: '<position-four>', value: '[ [ left | right | x-start | x-end ] <length-percentage> ] && [ [ top | bottom | y-start | y-end ] <length-percentage> ] | [ [ block-start | block-end ] <length-percentage> ] && [ [ inline-start | inline-end ] <length-percentage> ] | [ start | end ] <length-percentage> [ start | end ] <length-percentage>' },
    // Box model geometry — shared by Background (<bg-clip>) and Mask (<paint-box>)
    { key: '<visual-box>', value: 'content-box | padding-box | border-box' },
    // Line properties — shared by Border and Font (column-rule-*, text-decoration-*)
    { key: '<line-style>', value: 'none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset' },
    { key: '<line-width>', value: '<length [0,∞]> | thin | medium | thick' },

];

/**
 * Background non-terminals (CSS Backgrounds and Borders Module Level 3).
 */
export const BACKGROUND_NON_TERMINALS: NonTerminalDefinition[] = [
    { key: '<blend-mode>', value: 'normal | darken | multiply | color-burn | lighten | screen | color-dodge | overlay | soft-light | hard-light | difference | exclusion | hue | saturation | color | luminosity' },
    { key: '<repeat-style>', value: 'repeat-x | repeat-y | repeat-block | repeat-inline | <repetition>{1,2}' },
    { key: '<repetition>', value: 'repeat | space | round | no-repeat' },
    { key: '<attachment>', value: 'scroll | fixed | local' },
    { key: '<bg-size>', value: '[<length-percentage [0,∞]> | auto ]{1,2} | cover | contain' },
    { key: '<bg-clip>', value: '<visual-box> | [border-area || text]' },
    { key: '<bg-position>', value: '<position> | <position-three>' },
    { key: '<bg-image>', value: '[<image> | none]' },
];

/**
 * Mask non-terminals (CSS Masking Module Level 1).
 */
export const MASK_NON_TERMINALS: NonTerminalDefinition[] = [
    { key: '<mask-reference>', value: 'none | <image> | <mask-source>' },
    { key: '<mask-source>', value: '<url>' },
    { key: '<masking-mode>', value: 'alpha | luminance | match-source' },
    { key: '<coord-box>', value: '<paint-box> | view-box' },
    { key: '<paint-box>', value: '<visual-box> | fill-box | stroke-box' },
    { key: '<compositing-operator>', value: 'add | subtract | intersect | exclude' },
];

/**
 * Border non-terminals (CSS Backgrounds and Borders Module Level 3, CSS Box Model).
 */
export const BORDER_NON_TERMINALS: NonTerminalDefinition[] = [
    { key: '<slash-separated-border-radius-syntax>', value: '<length-percentage [0,∞]> | <length-percentage [0,∞]> / <length-percentage [0,∞]> ' },
    { key: '<legacy-border-radius-syntax>', value: '<length-percentage [0,∞]>{1,2}' },
    { key: '<outline-line-style>', value: 'none | auto | dotted | dashed | solid | double | groove | ridge | inset | outset' },
];

/**
 * Display / layout non-terminals (CSS Display Module Level 3, CSS Flexbox Level 1, CSS Grid Level 2).
 */
export const DISPLAY_NON_TERMINALS: NonTerminalDefinition[] = [
    { key: '<display-outside>', value: 'block | inline' },
    { key: '<display-inside>', value: 'flow-root | flex | grid' },
    { key: '<display-box>', value: 'none' },
    { key: '<baseline-position>', value: '[ first | last ]? && baseline' },
    { key: '<overflow-position>', value: 'unsafe | safe' },
    { key: '<self-position>', value: 'center | start | end | self-start | self-end | flex-start | flex-end' },
    { key: '<content-distribution>', value: 'space-between | space-around | space-evenly | stretch' },
    { key: '<content-position>', value: 'center | start | end | flex-start | flex-end' },
    { key: '<row-gap>', value: 'normal | <length-percentage [0,∞]>' },
    { key: '<column-gap>', value: 'normal | <length-percentage [0,∞]>' },
    { key: '<width>', value: 'auto | <length-percentage [0,∞]> | min-content | max-content | fit-content( <length-percentage [0,∞]> ) | <calc-size()> | stretch | fit-content | contain' },
    { key: '<size-keyword>', value: 'auto | min-content | max-content | fit-content | stretch | contain' },
    { key: '<calc-size-basis>', value: '<size-keyword> | any | <calc-sum>' },
    { key: '<calc-sum>', value: "<calc-product> [ [ '+' | '-' ] <calc-product> ]*" },
    { key: '<calc-product>', value: "<calc-value> [ [ '*' | '/' ] <calc-value> ]*" },
    { key: '<calc-value>', value: '<number> | <dimension> | <percentage> | <calc-keyword> | ( <calc-sum> )' },
    { key: '<calc-keyword>', value: 'e | pi | infinity | -infinity | NaN' },
    { key: '<track-size>', value: '<track-breadth> | minmax(<inflexible-breadth> , <track-breadth>) | fit-content( <length-percentage [0,∞]> )' },
    { key: '<track-breadth>', value: '<length-percentage [0,∞]> | <flex [0,∞]> | min-content | max-content | auto' },
    { key: '<track-list>', value: '[ <track-size> | <track-repeat> ]+' },
    { key: '<track-repeat>', value: 'repeat( <integer [1,∞]> , <track-size>+ )' },
    { key: '<auto-track-list>', value: '<auto-repeat>' },
    { key: '<fixed-size>', value: '<fixed-breadth> | minmax( <fixed-breadth> , <track-breadth> ) | minmax( <inflexible-breadth> , <fixed-breadth> )' },
    { key: '<fixed-repeat>', value: 'repeat( <integer [1,∞]> , <fixed-size>+ )' },
    { key: '<fixed-breadth>', value: '<length-percentage [0,∞]>' },
    { key: '<auto-repeat>', value: 'repeat([ auto-fill | auto-fit ] , <track-size>+)' },
    { key: '<inflexible-breadth>', value: '<length-percentage [0,∞]> | min-content | max-content | auto' },
];

/**
 * Filter / effect non-terminals (CSS Filter Effects Module Level 1, CSS Transforms Module Level 2).
 * Note: individual filter and transform function notations live in FUNCTION_NOTATIONS.
 */
export const FILTER_NON_TERMINALS: NonTerminalDefinition[] = [
    { key: '<filter-value-list>', value: '[ <filter-function> | <url> ]+' },
    { key: '<filter-function>', value: '<blur()> | <brightness()> | <contrast()> | <drop-shadow()> | <grayscale()> | <hue-rotate()> | <invert()> | <opacity()> | <sepia()> | <saturate()>' },
    { key: '<transform-list>', value: '<transform-function>+' },
    { key: '<transform-function>', value: '<scale3d()> | <scale()> | <scaleX()> | <scaleY()> | <scaleZ()> | <translate3d()> | <translate()> | <translateX()> | <translateY()> | <translateZ()> | <rotate3d()> | <rotate()> | <rotateX()> | <rotateY()> | <rotateZ()> | <skew()> | <skewX()> |<skewY()> | <matrix3d()> | <matrix()> | <perspective()>' },
    { key: '<spread-shadow>', value: '<box-shadow-color>? && [ <length>{2} [ <box-shadow-blur> <box-shadow-spread>? ]? ]  &&  <box-shadow-position>?' },
    { key: '<box-shadow-color>', value: '<color>' },
    { key: '<box-shadow-blur>', value: '<length [0,∞]>' },
    { key: '<box-shadow-spread>', value: '<length>' },
    { key: '<box-shadow-position>', value: 'inset' },
    { key: '<opacity-value>', value: '<number> | <percentage>' },
];

/**
 * Font / text non-terminals (CSS Fonts Module Level 4, CSS Text Module Level 4,
 * CSS Text Decoration Module Level 4).
 * Note: <line-style> and <line-width> live in GENERIC_NON_TERMINALS.
 */
export const FONT_NON_TERMINALS: NonTerminalDefinition[] = [
    { key: '<absolute-size>', value: 'xx-small | x-small | small | medium | large | x-large | xx-large | xxx-large' },
    { key: '<relative-size>', value: 'larger | smaller' },
    { key: '<font-weight-absolute>', value: 'normal | bold | <number [1,1000]>' },
    { key: '<family-name>', value: '<string> | <custom-ident>' },
    { key: '<generic-family>', value: '<generic-complete> | <generic-incomplete>' },
    { key: '<generic-complete>', value: 'Serif | Sans-Serif | System-Ui | Cursive | Fantasy | Math | Monospace' },
    { key: '<generic-incomplete>', value: 'Ui-Serif | Ui-Sans-Serif | Ui-Monospace | Ui-Rounded' },
    { key: '<text-decoration-line>', value: 'none | [ underline || overline || line-through ]' },
    { key: '<text-decoration-thickness>', value: 'auto | from-font | <length-percentage>' },
    { key: '<text-decoration-style>', value: 'solid | double | dotted | dashed | wavy' },
    { key: '<text-decoration-color>', value: '<color>' },
    { key: '<shadow>', value: '<color>? && [ <length>{2} [ <length [0,∞]> <length>? ]? ]  &&  inset?' },
    { key: '<white-space-collapse>', value: 'collapse | discard | preserve | preserve-breaks | preserve-spaces | break-spaces' },
    { key: '<text-wrap-mode>', value: 'wrap | nowrap' },
    { key: '<white-space-trim>', value: 'none | discard-before || discard-after || discard-inner' },
    { key: '<line-width-list>', value: '<line-width-or-repeat>#' },
    { key: '<auto-line-width-list>', value: '<line-width-or-repeat>#? , <auto-repeat-line-width> , <line-width-or-repeat>#?' },
    { key: '<line-width-or-repeat>', value: '<line-width> | <repeat-line-width>' },
    { key: '<auto-repeat-line-width>', value: 'repeat( auto , [ <line-width> ]# )' },
    { key: '<repeat-line-width>', value: 'repeat( <integer [1,∞]> , [ <line-width> ]# )' },
    { key: '<line-style-list>', value: '<line-style-or-repeat>#' },
    { key: '<auto-line-style-list>', value: '<line-style-or-repeat>#? , <auto-repeat-line-style> , <line-style-or-repeat>#?' },
    { key: '<line-style-or-repeat>', value: '<line-style> | <repeat-line-style>' },
    { key: '<auto-repeat-line-style>', value: 'repeat( auto , [ <line-style> ]# )' },
    { key: '<repeat-line-style>', value: 'repeat( <integer [1,∞]> , [ <line-style> ]# )' },
    { key: '<line-color-list>', value: '<line-color-or-repeat>#' },
    { key: '<auto-line-color-list>', value: '<line-color-or-repeat>#? , <auto-repeat-line-color> , <line-color-or-repeat>#?' },
    { key: '<line-color-or-repeat>', value: '<color> | <repeat-line-color>' },
    { key: '<auto-repeat-line-color>', value: 'repeat( auto , [ <color> ]# )' },
    { key: '<repeat-line-color>', value: 'repeat( <integer [1,∞]> , [ <color> ]# )' },
];

/**
 * Size / position / scroll non-terminals
 * (CSS Sizing Module Level 4, CSS Positioned Layout Level 3, CSS Scroll Snap Module Level 1).
 */
export const SIZE_NON_TERMINALS: NonTerminalDefinition[] = [
    { key: '<ratio>', value: '<number [0,∞]> | <number [0,∞]> / <number [0,∞]>' },
    { key: '<overflow-block>', value: 'visible | hidden | clip | scroll | auto' },
];

/**
 * Convenience combination types — shorthand aliases for frequently combined terminal pairs
 * (CSS Values and Units Module Level 4).
 */
export const CONVENIENCE_NOTATIONS: NonTerminalDefinition[] = [
    { key: '<length-percentage>', value: '<length> | <percentage>' },
    { key: '<angle-percentage>', value: '<angle> | <percentage>' },
];

/**
 * CSS functional notations — all <name()> productions grouped by CSS module.
 */
export const FUNCTION_NOTATIONS: NonTerminalDefinition[] = [
    // URL functions (CSS Values and Units Module Level 4)
    { key: '<url()>', value: 'url( <string>)' },
    // Image functions (CSS Images Module Level 3 & 4)
    { key: '<cross-fade()>', value: 'cross-fade( <cf-image># )' },
    // Gradient functions (CSS Images Module Level 3)
    { key: '<linear-gradient()>', value: 'linear-gradient([<linear-gradient-syntax>])' },
    { key: '<repeating-linear-gradient()>', value: 'repeating-linear-gradient( [ <linear-gradient-syntax> ] )' },
    { key: '<radial-gradient()>', value: 'radial-gradient( [ <radial-gradient-syntax> ] )' },
    { key: '<repeating-radial-gradient()>', value: 'repeating-radial-gradient( [ <radial-gradient-syntax> ] )' },
    { key: '<conic-gradient()>', value: 'conic-gradient( [ <conic-gradient-syntax> ] )' },
    { key: '<repeating-conic-gradient()>', value: 'repeating-conic-gradient( [ <conic-gradient-syntax> ] )' },
    // Layout functions (CSS Grid Level 2, CSS Sizing Level 4)
    { key: '<calc-size()>', value: 'calc-size( <calc-size-basis> , <calc-sum> )' },
    { key: '<snap-block()>', value: 'snap-block( <length> , [ start | end | near ]? )' },
    { key: '<snap-inline()>', value: ' snap-inline( <length> , [ left | right | near ]? )' },
    // Filter functions (CSS Filter Effects Module Level 1)
    { key: '<blur()>', value: 'blur( <length> )' },
    { key: '<brightness()>', value: 'brightness( [ <number> | <percentage> ] )' },
    { key: '<contrast()>', value: 'contrast( [ <number> | <percentage> ] )' },
    { key: '<drop-shadow()>', value: 'drop-shadow( [ <color>? && <length>{2,3} ] )' },
    { key: '<grayscale()>', value: 'grayscale( [ <number> | <percentage> ] )' },
    { key: '<hue-rotate()>', value: 'hue-rotate( [ <angle> | <zero> ] )' },
    { key: '<invert()>', value: 'invert( [ <number> | <percentage> ] )' },
    { key: '<opacity()>', value: 'opacity( [ <number> | <percentage> ] )' },
    { key: '<sepia()>', value: 'sepia( [ <number> | <percentage> ] )' },
    { key: '<saturate()>', value: 'saturate( [ <number> | <percentage> ] )' },
    // Transform functions (CSS Transforms Module Level 2)
    { key: '<scale3d()>', value: 'scale3d( [ <number> | <percentage> ]#{3} )' },
    { key: '<scale()>', value: 'scale( <number> , <number>? )' },
    { key: '<scaleX()>', value: 'scaleX( <number> )' },
    { key: '<scaleY()>', value: 'scaleY( <number> )' },
    { key: '<scaleZ()>', value: 'scaleZ( [ <number> | <percentage> ] )' },
    { key: '<translate3d()>', value: 'translate3d( <length-percentage> , <length-percentage> , <length> )' },
    { key: '<translate()>', value: 'ttranslate( <length-percentage> , <length-percentage>? )' },
    { key: '<translateX()>', value: 'translateX( <length-percentage> )' },
    { key: '<translateY()>', value: 'translateY( <length-percentage> )' },
    { key: '<translateZ()>', value: 'translateZ( <length> )' },
    { key: '<rotate3d()>', value: 'rotate3d( <number> , <number> , <number> , [ <angle> | <zero> ] )' },
    { key: '<rotate()>', value: 'rotate( [ <angle> | <zero> ] )' },
    { key: '<rotateX()>', value: 'rotateX( [ <angle> | <zero> ] )' },
    { key: '<rotateY()>', value: 'rotateY( [ <angle> | <zero> ] )' },
    { key: '<rotateZ()>', value: 'rotateZ( [ <angle> | <zero> ] )' },
    { key: '<skew()>', value: 'skew( [ <angle> | <zero> ] , [ <angle> | <zero> ]? )' },
    { key: '<skewX()>', value: 'skewX( [ <angle> | <zero> ] )' },
    { key: '<skewY()>', value: 'skewY( [ <angle> | <zero> ] )' },
    { key: '<matrix3d()>', value: 'matrix3d( <number>#{16} )' },
    { key: '<matrix()>', value: 'matrix( <number>#{6} )' },
    { key: '<perspective()>', value: 'perspective( [ <length [0,∞]> | none ] )' },

];

/**
 * All grammar productions merged into a single lookup table for the parser.
 */
export const NON_TERMINALS: NonTerminalDefinition[] = [
    ...CONVENIENCE_NOTATIONS,
    ...GENERIC_NON_TERMINALS,
    ...BACKGROUND_NON_TERMINALS,
    ...MASK_NON_TERMINALS,
    ...BORDER_NON_TERMINALS,
    ...DISPLAY_NON_TERMINALS,
    ...FILTER_NON_TERMINALS,
    ...FONT_NON_TERMINALS,
    ...SIZE_NON_TERMINALS,
    ...FUNCTION_NOTATIONS,
];
