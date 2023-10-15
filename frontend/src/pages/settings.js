import React from 'react';
import './settings.css';

export default function Settings() {
  const size = 16;

  function decreaseFontSize() {
    const root = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size'));
    const newSize = currentSize - 2; // Adjust the decrement as needed
    root.style.setProperty('--base-font-size', newSize + 'px');
    console.log(newSize);
    localStorage.setItem(newSize,size);
  }

  function defaultFontSize() {
    // eslint-disable-next-line no-undef
    preventDefault();
    const root = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size'));
    const newSize = 16; // Adjust the increment as needed
    root.style.setProperty('--base-font-size', newSize + 'px');
    console.log(newSize);
    localStorage.setItem(newSize,size);
  }

  function increaseFontSize() {
    const root = document.documentElement;
    const currentSize = parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size'));
    const newSize = currentSize + 2; // Adjust the increment as needed
    root.style.setProperty('--base-font-size', newSize + 'px');
    console.log(newSize);
    localStorage.setItem(newSize,size);
  }

  return (
    <div className="settings-div">
      <h1>Settings</h1>
      <div className="settings-content">
        <h2 className="settings-content-header">General</h2>
        <div className="settings-content-info">
          <form>
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
          </form>
        </div>
      </div>
      <br/><br/>
      <div className="settings-content">
        <h2 className="settings-content-header">Accessibility</h2>
        <div className="settings-content-info">
          <form action="">
          <fieldset className="settings-fieldset">
            <label htmlFor="font-size">Font Size </label>
              <button className="font-buttons" onClick={decreaseFontSize}>Decrease Size</button>
              <button className="font-buttons" onClick={defaultFontSize}>Default</button>
              <button className="font-buttons" onClick={increaseFontSize}>Increase Size</button>
            <br/>
            <br/>
            <label htmlFor="contrast">Contrast </label>
              <button className="font-buttons" >Default</button>
              <button className="font-buttons">Invert</button>
              <button className="font-buttons">Dark</button>
              <button className="font-buttons">Light</button>
          </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}