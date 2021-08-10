//Just a test file for a cube made with separate faces, will be deleted soon.
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
let player = new Player();
camera.position.z = 10;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

let planeGeom = new THREE.PlaneGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});

let topMesh = new THREE.Mesh(planeGeom, material);
let bottom = new THREE.Mesh(planeGeom, material);
let left = new THREE.Mesh(planeGeom, material);
let right = new THREE.Mesh(planeGeom, material);
let front = new THREE.Mesh(planeGeom, material);
let back = new THREE.Mesh(planeGeom, material);

topMesh.position.set(0, 0.5, 0);
bottom.position.set(0, -0.5, 0);
left.position.set(-0.5, 0, 0);
right.position.set(0.5, 0, 0);
front.position.set(0, 0, 0.5);
back.position.set(0, 0, -0.5);

topMesh.rotation.set(1.57079633, 0, 0);
bottom.rotation.set(-1.57079633, 0, 0);
left.rotation.set(0, 1.57079633, 0);
right.rotation.set(0, -1.57079633, 0);

scene.add(topMesh, bottom, left, right, front, back);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  player.update();
}

animate();
