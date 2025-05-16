import React, { memo, ReactElement, useCallback, useState } from 'react';
import { POSITION_SELECT, POSITION_SELECT_POSITION, POSITION_SELECT_SIDE, POSITION_SELECT_CORNER } from '@/components/Select/Position/types';
import CSS from '@/components/Select/Position/styles.module.css';

const POSITIONS: POSITION_SELECT_POSITION[] = [
    'TopLeft',
    'Top',
    'TopRight',

    'Left',
    'Center',
    'Right',

    'BottomLeft',
    'Bottom',
    'BottomRight',
]

const SIDES: POSITION_SELECT_SIDE[] = [
    'Top',
    'Right',
    'Bottom',
    'Left',
]

const CORNERS: POSITION_SELECT_CORNER[] = [
    'TopLeft',
    'TopRight',
    'BottomLeft',
    'BottomRight',
]



/**
 * Position Component
 * 
 * A reusable component that allows the user to select a position from a list.
 * It handles the selection of sides and corners separately, with callbacks for both.
 * 
 * @param {POSITION_SELECT} props - The component props.
 * @param {function} props.onChangeSide - Callback for when a side position is selected.
 * @param {function} props.onChangeCorner - Callback for when a corner position is selected.
 * @param {string} [props.defaultValue='Top'] - The default selected position.
 * @param {boolean} [props.areCornersVisible=true] - Flag to control whether corners should be visible.
 * @returns {ReactElement} - The rendered position select component.
*/
const Position: React.FC<POSITION_SELECT> = ({ onChangeSide, onChangeCorner, defaultValue = 'Top', areCornersVisible = false }: POSITION_SELECT): ReactElement => {
    const [currentPosition, setCurrentPosition] = useState(defaultValue);



    const isPositionSide = useCallback((value: POSITION_SELECT_POSITION): value is POSITION_SELECT_SIDE => {
        return SIDES.includes(value as never);
    }, []);

    const isPositionCorner = useCallback((value: POSITION_SELECT_POSITION): value is POSITION_SELECT_CORNER => {
        return CORNERS.includes(value as never);
    }, []);

    const isPositionSelected = useCallback((value: POSITION_SELECT_POSITION, currentPosition: POSITION_SELECT_POSITION) => {
        return value === currentPosition;
    }, []);



    /**
     * Handle the change in position.
     * If a side is selected, it updates the side and resets the corner.
     * If a corner is selected, it updates the corner and resets the side.
     * 
     * @param {POSITION_SELECT_POSITION} value - The position value that was selected.
     */
    const handleChange = useCallback((value: POSITION_SELECT_POSITION): void => {
        // Ensure callbacks are defined
        if (isPositionSide(value)) {
            onChangeSide(value); // Update the side if it's a side position
            onChangeCorner(null); // Reset the corner
        } else if (isPositionCorner(value)) {
            onChangeSide(null); // Reset the side
            onChangeCorner(value); // Update the corner if it's a corner position
        }

        setCurrentPosition(value); // Update the current selected position
    }, [onChangeCorner, onChangeSide, isPositionCorner, isPositionSide]
    );



    const renderDots = useCallback((currentPosition: POSITION_SELECT_POSITION) => {
        return POSITIONS.map((value) => (
            <i
                key={value}
                className={CSS.PositionSelect_Position}
                onClick={() => handleChange(value)}
                data-selected={isPositionSelected(value, currentPosition)}
                data-value={value}
            />
        ))
    }, [handleChange, isPositionSelected]);

    return (
        <div className={CSS.PositionSelect}>
            <div className={CSS.PositionSelect_Positions} data-corners={areCornersVisible}>
                {renderDots(currentPosition)}
            </div>

            <div className={CSS.PositionSelect_Current}>
                {currentPosition}
            </div>

        </div>
    );
};

export default memo(Position);