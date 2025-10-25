let particles = [];
const num = 800;
const noiseScale = 0.008;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1.2);
 
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(0, 10);
  hueOffset += 0.3; // zachte kleurverandering door de tijd
 
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = TAU * n;
   
    // beweeg deeltjes
    p.x += cos(a);
    p.y += sin(a);
   
    // kleur op basis van noise + tijd
    let hue = (hueOffset + n * 360) % 360;
    stroke(hue, 80, 100, 70);
    point(p.x, p.y);
   
    // herplaats deeltjes buiten beeld
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function mousePressed() {
  // laat de ruis opnieuw ontstaan als je klikt
  noiseSeed(millis());
 
  // visueel effect
  for (let i = 0; i < particles.length; i++) {
    particles[i].add(p5.Vector.random2D().mult(random(50)));
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
