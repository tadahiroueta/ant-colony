const capitals = require('./data/capitals.json')
const { getDistanceBetweenTwoPoints } = require('calculate-distance-between-coordinates')

const distances = []

for (let i = 0; i < capitals.length; i++) {
  distances.push([])
  for (let j = 0; j < capitals.length; j++) {
    distances[i].push(Math.round(getDistanceBetweenTwoPoints({ "lon": capitals[i].longitude, "lat": capitals[i].latitude }, { "lon": capitals[j].longitude, "lat": capitals[j].latitude })))
  }
}

const fs = require('fs');

fs.writeFileSync('./data/distances.json', JSON.stringify(distances))