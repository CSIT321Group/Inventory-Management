import React from 'react';
import './settings.css';

export default function Settings() {


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

  function boldFont() {
    const fontWeight = "bold";
    localStorage.setItem("boldFont",fontWeight);
  }

  function defaultFont() {
    const fontWeight = "";
    localStorage.setItem("boldFont",fontWeight);
  }

  function defaultColour() {
    const backgroundColour = "";
    const fontColour = "";
    localStorage.setItem("backgroundColour",backgroundColour);
    localStorage.setItem("fontColour",fontColour);
  }
  
  function darkColour() {
    const backgroundColour = "rgb(70 68 72)";
    const fontColour = "white";
    localStorage.setItem("backgroundColour",backgroundColour);
    localStorage.setItem("fontColour",fontColour);
  }

  return (
    <div className="settings-div" style={{fontSize: JSON.parse(localStorage.getItem('newSize')), fontWeight: localStorage.getItem('boldFont'), color: localStorage.getItem('fontColour'), backgroundColor: localStorage.getItem('backgroundColour')}}>
      <h1 style={{color: localStorage.getItem('fontColour')}}>Settings</h1>
      <div className="settings-content">
        <h2 className="settings-content-header" style={{color: localStorage.getItem('fontColour')}}>General</h2>
        <div className="settings-content-info">
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
              <label htmlFor="contrast">Contrast </label>&ensp;
                <button className="font-buttons" onClick={defaultColour}>Default</button>&ensp;
                <button className="font-buttons">Invert</button>&ensp;
                <button className="font-buttons" onClick={darkColour}>Dark</button>&ensp;
                <button className="font-buttons">Light</button>&ensp;
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  );
}