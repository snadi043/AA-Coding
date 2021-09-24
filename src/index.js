import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import './myscss.scss';
import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

library.add(faCloud);

class App extends Component {
  constructor() {
    super();
    this.state = {
      weather: { humidity: 0, temp_max: 0, temp_min: 0 },
      temp: {},
      clouds: { description: '' },
      date: new Date(),
    };
  }

  getWeather = (query) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/find?q=${query}&units=imperial&appid=f92c1f4990b0574d4a4e4d3dd556f388`
      )
      .then((response) => {
        debugger;
        this.setState({
          weather: response.data.list[0].main,
          temp: response.data.list[0].coord,
          clouds: response.data.list[0].weather[0],
        });
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  queryWeather = (event) => {
    debugger;
    this.getWeather(event.target.innerText);
  };
  render() {
    return (
      <div>
        <div class="display-city">
          <label class="spaceX" onClick={this.queryWeather}>
            OTTAWA
          </label>
          <label class="spaceX" onClick={this.queryWeather}>
            LONDON
          </label>
          <label class="spaceX" onClick={this.queryWeather}>
            TOKYO
          </label>
        </div>
        <div>
          <div class="main-Container">
            <div>
              <div class="main-Header">
                <div class="div-block">
                  <pre class="font-mystyle">Today </pre>
                  <pre class="font-mystyle">
                    {' '}
                    {this.state.date.getDate()}/{''}
                    {this.state.date.getMonth() + 1}/{''}
                    {this.state.date.getFullYear()}
                  </pre>

                  <FontAwesomeIcon icon="cloud" />
                  <div
                    class="div-block1"
                    style={{
                      display: 'flex',

                      marginLeft: '15%',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        paddingLeft: '10px',
                        display: 'inline',
                      }}
                    >
                      Latitude :
                    </span>
                  
                    <span
                      style={{
                        paddingLeft: '10px',
                        display: 'inline',
                      }}
                    >
                      {this.state.temp.lat}
                    </span>
                    
                    <span
                      style={{
                        paddingLeft: '10px',
                        display: 'inline',
                      }}
                    >
                      Longitude :
                    </span>

                    <span
                    style={{
                      paddingLeft: '10px',
                      display: 'inline',
                    }}>
                    {this.state.temp.lon}
                    </span>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="column">
                  <h2>Weather</h2>
                  <p>{this.state.clouds.description}</p>
                  <FontAwesomeIcon icon="cloud" />
                </div>
                <div class="column">
                  <h2>Humidity</h2>
                  <p>{this.state.weather.humidity}</p>
                  <FontAwesomeIcon icon="cloud" />
                </div>
                <div class="column">
                  <h2>Max Temp </h2>
                  <p>{this.state.weather.temp_max}</p>
                  <FontAwesomeIcon icon="cloud" />
                </div>
                <div class="column noborder">
                  <h2>Min Temp </h2>
                  <p>{this.state.weather.temp_min}</p>
                  <FontAwesomeIcon icon="cloud" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
