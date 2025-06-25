import React, { memo, ReactElement, useCallback, useState } from 'react';
import { PositionSelectProps, Positions, Side, Corner } from '@/components/select/position/types';
import CSS from '@/components/Select/Position/styles.module.css';

const POSITIONS: Positions[] = [
    'top-left',
    'top',
    'top-right',

    'left',
    'center',
    'right',

    'bottom-left',
    'bottom',
    'bottom-right',
]

const SIDES: Side[] = [
    'top',
    'right',
    'bottom',
    'left',
]

const CORNERS: Corner[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
]



/**
 * Position Component
 * 
 * A reusable component that allows the user to select a position from a list.
 * It handles the selection of sides and corners separately, with callbacks for both.
 * 
 * @param {PositionSelectProps} props - The component props.
 * @param {function} props.onChangeSide - Callback for when a side position is selected.
 * @param {function} props.onChangeCorner - Callback for when a corner position is selected.
 * @param {string} [props.defaultValue='top'] - The default selected position.
 * @param {boolean} [props.areCornersVisible=true] - Flag to control whether corners should be visible.
 * @returns {ReactElement} - The rendered position select component.
*/
const Position: React.FC<PositionSelectProps> = ({ onChangeSide, onChangeCorner, defaultValue = 'top', areCornersVisible = false }: PositionSelectProps): ReactElement => {
    const [currentPosition, setCurrentPosition] = useState(defaultValue);

    const isPositionSide = useCallback((value: Positions): value is Side => {
        return SIDES.includes(value as never);
    }, []);

    const isPositionCorner = useCallback((value: Positions): value is Corner => {
        return CORNERS.includes(value as never);
    }, []);

    const isPositionSelected = useCallback((value: Positions, currentPosition: Positions) => {
        return value === currentPosition;
    }, []);



    /**
     * Handle the change in position.
     * If a side is selected, it updates the side and resets the corner.
     * If a corner is selected, it updates the corner and resets the side.
     * 
     * @param {Positions} value - The position value that was selected.
     */
    const handleChange = useCallback((value: Positions): void => {
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



    const renderDots = useCallback((currentPosition: Positions) => {
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