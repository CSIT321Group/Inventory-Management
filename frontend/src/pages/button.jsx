import React from "react";

const FilterButton = ({onPress}) => {
    return (
        <button className="filter-button" onClick={onPress}>
            Apply filter
        </button>
    );
};

export default FilterButton;