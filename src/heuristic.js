const distances = require('./data/distances.json');

const startingCity = 40 // Austin, TX

let pheromones, shortestTour, shortestDistance, exploitation, exploration

const resetGlobals = (exploi, explor) => {
    pheromones = Array(48).fill().map(() => Array(48).fill(1))
    shortestDistance = Infinity
    exploitation = exploi
    exploration = explor
}

const probabilityNumerator = (from, to) => distances[from][to] ** -exploitation * pheromones[from][to] ** exploration

const probabilityDenominator = (from, adjacents) => {
    let sum = 0
    for (let i = 0; i < adjacents.length; i++) {
        const to = adjacents[i]
        sum += distances[from][to] ** -exploitation * pheromones[from][to] ** exploration
    }
    return sum
}

const probability = (numerator, denominator) => numerator / denominator

const tourDistance = (tour) => tour.reduce((sum, city, i) => sum + distances[city][tour[(i + 1) % 48]], 0)

const updatePheromones = (tour, distance) => {
    const reciprocal = 1 / distance
    tour.forEach((city, i) => {
        pheromones[city][tour[(i + 1) % 48]] += reciprocal
        pheromones[tour[(i + 1) % 48]][city] += reciprocal
})}

const pick = (probabilities) => {
    let commulative = Math.random()
    for (let i = 0; i < probabilities.length; i++) {
        commulative -= probabilities[i]
        if (commulative <= 0) return i
    }
}

const performTour = () => {
    let from = startingCity, tour = [ startingCity ]
    let adjacents = [ ...Array(48).keys() ]
    adjacents.splice(startingCity, 1)
    
    while (adjacents.length > 0) {
        const denominator = probabilityDenominator(from, adjacents)
        const probabilities = adjacents.map((to) => probability(probabilityNumerator(from, to), denominator))

        const picked = pick(probabilities)
        from = adjacents[picked]
        tour.push(from)
        adjacents.splice(picked, 1)
    }
    const distance = tourDistance(tour)
    updatePheromones(tour, distance)

    if (distance < shortestDistance) {
        shortestDistance = distance
        shortestTour = tour
}}

const getShortestTour = () => shortestTour
const getShortestDistance = () => shortestDistance

module.exports = { performTour, getShortestTour, getShortestDistance, resetGlobals }
