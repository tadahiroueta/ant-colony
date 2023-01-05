import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import capitals from './capitals.json';


const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const REACT_BLUE = "#61DBFB"
const REACT_BACKGROUND = "#282C34"

function App() {
  const [exploitation, setExploitation] = useState(0.25)
  const [exploration, setExploration] = useState(0.25)

  const [toursPerformed, setToursPerformed] = useState(0)
  const [shortestDistance, setShortestTour] = useState(0)

  const lines = () => {
    let lines = []
    for (let i = 0; i < capitals.length - 1; i++) lines.push(<Line key={i} from={[capitals[i].longitude, capitals[i].latitude]} to={[capitals[i+1].longitude, capitals[i+1].latitude]} stroke={REACT_BLUE} strokeWidth={2} />)
    lines.push(<Line key={capitals.length - 1} from={[capitals[capitals.length - 1].longitude, capitals[capitals.length - 1].latitude]} to={[capitals[0].longitude, capitals[0].latitude]} stroke={REACT_BLUE} strokeWidth={2} />)
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
          
          <Geographies geography={GEO_URL}>
            {({ geographies }) => geographies.map((geo) => geo.id !== '02' && geo.id !== '15' ? <Geography key={geo.rsmKey} geography={geo} stroke="white" strokeWidth={4} fill='white' /> : null)}
          </Geographies>

          {capitals.map(({ latitude, longitude }) => (
            <Marker key={latitude} coordinates={[longitude, latitude]} fill={REACT_BACKGROUND}>
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
                <h3 className='Exploitation-slider-number'>{exploitation}</h3>
                <input type='range' min='0' max='100' value={exploitation * 100} className='Exploitation-slider-input' onChange={(e) => setExploitation(e.target.value / 100)} />
              </div>
            </div>

            <div className='Exploration'>
              <h3 className='Exploration-title'>Exploration</h3>
              <div className='Exploration-slider'>
                <h3 className='Exploration-slider-number'>{exploration}</h3>
                <input type='range' min='0' max='100' value={exploration * 100} className='Exploration-slider-input' onChange={(e) => setExploration(e.target.value / 100)} />
              </div>
            </div>

            <input type='button' value='Run' className='Run' />
            
          </div>

          <h3 className='Description'>
            <span className='Tours-performed'>{toursPerformed}</span> tours performed<br />
            <br />
            <span className='Distance'>{shortestDistance}</span> km (shortest tour)
          </h3>  

        </div>
      </div>
    </div>
  );
}

export default App;
