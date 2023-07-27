import React from 'react';
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
        <div className="helpPageLayout">
            <h1>Having trouble??? This page might help you!</h1>
            <div className="content">
                <h2>Frequently Asked Questions (FAQs)</h2>
                <div className="content-info">
                    <div className="app">
                      <div className="accordian">
                        <div className="accordian-header" onClick={handleOpen}>
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
                        <div className="accordian-header" onClick={handleOpen2}>
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
                        <div className="accordian-header" onClick={handleOpen3}>
                            <div>Order Issues</div>
                            <div className="sign">{show3 ? '-' : '+'}</div>
                        </div>
                        {show3 && (
                            <div className="accordian-body">
                                <h4>How to create an order:</h4>
                                    <p>
                                    Lorem Ipsum is simply dummy text of the printing and type setting
                                    industry. Lorem Ipsum has been the industry's ever since the 1500s,
                                    when an unknown printer took a galley of type standard dummy text
                                    and scrambled it to make a type specimen book.
                                    </p>
                                <h4>How to delete an order:</h4>
                                    <p>Blah blah blah</p>
                                <h4>Another order related issue</h4>
                                    <p>dsdsf dsfdsgfd sgfsgf sgfdagf</p>
                            </div>
                        )}
                      </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className="content">
                <h2>Helpful Documentation</h2>
                <div className="content-info">
                    <a href="./Help_Documentation/Operation_Manual.docx" download>Operation Manual</a>&emsp;&emsp;
                    <a href="./Help_Documentation/Operation_Manual.docx" download>Help Documentation</a>&emsp;&emsp;
                    <a href="./Help_Documentation/Operation_Manual.docx" download>Help Documentation</a>
                </div>
            </div>
            <br/><br/>
            <div className="content">                
                <h2>Contact Us</h2>
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
                        <input type="text" id="name"/>
                        <br/>
                        <label htmlFor="email">Contact Email: </label>
                        <input type="email" id="email"/>
                        <br/>
                        <label htmlFor="phone">Contact Phone Number: </label>
                        <input type="tel" id="phone"/>
                        <br/><br/>
                        <label htmlFor="help">How can we help?</label>
                        <br/>
                        <textarea id="help" rows="8" cols="35"/>
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
