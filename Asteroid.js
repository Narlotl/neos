class Asteroid {
    constructor(distance, width, inclination, speed, name, orbit, hazardous, url) {
        this.distance = distance;
        this.width = width;
        this.inclination = inclination;
        this.speed = speed;
        this.name = name;
        let pos = orbit.lastIndexOf(',');
        if (pos > 0)
            this.orbitingBody = orbit.substring(0, pos) + ' and ' + orbit.substring(pos + 1);
        else
            this.orbitingBody = orbit;
        this.hazardous = (hazardous) ? 'yes' : 'no';
        this.url = url;
    }

    pos = createVector(0, 0);
    widthMod = random() + 1;
    color = random(125, 175);

    show = function () {
        push();
        fill(this.color);
        if (mouseX + (this.width * this.widthMod * 2) > this.pos.x && mouseX - (this.width * this.widthMod * 2) < this.pos.x + this.width && mouseY - (this.width * 2) < this.pos.y && mouseY + (this.width * 2) > this.pos.y - this.width) {
            document.querySelector('div.info').innerHTML = this.name + '<p>Average distance from '.concat(this.orbitingBody).concat(': ').concat(this.distance.toLocaleString()).concat('km</p><p>Average speed: ').concat((this.speed).toLocaleString()).concat('km/hr</p><p>Estitmated size: ').concat(this.width.toLocaleString()).concat('km</p><p>Is potentially dangerous: ').concat(this.hazardous).concat('</p><p><a href="').concat(this.url).concat('" target="_blank">More information</a></p>');
            fill(0, 255, 0);
        }
        translate(this.pos.x, this.pos.y);
        ellipseMode(CORNER);
        ellipse(0, 0, this.width * this.widthMod * 2, this.width * 2);
        this.pos.add(createVector(cos(radians(this.inclination)) * this.speed / 50000, sin(radians(this.inclination)) * this.speed / 50000));
        if (this.pos.x > width)
            this.pos.x = 0;
        if (this.pos.y > height)
            this.pos.y = 0;
        if (this.pos.y < 0)
            this.pos.y = height;
        pop();
    }
}