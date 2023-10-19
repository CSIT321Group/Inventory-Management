import React, { useState } from 'react';
import './pageLayout.css';
import './help.css';

 
export default function Help(){
    // State to show/hide accordion
    const [show, setShow] = useState(false);
    const handleOpen = () => {
        setShow(!show); // Toggle accordion
    };
    const [show2, setShow2] = useState(false);
    const handleOpen2 = () => {
        setShow2(!show2); // Toggle accordion
    };
    const [show3, setShow3] = useState(false);
    const handleOpen3 = () => {
        setShow3(!show3); // Toggle accordion
    };
    return (
        <div className="helpPageLayout" style={{fontSize: JSON.parse(localStorage.getItem('newSize'))}}>
            <h1>Having trouble??? This page might help you!</h1>
            <div className="helpContent">
                <h2 className="contentHeaders">Frequently Asked Questions (FAQs)</h2>
                <div className="content-info">
                    <div className="app">
                      <div className="accordian">
                        <div className="accordian-header" onClick={handleOpen} style={{backgroundColor: localStorage.getItem('backgroundColour')}}>
                            <div>General Use Issues</div>
                            <div className="sign">{show ? '-' : '+'}</div>
                        </div>
                        {show && (
                            <div className="accordian-body">
                                <h4>How to create an order:</h4>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and type setting
                                    industry. Lorem Ipsum has been the industry's ever since the 1500s,
                                    when an unknown printer took a galley of type standard dummy text
                                    and scrambled it to make a type specimen book.
                                    </p>
                                <h4>How to create an order:</h4>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and type setting
                                    industry. Lorem Ipsum has been the industry's ever since the 1500s,
                                    when an unknown printer took a galley of type standard dummy text
                                    and scrambled it to make a type specimen book.
                                    </p>
                                <h4>How to create an order:</h4>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and type setting
                                    industry. Lorem Ipsum has been the industry's ever since the 1500s,
                                    when an unknown printer took a galley of type standard dummy text
                                    and scrambled it to make a type specimen book.
                                    </p>
                            </div>
                        )}
                        <br/>
                        <div className="accordian-header" onClick={handleOpen2} style={{backgroundColor: localStorage.getItem('backgroundColour')}}>
                            <div>Inventory Issues</div>
                            <div className="sign">{show2 ? '-' : '+'}</div>
                        </div>
                        {show2 && (
                            <div className="accordian-body">
                                <h4>How to create an order:</h4>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and type setting
                                    industry. Lorem Ipsum has been the industry's ever since the 1500s,
                                    when an unknown printer took a galley of type standard dummy text
                                    and scrambled it to make a type specimen book.
                                    </p>
                                <h4>How to create an order:</h4>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and type setting
                                    industry. Lorem Ipsum has been the industry's ever since the 1500s,
                                    when an unknown printer took a galley of type standard dummy text
                                    and scrambled it to make a type specimen book.
                                    </p>
                                <h4>How to create an order:</h4>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and type setting
                                    industry. Lorem Ipsum has been the industry's ever since the 1500s,
                                    when an unknown printer took a galley of type standard dummy text
                                    and scrambled it to make a type specimen book.
                                    </p>
                            </div>
                        )}
                        <br/>
                        <div className="accordian-header" onClick={handleOpen3} style={{backgroundColor: localStorage.getItem('backgroundColour')}}>
                            <div>Order Issues</div>
                            <div className="sign">{show3 ? '-' : '+'}</div>
                        </div>
                        {show3 && (
                            <div className="accordian-body">
                                <h4>How to create an order:</h4>
                                    <p>
                                    To create an order, go to the order page. On the order page, there is a button called "new order".
                                    Click on this button and it will open a new order popup page for you to fill out and submit.
                                    </p>
                                <h4>Can I order more items?</h4>
                                    <p>Yes, you can order more than 3 items in one order. However, this can't be done online. You will need to contact your supplier.</p>
                                <h4>How do I cancel an order?</h4>
                                    <p>To cancel an order, you will need to get in contact with the supplier directly. This is in place to ensure that both parties can discuss and communicate about why this order is being
                                        cancelled as well as work out the refund so both parties are receivng fair treatment.
                                    </p>
                            </div>
                        )}
                      </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="helpContent">
                <h2 className="contentHeaders">Helpful Documentation</h2>
                <div className="content-info">
                    <a href="./Help_Documentation/Operation_Manual.docx" download>Operation Manual</a>&emsp;&emsp;
                    <a href="./Help_Documentation/Operation_Manual.docx" download>Help Documentation</a>&emsp;&emsp;
                    <a href="./Help_Documentation/Operation_Manual.docx" download>Help Documentation</a>
                </div>
            </div>
            <br/><br/>
            <div className="helpContent">                
                <h2 className="contentHeaders">Contact Us</h2>
                <div className="content-info">
                    <p>If you still haven't been able to find something to help you, 
                    please contact us using the following platforms or fill in the help form below.</p>
                    <p>Email: <a href="mailto:email@sample.com? subject=help ticket"> email@sample.com </a></p>
                    <p>Phone: <a href="tel:1300 003 324">1300 003 324</a><br/><span><i>&emsp;Our support team is available Monday to Friday, 9:00 AM to 6:00 PM (AEST).</i></span></p>
                    <h4>Got a question or need help, submit a help form below and our team will get back to you ASAP</h4>
                    <form action="" method="" enctype="text/plain">
                    <h4>Help Form</h4>
                    <fieldset>
                    <br/>
                        <label htmlFor="name">Name: </label>
                        <input style={{transform: "initial"}} className="helpInputs" type="text" id="name"/>
                        <br/><br/>
                        <label htmlFor="email">Contact Email: </label>
                        <input style={{transform: "initial"}} className="helpInputs" type="email" id="email"/>
                        <br/><br/>
                        <label htmlFor="phone">Contact Phone Number: </label>
                        <input style={{transform: "initial"}} className="helpInputs" type="tel" id="phone"/>
                        <br/><br/>
                        <label htmlFor="help">How can we help?</label>
                        <br/>
                        <textarea style={{transform: "initial"}} className="helpInputs" id="help" rows="8" cols="35"/>
                        <br/><br/>
                        <input className="formButtons" type="submit"/>  
                        <span></span>
                        <input className="formButtons" type="reset"/>
                    </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};
