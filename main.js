//WebCraft
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
const simplex = new SimplexNoise();

let renderDistance = 2;
let world = new World();
world.generate();

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const fog = new THREE.Fog(
  0xffffff,
  (renderDistance - 5) * 16,
  (renderDistance + 1) * 16
);
scene.fog = fog;

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function remove(id) {
  scene.remove(scene.getObjectByName(id));
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  world.play();
  console.log(world.getMidChunk().position);
  //planeMesh.rotation.x += 0.03;
  //planeMesh.rotation.y += 0.04;
  //planeMesh.rotation.z += 0.02;
}

animate();
