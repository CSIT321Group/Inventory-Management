import React from "react";

const FilterButton = ({onPress}) => {
    return (
        <button className="filter-button" onClick={onPress}>
            apply filter
        </button>
    );
};

export default FilterButton;