var canvas, accelerometer;
var rotation = {
  x: 0,
  y: 0,
  z: 0
};

function preload() {}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("main");
}

function draw() {
  background("#000000");
}

async function connect() {
  console.log("connecting...");
  const device = await microbit.requestMicrobit(window.navigator.bluetooth);
  const services = await microbit.getServices(device);
  accelerometer = services.accelerometerService;
  accelerometer.addEventListener(
    "accelerometerdatachanged",
    handleAccelerometerChanged
  );
  document.getElementById("button-container").style.display = "none";
  console.log("services", services);
}

function handleAccelerometerChanged(e) {
  rotation = e.detail;
  console.log(rotation);
}

window.addEventListener("resize", () => {
  resizeCanvas(window.innerWidth, window.innerHeight);
});
