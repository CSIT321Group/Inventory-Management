import React from 'react';
import './settings.css';

export default function Settings() {
  //these 3 are used to decrease/increase/reset font size
  function decreaseFontSize() {
    if(JSON.parse(localStorage.getItem('newSize')) === "NaN"){
      localStorage.setItem("newSize",16);
      const currentSize = JSON.parse(localStorage.getItem('newSize'));
      const newSize = currentSize - 2; // Adjust the decrement as needed
      localStorage.setItem("newSize",newSize);
    }
    else {
      const currentSize = JSON.parse(localStorage.getItem('newSize'));
      const newSize = currentSize - 2; // Adjust the decrement as needed
      localStorage.setItem("newSize",newSize);
    }
  }

  function defaultFontSize() {
    // eslint-disable-next-line no-undef
    const newSize = 16; // Adjust the increment as needed
    localStorage.setItem("newSize",newSize);
  }

  function increaseFontSize() {
    const currentSize = JSON.parse(localStorage.getItem('newSize'));
    const newSize = currentSize + 2; // Adjust the increment as needed
    localStorage.setItem("newSize",newSize);
  }

  //these 2 are used to bold and reset the font
  function boldFont() {
    const fontWeight = "bold";
    localStorage.setItem("boldFont",fontWeight);
  }

  function defaultFont() {
    const fontWeight = "";
    localStorage.setItem("boldFont",fontWeight);
  }

  //these are used to change the appearance of each page
  function defaultColour() {
    const backgroundColour = "";
    const fontColour = "";
    localStorage.setItem("backgroundColour",backgroundColour);
    localStorage.setItem("fontColour",fontColour);
  }
  
  function contrastColour() {
    const backgroundColour = "#7a849b";
    const fontColour = "#black";
    localStorage.setItem("backgroundColour",backgroundColour);
    localStorage.setItem("fontColour",fontColour);
  }
  
  function darkColour() {
    const backgroundColour = "rgb(31 31 31)";
    const fontColour = "white";
    localStorage.setItem("backgroundColour",backgroundColour);
    localStorage.setItem("fontColour",fontColour);
  }

  function vibrantColour() {
    const backgroundColour = "#26126a";
    const fontColour = "white";
    localStorage.setItem("backgroundColour",backgroundColour);
    localStorage.setItem("fontColour",fontColour);
  }

  //these are used to enable zoom to help viewing the app
  function zoomDefault() {
    const zoom = "0";
    localStorage.setItem("zoom",zoom);
  }

  function zoomEnabled() {
    const zoom = "1.5";
    localStorage.setItem("zoom",zoom);
  }

  function zoomOut() {
    const zoom = "0.85";
    localStorage.setItem("zoom",zoom);
  }

  return (
    <div className="settings-div" style={{marginTop: "40px", paddingTop: "20px", paddingBottom: "80px",fontSize: JSON.parse(localStorage.getItem('newSize')), zoom: JSON.parse(localStorage.getItem('zoom')), fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour'), backgroundColor: localStorage.getItem('backgroundColour')}}>
      <h1 style={{color: localStorage.getItem('fontColour'), padding: "10px"}}>Settings</h1>
      <div className="settings-content">
        <h2 className="settings-content-header" style={{color: localStorage.getItem('fontColour')}}>General</h2>
        <div className="settings-content-info">
          {/*These don't work as we didn't really think they we're needed but needed the page to look nicer */}
          <fieldset className="settings-fieldset">
            <label htmlFor="Lang">Preferred Language </label>
            <select name="Lang" id="">
              <option value="ENG-UK">English-UK</option>
              <option value="ENG-US">English-US</option>
              <option value="SPANISH">Spanish</option>
              <option value="FRENCH">French</option>
              <option value="GERMAN">German</option>
            </select>
            <br/>
            <br/>
            <label htmlFor="Region">Region </label>
            <select name="Region" id="Region">
              <option value="NSW">NSW</option>
              <option value="QLD">QLD</option>
              <option value="VIC">VIC</option>
              <option value="SA">SA</option>
              <option value="WA">WA</option>
              <option value="NT">NT</option>
              <option value="ACT">ACT</option>
            </select>
            <br/>
            <br/>
            <label htmlFor="time-format">Time Format </label>
            <select name="time-format" id="time-format">
              <option value="24hr">24-hr</option>
              <option value="12hr">12-hr</option>
            </select>
          </fieldset>
        </div>
      </div>
      <br/><br/>
      {/*these buttons are used to change the accessibility features*/}
      <div className="settings-content">
        <h2 className="settings-content-header" style={{color: localStorage.getItem('fontColour')}}>Accessibility</h2>
        <div className="settings-content-info">
          <fieldset className="settings-fieldset">
            <form>
            <label htmlFor="font-size">Font Size </label>&ensp;
              <button className="font-buttons" onClick={decreaseFontSize}>Decrease Size </button>&ensp;
              <button className="font-buttons" onClick={defaultFontSize}>Default Size </button>&ensp;
              <button className="font-buttons" onClick={increaseFontSize}>Increase Size </button>&ensp;
            </form>
            <br/>
            <form>
              <label htmlFor="font-size">Bold Font </label>&ensp;
                <button className="font-buttons" onClick={boldFont}>Yes </button>&ensp;
                <button className="font-buttons" onClick={defaultFont}>No </button>&ensp;
            </form>
            <br/>
            <form>
              <label htmlFor="font-size">Zoom </label>&ensp;
                <button className="font-buttons" onClick={zoomDefault}>Default Zoom</button>&ensp;
                <button className="font-buttons" onClick={zoomEnabled}>Zoomed In </button>&ensp;
                <button className="font-buttons" onClick={zoomOut}>Zoomed Out </button>&ensp;
            </form>
            <br/>
            <form>
              <label htmlFor="contrast">Colour Display </label>&ensp;
                <button className="font-buttons" onClick={defaultColour}>Default</button>&ensp;
                <button className="font-buttons" onClick={contrastColour}>Contrast</button>&ensp;
                <button className="font-buttons" onClick={darkColour}>Dark</button>&ensp;
                <button className="font-buttons" onClick={vibrantColour}>Vibrant</button>&ensp;
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
}