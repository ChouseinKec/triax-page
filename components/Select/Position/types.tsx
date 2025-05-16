/**
 * Represents the possible side positions in the selection.
*/
export type POSITION_SELECT_SIDE = 'Top' | 'Right' | 'Bottom' | 'Left' | null;

/**
 * Represents the possible corner positions in the selection.
*/
export type POSITION_SELECT_CORNER = 'TopLeft' | 'TopRight' | 'BottomLeft' | 'BottomRight' | null;

/**
 * Represents the possible center position in the selection.
*/
export type POSITION_SELECT_CENTER = 'Center' | null;

/**
 * Union of possible position types including sides, corners, or center.
*/
export type POSITION_SELECT_POSITION = POSITION_SELECT_SIDE | POSITION_SELECT_CORNER | POSITION_SELECT_CENTER;

/**
 * Props for the PositionSelect component, which allows selection of position options.
 * 
 * @param {POSITION_SELECT_POSITION} [defaultValue] - The default selected position.
 * @param {boolean} [areCornersVisible] - Whether to show the corner options.
 * @param {(value: POSITION_SELECT_SIDE) => void} onChangeSide - Callback triggered when a side position is selected.
 * @param {(value: POSITION_SELECT_CORNER) => void} onChangeCorner - Callback triggered when a corner position is selected.
 */
export type POSITION_SELECT = {
    defaultValue?: POSITION_SELECT_POSITION;
    areCornersVisible?: boolean;
    onChangeSide: (value: POSITION_SELECT_SIDE) => void;
    onChangeCorner: (value: POSITION_SELECT_CORNER) => void;
};
