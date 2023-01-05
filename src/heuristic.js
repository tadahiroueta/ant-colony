const distances = require('./data/distances.json');

const startingCity = 40 // Austin, TX

let pheromones, shortestTour, shortestDistance = Infinity

const resetPheromones = () => pheromones = Array(48).fill().map(() => Array(48).fill(1))

const probabilityNumerator = (from, to, exploitation, exploration) => distances[from][to] ** -exploitation * pheromones[from][to] ** exploration;

const probabilityDenominator = (from, adjacents, exploitation, exploration) => {
    let sum = 0
    for (let i = 0; i < adjacents; i++) {
        const to = adjacents[i]
        sum += distances[from][to] ** -exploitation * pheromones[from][to] ** exploration
    }
    return sum
}

const probability = (numerator, denominator) => numerator / denominator

const tourDistance = (tour) => tour.reduce((sum, city, i) => sum + distances[city][tour[(i + 1) % 48]], 0)

const updatePheromones = (tour, distance) => {
    reciprocal = 1 / distance
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

const tour = (exploitation, exploration) => {
    let from = startingCity, tour = [ startingCity ]
    let adjacents = [ ...Array(48).keys() ].splice(startingCity)
    
    while (adjacents.length > 0) {
        const denominator = probabilityDenominator(from, adjacents, exploitation, exploration)
        const probabilities = adjacents.map((to) => probability(probabilityNumerator(from, to, exploitation, exploration), denominator))

        const pick = pick(probabilities)
        from = adjacents[pick]
        tour.push(from)
        adjacents.splice(pick)

        const distance = tourDistance(tour)
        updatePheromones(tour)

        if (distance < shortestDistance) {
            shortestDistance = distance
            shortestTour = tour
        }
    }
    return tour
}
