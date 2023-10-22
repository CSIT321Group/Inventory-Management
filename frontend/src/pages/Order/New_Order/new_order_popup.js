import React from 'react';
import './new_order.css';

function Popup(props) {
  	return (props.trigger)? (
    	<div className='popup' style={{fontSize: JSON.parse(localStorage.getItem('newSize')), fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour'), backgroundColor: localStorage.getItem('backgroundColour')}}>
			<div className='popup-inner' style={{fontSize: JSON.parse(localStorage.getItem('newSize')), fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour'), backgroundColor: localStorage.getItem('backgroundColour')}}>
				<button style={{backgroundColor:"#FFF", color:"black", fontWeight:"bold"}} className='close-btn' onClick={() => props.setTrigger(false)}>
					X
				</button>
				{props.children}
			</div>
    	</div>
 	 ):"";
};

export default Popup
