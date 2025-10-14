"use client";
import React, { ReactElement, useState, memo } from "react";

// Types
import type { PositionSelectProps, Positions, Side, Corner } from "./types";

// Styles
import CSS from "./styles.module.scss";

// Available position options
const POSITIONS: Positions[] = [
    "top-left",
    "top",
    "top-right",

    "left",
    "all",
    "right",

    "bottom-left",
    "bottom",
    "bottom-right",
]

// Available side positions for selection
const SIDES: Side[] = [
    "top",
    "right",
    "bottom",
    "left",
]

// Available corner positions for selection
const CORNERS: Corner[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
]

// Utility to check if a position value is a side
const isPositionSide = (value: Positions): value is Side => {
    return SIDES.includes(value as Side);
};

// Utility to check if a position value is a corner
const isPositionCorner = (value: Positions): value is Corner => {
    return CORNERS.includes(value as Corner);
};

// Utility to check if a position value is the center "all" position
const isPositionAll = (value: Positions): value is "all" => {
    return value === "all";
};

// Utility to check if a position value matches the current selected position
const isPositionSelected = (value: Positions, currentPosition: Positions) => {
    return value === currentPosition;
};

/**
 * Position Component
 *
 * An interactive position selector component that displays a 3x3 grid of position options (sides, corners, center).
 * Allows users to select positioning values with separate callbacks for side and corner selections.
 * Supports configurable selectability for corners and center positions.
 *
 * @param  props - Component properties
 * @param  props.onChangeSide - Callback triggered when a side position (top/right/bottom/left) is selected
 * @param  props.onChangeCorner - Callback triggered when a corner position is selected
 * @param  props.defaultValue="top" - Initial selected position value
 * @param  props.isCornerSelectable=false - Enables selection of corner positions
 * @param  props.isCenterSelectable=false - Enables selection of center "all" position
 * @returns Rendered position selector grid with current selection display
 *
 * @note Callbacks receive null when switching between side/corner selections to clear the other type
 */
const Position: React.FC<PositionSelectProps> = ({
    onChangeSide,
    onChangeCorner,
    defaultValue = "top",
    isCornerSelectable = false,
    isCenterSelectable = false,
}): ReactElement => {
    const [currentPosition, setCurrentPosition] = useState(defaultValue);

    // Handle position changes
    const handleChange = (value: Positions): void => {

        if (isPositionSide(value)) {
            onChangeSide(value); // Update the side if it"s a side position
            onChangeCorner(null); // Reset the corner
        }
        else if (isPositionCorner(value)) {
            onChangeSide(null); // Reset the side
            onChangeCorner(value); // Update the corner if it"s a corner position
        }
        else if (isPositionAll(value)) {
            if (!isCenterSelectable) return;
            onChangeSide(null); // Reset the side
            onChangeCorner(null); // Reset the corner
        }

        setCurrentPosition(value); // Update the current selected position
    };

    // Render position dots based on current selection
    const renderDots = (currentPosition: Positions) => {
        return POSITIONS.map((value) => (
            <i
                key={value}
                className={CSS.Position}
                onClick={() => handleChange(value)}
                data-is-selected={isPositionSelected(value, currentPosition)}
                data-value={value}
            />
        ))
    };

    return (
        <div className={`${CSS.PositionSelect} PositionSelect`}>
            <div
                className={`${CSS.Positions} Positions`}
                data-corners={isCornerSelectable}
                data-center={isCenterSelectable}
            >
                {renderDots(currentPosition)}
            </div>

            <div className={`${CSS.Current} Current`}>
                {currentPosition}
            </div>

        </div>
    );
};

Position.displayName = "Position";
export default memo(Position);