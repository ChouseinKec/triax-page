/**
 * Represents the possible side positions in the selection.
*/
export type Side = 'top' | 'right' | 'bottom' | 'left' | null;

/**
 * Represents the possible corner positions in the selection.
*/
export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | null;

/**
 * Represents the possible center position in the selection.
*/
export type Center = 'all' | null;

/**
 * Union of possible position types including sides, corners, or center.
*/
export type Positions = Side | Corner | Center;

/**
 * Props for the PositionSelect component, which allows selection of position options.
 */
export type PositionSelectProps = {
    /**
     * Default value for the position selection.
    */
    defaultValue?: Positions;
    /**
     * Whether corners should be selectable in the position selection.
    */
    isCornerSelectable?: boolean;

    /**
     * Whether the center position should be selectable in the position selection.
    */
    isCenterSelectable?: boolean;


    /**
     * Callback when the side selection changes.
    */
    onChangeSide: (value: Side) => void;

    /**
     * Callback when the corner selection changes.
    */
    onChangeCorner: (value: Corner) => void;

};
