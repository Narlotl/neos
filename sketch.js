var asteroids = [];
const AU_TO_KM = 149597871;

function setup() {
    createCanvas(document.querySelector('div.info').clientWidth - 17, document.documentElement.clientHeight);
    run(5);
}

function draw() {
    background(0, 35);
    asteroids.forEach(asteroid => {
        asteroid.show();
    });
}

function run(groups) {
    clear();
    asteroids = [];
    var used = [];
    var req;
    for (let i = 0; i < groups; i++) {
        let randomNumber;
        while (used.includes(randomNumber = round(random(0, 50)))) { }
        used.push(randomNumber);
        req = new XMLHttpRequest();
        req.open('GET', 'https://api.nasa.gov/neo/rest/v1/neo/browse?page=' + randomNumber + '&api_key=fvA9u4qpBK9EY8vGLkPI55IDAh2qO0ImrORbmr0L', true);
        req.onload = function () {
            let objects = JSON.parse(this.response).near_earth_objects;
            objects.forEach(asteroid => {
                let speed = 0;
                let orbits = [];
                asteroid.close_approach_data.forEach(approach => {
                    speed += parseFloat(approach.relative_velocity.kilometers_per_hour);
                    if (!orbits.includes(approach.orbiting_body))
                        orbits.push(approach.orbiting_body);
                });
                speed /= asteroid.close_approach_data.length;
                asteroids.push(new Asteroid((parseFloat(asteroid.orbital_data.aphelion_distance) + parseFloat(asteroid.orbital_data.perihelion_distance)) / 2 * AU_TO_KM, (asteroid.estimated_diameter.kilometers.estimated_diameter_min + asteroid.estimated_diameter.kilometers.estimated_diameter_min) / 2, asteroid.orbital_data.inclination, speed, asteroid.name, orbits.toString().replaceAll(',', ', ').replace('Merc', 'Mercury').replace('Juptr', 'Jupiter'), asteroid.is_potentially_hazardous_asteroid, 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr='.concat(asteroid.neo_reference_id)));
            });
        };
        req.send();
    }
}

//fvA9u4qpBK9EY8vGLkPI55IDAh2qO0ImrORbmr0L