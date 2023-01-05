import React from 'react';
import { Counter } from './features/counter/Counter';
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import capitals from './capitals.json';
// import { geoCentroid } from 'd3-geo';

function App() {
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  const reactBlue = "#61DBFB"
  const reactBackground = "#282C34"

  const lines = () => {
    let lines = []
    for (let i = 0; i < capitals.length - 1; i++) lines.push(<Line key={i} from={[capitals[i].longitude, capitals[i].latitude]} to={[capitals[i+1].longitude, capitals[i+1].latitude]} stroke={reactBlue} strokeWidth={2} />)
    lines.push(<Line key={capitals.length - 1} from={[capitals[capitals.length - 1].longitude, capitals[capitals.length - 1].latitude]} to={[capitals[0].longitude, capitals[0].latitude]} stroke={reactBlue} strokeWidth={2} />)
    return lines
  }

  return (
    <div className="App">
      
      <header className="App-header">
        <h1 className="Top-title">Travelling Salesperson Problem: </h1>
        <h1 className="Bottom-title">Pheromone Heuristic</h1>
      </header>

      <div className='App-main-body'>
      
        {/* <img src={process.env.PUBLIC_URL + '/map-placeholder.png'} alt='Map' className='Map' /> */}
        <ComposableMap className='Map' projection="geoAlbersUsa">
          
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => geo.id != '02' && geo.id != '15' ? <Geography key={geo.rsmKey} geography={geo} stroke="white" strokeWidth={4} fill='white' /> : null)}
          </Geographies>

          {capitals.map(({ latitude, longitude }) => (
            <Marker key={latitude} coordinates={[longitude, latitude]} fill={reactBackground}>
              <circle r={4} />
            </Marker>
          ))}
          
          {lines()}

        </ComposableMap>
        
        <div className='Side'>
          <div className='Settings'>
            
            <div className='Exploitation'>
              <h3 className='Exploitation-title'>Exploitation</h3>
              <div className='Exploitation-slider'>
                <h3 className='Exploitation-slider-number'>.25</h3>
                <input type='range' min='0' max='100' value='25' className='Exploitation-slider-input' />
              </div>
            </div>

            <div className='Exploration'>
              <h3 className='Exploration-title'>Exploration</h3>
              <div className='Exploration-slider'>
                <h3 className='Exploration-slider-number'>.25</h3>
                <input type='range' min='0' max='100' value='25' className='Exploration-slider-input' />
              </div>
            </div>

            <input type='button' value='Run' className='Run' />
            
          </div>

          <h3 className='Description'>
            <span className='Tours-performed'>87</span> tours performed<br />
            <br />
            <span className='Distance'>18759</span> km (shortest tour)
          </h3>  

        </div>
      </div>
    </div>
  );
}

export default App;
