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
        <div className="helpPageLayout" style={{marginTop: "40px", paddingTop: "20px", paddingBottom: "80px", fontWeight: localStorage.getItem('boldFont'), zoom: JSON.parse(localStorage.getItem('zoom')), fontSize: JSON.parse(localStorage.getItem('newSize')), backgroundColor: localStorage.getItem('backgroundColour')}}>
            <h1 style={{color: localStorage.getItem('fontColour')}}>Having trouble??? This page might help you!</h1>
            <div className="helpContent">
                {/*This section has some FAQ answers for some basic enquiries*/}
                <h2 className="contentHeaders" style={{color: localStorage.getItem('fontColour')}}>Frequently Asked Questions (FAQs)</h2>
                <div className="content-info">
                    <div className="app">
                      <div className="accordian">
                        <div className="accordian-header" onClick={handleOpen} style={{backgroundColor: localStorage.getItem('backgroundColour')}}>
                            <div>General Use Issues</div>
                            <div className="sign">{show ? '-' : '+'}</div>
                        </div>
                        {show && (
                            <div className="accordian-body">
                                <h4 style={{color: localStorage.getItem('fontColour')}}>How can I change my password?</h4>
                                    <p>
                                    To change your password, you will need to reach out to your system admin who 
                                    has the ability to reset it for you or provide you with a way to reset your password. 
                                    </p>
                                <h4 style={{color: localStorage.getItem('fontColour')}}>How can I change my privileges? </h4>
                                    <p>
                                    In order to change your system privileges, you will need to get in contact with your system admin
                                    as they will be the only user with this power. 
                                    </p>
                                <h4 style={{color: localStorage.getItem('fontColour')}}>How do I change the font size so it's easier to see?:</h4>
                                    <p>
                                    If you'd like to increase/decrease the font size, go to the settings page and choose what size
                                    you'd like. There are an array of appearance options available.
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
                                <h4 style={{color: localStorage.getItem('fontColour')}}>Why can't I see the quantity for an item increase after my order:</h4>
                                    <p>
                                    A stock's quantity will update once an order has been finalised and passed from the "PENDING" stage.
                                    This is to ensure that stock counts are accurate. 
                                    </p>
                                <h4 style={{color: localStorage.getItem('fontColour')}}>What are the filters for?</h4>
                                    <p>
                                    These filters help you search for the certain inventory item you're after.
                                    Simply put in a value for whatever field, and it'll narrow down your search.
                                    </p>
                                <h4 style={{color: localStorage.getItem('fontColour')}}>We have inventory we no longer use, what can we do about that?</h4>
                                    <p>
                                    If there is inventory that is no longer in use, your system admin can remove it from 
                                    the database and any left over stock can be sold back to the supplier. 
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
                                <h4 style={{color: localStorage.getItem('fontColour')}}>How to create an order:</h4>
                                    <p>
                                    To create an order, go to the order page. On the order page, there is a button called "new order".
                                    Click on this button and it will open a new order popup page for you to fill out and submit.
                                    </p>
                                <h4 style={{color: localStorage.getItem('fontColour')}}>Can I order more items?</h4>
                                    <p>Yes, you can order more than 3 items in one order. However, this can't be done online. You will need to contact your supplier.</p>
                                <h4 style={{color: localStorage.getItem('fontColour')}}>How do I cancel an order?</h4>
                                    <p>To cancel an order, you will need to get in contact with the supplier directly. This is in place to ensure that both parties can discuss and communicate about why this order is being
                                        cancelled as well as work out the refund so both parties are receiving fair treatment.
                                    </p>
                            </div>
                        )}
                      </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="helpContent">
                {/*This has some documentation that can be downloaded, these just need to be uploaded so it can be downloaded*/}
                <h2 className="contentHeaders" style={{color: localStorage.getItem('fontColour')}}>Helpful Documentation</h2>
                <div className="content-info">
                    <a style={{color: localStorage.getItem('fontColour')}} href="./Help_Documentation/Operation_Manual.docx" download>Operation Manual</a>&emsp;&emsp;
                    <a style={{color: localStorage.getItem('fontColour')}} href="./Help_Documentation/Operation_Manual.docx" download>Help Documentation</a>&emsp;&emsp;
                </div>
            </div>
            <br/><br/>
            <div className="helpContent">                
                <h2 className="contentHeaders" style={{color: localStorage.getItem('fontColour')}}>Contact Us</h2>
                {/*This is a contact us page that has information on how to contact us and a form to submit a help request*/}
                <div className="content-info">
                    <p>If you still haven't been able to find something to help you, 
                    please contact us using the following platforms or fill in the help form below.</p>
                    <p>Email: <a style={{color: localStorage.getItem('fontColour')}} href="mailto:email@sample.com? subject=help ticket"> email@sample.com </a></p>
                    <p>Phone: <a style={{color: localStorage.getItem('fontColour')}} href="tel:1300 003 324">1300 003 324</a><br/><span><i>&emsp;Our support team is available Monday to Friday, 9:00 AM to 6:00 PM (AEST).</i></span></p>
                    <h4 style={{color: localStorage.getItem('fontColour')}}>Got a question or need help, submit a help form below and our team will get back to you ASAP</h4>
                    {/*HELP FORM DOESN'T SUBMIT AN EMAIL YET*/}
                    <form action="" method="" enctype="text/plain">
                    <h4 style={{color: localStorage.getItem('fontColour')}}>Help Form</h4>
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
