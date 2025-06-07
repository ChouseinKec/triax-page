import React from 'react';

/**
 * Renders a simple keyword value as plain text.
 */
export interface KeywordValueProps {
    value: string;
}

const KeywordValue: React.FC<KeywordValueProps> = ({ value }) => {
    return <p>{value}</p>;
};

export default KeywordValue;
