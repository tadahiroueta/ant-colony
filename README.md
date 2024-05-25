# Ant Colony
***My ant-colony heuristic solution for the Travelling Salesman Problem***

[Visit Website](https://antcolony.tadahiroueta.com) · [Built With](#built-with) · [Features](#features) · [Usage](#usage)

## Built With
<!-- Find more shield at https://github.com/Ileriayo/markdown-badges?tab=readme-ov-file -->
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## Features
![website](https://github.com/tadahiroueta/ant-colony/blob/master/samples/20-capitals-iteration.gif)
- Sub-optimal algorithm inspired by the hive mind of ant colonies
  - The algorithm simulates the route of ants walking randomly with two biasses:
    1. Exploitation - a tendency to go to nearby cities
    2. Exploration - following "pheromone trails" left by older ants
        > When ants find a short path, they leave stronger pheromones to encourage others to follow a similar path.
    
    $$P(u,v) = \frac{ D(u,v) ^{ -\alpha } \cdot R(u,v) ^\beta }{\displaystyle\sum_{ j \in adj(u) } D(u,j) ^{ -\alpha } \cdot R(u,j) ^\beta }$$
    > Probability of going from point $u$ to point $v$
    > - $\alpha$ being the coefficient of "exploitation"
    > - $\beta$ being the coefficient of "exploration"
    > - $D(u,v)$ being the distance between point $u$ and $v$ (calculated with straight coordinates)
    > - $R(u,v)$ being the pheromone trail left between point $u$ and $v$
    > - $adj(u)$ being any point that is not $u$
- User inputs for bias coefficients
  - React hooks save user preferences
  
  ![inputs](https://github.com/tadahiroueta/ant-colony/blob/master/samples/inputs.gif)
- Stats on running simulation
  - React hooks display real-time information about simulation as it runs

  ![stats](https://github.com/tadahiroueta/ant-colony/blob/master/samples/stats.png)
- Map of mainland USA
  - Implementation of [React Simple Maps](https://www.react-simple-maps.io/) using state capital coordinates

  ![map](https://github.com/tadahiroueta/ant-colony/blob/master/samples/US-map.png)

## Usage
1. Visit my [webpage](https://antcolony.tadahiroueta.com/)

    ![30-points](https://github.com/tadahiroueta/ant-colony/blob/master/samples/30-capitals-iteration.gif)

2. Adjust sliders to your preferences
    > I find 1:2 exploitation:exploration to be most effective
    >
    > Note that using 40 capitals or more will significantly slow down the process
3. Click on "Reset"
4. Watch the algoritm look for better paths continously
    > ... just as nature continously looks for better, inperfect solutions 
