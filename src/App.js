import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

import { resetGlobals, performTour, getShortestTour, getShortestDistance } from './heuristic.js';
import capitals from './data/capitals.json';

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const REACT_BLUE = "#61DBFB", REACT_BACKGROUND = "#282C34"
const TOURS_BEFORE_RENDER = 2048

export default function App() {
  const [shortestTour, setShortestTour] = useState([])
  const [exploitation, setExploitation] = useState(1), [exploration, setExploration] = useState(2)
  const [capitalInput, setCapitalInput] = useState(20), [numberOfCapitals, setNumberOfCapitals] = useState(20)
  const [toursPerformed, setToursPerformed] = useState(0), [shortestDistance, setShortestDistance] = useState(NaN)

  const description = () => (
    <h3 className='Description'>
      <span className='Tours-performed'>{toursPerformed.toLocaleString()}</span> tours performed<br />
      <br />
      <span className='Distance'>{shortestDistance.toLocaleString()}</span> km (shortest tour)
    </h3>  
  )

  const lines = (tour, stroke, strokeWidth, strokeDasharray) => {
    if (tour.length === 0) return null

    let lines = []
    for (let i = 0; i < numberOfCapitals; i++) {
      const j = tour[i], k = tour[(i + 1) % numberOfCapitals]
      lines.push(<Line key={i} from={[capitals[j].longitude, capitals[j].latitude]} to={[capitals[k].longitude, capitals[k].latitude]} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />)
    }    
    return lines
  }

  const handleReset = () => {
    setNumberOfCapitals(capitalInput)
    resetGlobals(exploitation, exploration, capitalInput)
    setShortestTour([])
    setShortestDistance(NaN)
    setToursPerformed(0)
  }

  useEffect(() => { resetGlobals(exploitation, exploration, capitalInput) }, [])

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

          {capitals.slice(0, numberOfCapitals).map(({ latitude, longitude }) => (
            <Marker key={latitude} coordinates={[longitude, latitude]} fill={REACT_BACKGROUND}>
              <circle r={4} />
            </Marker>
          ))}
          
          {lines(shortestTour, REACT_BLUE, 2)}

        </ComposableMap>
        
        <div className='Side'>

          {isMobile ? description() : null}

          <div className='Settings'>
            
            <div className='Setting'>
              <h3 className='Setting-title'>Exploitation</h3>
              <div className='Setting-slider'>
                <h3 className='Setting-slider-number'>{exploitation}</h3>
                <input type='range' min='0' max='200' value={exploitation * 100} className='Setting-slider-input' onChange={(e) => setExploitation(e.target.value / 100)} />
              </div>
            </div>

            <div className='Setting'>
              <h3 className='Setting-title'>Exploration</h3>
              <div className='Setting-slider'>
                <h3 className='Setting-slider-number'>{exploration}</h3>
                <input type='range' min='0' max='200' value={exploration * 100} className='Setting-slider-input' onChange={(e) => setExploration(e.target.value / 100)} />
              </div>
            </div>

            <div className='Setting'>
              <h3 className='Setting-title'>Capitals</h3>
              <div className='Setting-slider'>
                <h3 className='Setting-slider-number'>{capitalInput}</h3>
                <input type='range' min='1' max='48' value={capitalInput} className='Setting-slider-input' onChange={(e) => setCapitalInput(e.target.value)} />
              </div>
            </div>

            <input type='button' value='Reset' className='Reset' onClick={handleReset}/>
            
          </div>

          {isMobile ? null : description()}

        </div>
      </div>

      <footer>
        <h4 className='Contact-info'>By Tadahiro Ueta&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;tadahiroueta@gmail.com</h4>
      </footer>
    </div>
  );
}