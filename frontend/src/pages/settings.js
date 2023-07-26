import React from 'react';
import './settings.css';

export default function Settings() {
  return (
    <div className="settings-div">
        <h2>General</h2>
          <form>
          <fieldset>
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
        <h2>Accessibility</h2>
          <form action="">
          <fieldset>
            <label htmlFor="font-size">Font Size </label>
              <button className="font-buttons">Default</button>
              <button className="font-buttons">Large</button>
              <button className="font-buttons">X-Large</button>
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
  );
}