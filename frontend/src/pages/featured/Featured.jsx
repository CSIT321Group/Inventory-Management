import React from 'react'
import "./featured.scss"
import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from '@mui/icons-material'
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";


const Featured =() => {
    // const data =[
    //     {name:'pipe',vlaue:20},
    //     {name:'water cleaner',value:120},
    //     {name:'clorine',value:220},
    //     {name:'water pumps',value:205},

    // ]

    return(
        <div className="featured"> 
            <div className="top">
                <h1 className="title">Total Sales</h1>
                <MoreVert fontSize="small"/>
            </div>
            <div className="bottom">
                <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">$420</p>
                <p className="desc">
                    Previous transactions processing. 
                    Last payments may not be included.
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle"> Target</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDown/>
                            <div className="resultAmount">$12.4</div>
                        </div>
                        
                    </div>
                
                
                    <div className="item">
                        <div className="itemTitle"> Target</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUp/>
                            <div className="resultAmount">$12.4</div>
                        </div>
                        
                    </div>
        
                
                    <div className="item">
                        <div className="itemTitle"> Target</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUp/>
                            <div className="resultAmount">$12.4</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        
        </div>
    )
}
export default Featured