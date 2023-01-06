import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

import { performTour, getShortestTour, getShortestDistance, resetGlobals } from './heuristic.js';
import capitals from './data/capitals.json';

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const REACT_BLUE = "#61DBFB", REACT_BACKGROUND = "#282C34"
const TOURS_BEFORE_RENDER = 2048

export default function App() {
  const [shortestTour, setShortestTour] = useState([])
  const [exploitation, setExploitation] = useState(.9), [exploration, setExploration] = useState(1.5)
  const [toursPerformed, setToursPerformed] = useState(0), [shortestDistance, setShortestDistance] = useState(NaN)

  const lines = (tour, stroke, strokeWidth, strokeDasharray) => {
    if (tour.length === 0) return null

    let lines = []
    for (let i = 0; i < capitals.length; i++) {
      const j = tour[i], k = tour[(i + 1) % capitals.length]
      lines.push(<Line key={i} from={[capitals[j].longitude, capitals[j].latitude]} to={[capitals[k].longitude, capitals[k].latitude]} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />)
    }    
    return lines
  }

  const handleReset = () => {
    resetGlobals(exploitation, exploration)
    setShortestTour([])
    setShortestDistance(NaN)
    setToursPerformed(0)
  }

  useEffect(() => { resetGlobals(1, 1) }, [])

  useEffect(() => {
    for (let i = 0; i < TOURS_BEFORE_RENDER; i++) performTour()

    setShortestTour(getShortestTour())
    setShortestDistance(getShortestDistance())
    setToursPerformed(toursPerformed + TOURS_BEFORE_RENDER)
  }, [toursPerformed]);

  return (
    <div className="App">
      
      <header className="App-header">
        <h1 className="Top-title">Travelling Salesperson Problem: </h1>
        <h1 className="Bottom-title">Pheromone Heuristic</h1>
      </header>

      <div className='App-main-body'>
      
        <ComposableMap className='Map' projection="geoAlbersUsa">
          
          <Geographies geography={GEO_URL}>
            {({ geographies }) => geographies.map((geo) => geo.id !== '02' && geo.id !== '15' ? <Geography key={geo.rsmKey} geography={geo} stroke="white" strokeWidth={4} fill='white' /> : null)}
          </Geographies>

          {capitals.map(({ latitude, longitude }) => (
            <Marker key={latitude} coordinates={[longitude, latitude]} fill={REACT_BACKGROUND}>
              <circle r={4} />
            </Marker>
          ))}
          
          {lines(shortestTour, REACT_BLUE, 2)}

        </ComposableMap>
        
        <div className='Side'>
          <div className='Settings'>
            
            <div className='Exploitation'>
              <h3 className='Exploitation-title'>Exploitation</h3>
              <div className='Exploitation-slider'>
                <h3 className='Exploitation-slider-number'>{exploitation}</h3>
                <input type='range' min='0' max='200' value={exploitation * 100} className='Exploitation-slider-input' onChange={(e) => setExploitation(e.target.value / 100)} />
              </div>
            </div>

            <div className='Exploration'>
              <h3 className='Exploration-title'>Exploration</h3>
              <div className='Exploration-slider'>
                <h3 className='Exploration-slider-number'>{exploration}</h3>
                <input type='range' min='0' max='200' value={exploration * 100} className='Exploration-slider-input' onChange={(e) => setExploration(e.target.value / 100)} />
              </div>
            </div>

            <input type='button' value='Reset' className='Reset' onClick={handleReset}/>
            
          </div>

          <h3 className='Description'>
            <span className='Tours-performed'>{toursPerformed.toLocaleString()}</span> tours performed<br />
            <br />
            <span className='Distance'>{shortestDistance.toLocaleString()}</span> km (shortest tour)
          </h3>  

        </div>
      </div>
    </div>
  );
}