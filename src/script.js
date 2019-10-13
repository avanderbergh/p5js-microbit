var canvas, accelerometer;
var rotation = {
  x: 0,
  y: 0,
  z: 0
};
var temp = 0;

function preload() {
  // This function is to load assets before setup function can run.
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("main");
}

function draw() {
  background("#fefefe");
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
  services.temperatureService.addEventListener(
    "temperaturechanged",
    handleTemperatureChanged
  );
  services.buttonService.addEventListener(
    "buttonastatechanged",
    handleButtonAPressed
  );
  services.buttonService.addEventListener(
    "buttonbstatechanged",
    handleButtonBPressed
  );
  document.getElementById("button-container").style.display = "none";
  console.log("services", services);
}

function handleAccelerometerChanged(e) {
  rotation = e.detail;
}

function handleTemperatureChanged(e) {
  temp = e.detail;
}

function handleButtonAPressed(e) {
  console.log("Button A Pressed", e.detail);
}

function handleButtonBPressed(e) {
  console.log("Button B Pressed", e.detail);
}

window.addEventListener("resize", () => {
  resizeCanvas(window.innerWidth, window.innerHeight);
});
