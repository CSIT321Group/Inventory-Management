import React, { useState} from 'react';
import "./featured.scss";
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
    const [randomValue, setRandomValue] = useState(Math.floor(Math.random()*(100 - 50 +1)+50 )); // Generate a random number between 0 and 100
    const randomValue2=randomValue+2083;
    const [targetValue, setTargetValue] = useState((Math.random() * (1000 - 500) + 500).toFixed(1)); // Generate a random number between 500 and 1000
    const [achievementValue, setAchievementValue] = useState((Math.random() * (1000 - 500) + 500).toFixed(1)); // Generate a random number between 500 and 1000

    return (
        <div className="featured" style={{ color: "", backgroundColor: "" }}>
            <div className="top">
                <h1 className="title">Total Sales</h1>
                
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={randomValue} text={`${randomValue}%`} strokeWidth={5} options={{ maintainAspectRatio: false }} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">${randomValue2}</p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle"> Target</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDown />
                            <div className="resultAmount">${targetValue}</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle"> Achivement</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUp />
                            <div className="resultAmount">${achievementValue}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;
