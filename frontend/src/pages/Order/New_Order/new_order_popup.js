import React from 'react';
import './new_order.css';

function Popup(props) {
  	return (props.trigger)? (
    	<div className='popup'>
			<div className='popup-inner'>
				<button style={{backgroundColor:"#FFF", color:"black", fontWeight:"bold"}} className='close-btn' onClick={() => props.setTrigger(false)}>
					X
				</button>
				{props.children}
				<div className='popup-inner-card'>

				</div>
			</div>
    	</div>
 	 ):"";
};

export default Popup