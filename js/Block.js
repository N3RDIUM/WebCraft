let planeGeom = new THREE.PlaneGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});

class Block {
  constructor(x, z, parent) {
    this.pos = { x: x, z: z };
    //console.log(this.pos)
    this.dimensions = { x: 10, y: 10, x: 10 };
    var i = x;
    var j = z;
    this.h = Math.round(
      simplex.noise2D(i / 20, j / 20) * 1 +
        simplex.noise2D(i / 350, j / 350) * 2 +
        simplex.noise2D(i / 550, j / 550) * 5 +
        simplex.noise2D(i / 800, j / 800) * 10 +
        simplex.noise2D(i / 2000, j / 2000) * 100 +
        simplex.noise2D(i / 10000, j / 10000) * 500
    );
    this.topMesh = new THREE.Mesh(planeGeom, material);
    this.bottom = new THREE.Mesh(planeGeom, material);
    this.left = new THREE.Mesh(planeGeom, material);
    this.right = new THREE.Mesh(planeGeom, material);
    this.front = new THREE.Mesh(planeGeom, material);
    this.back = new THREE.Mesh(planeGeom, material);

    this.topMesh.position.set(this.pos.x, this.h + 0.5, this.pos.z);
    this.bottom.position.set(this.pos.x, this.h - 0.5, this.pos.z);
    this.left.position.set(this.pos.x - 0.5, this.h, this.pos.z);
    this.right.position.set(this.pos.x + 0.5, this.h, this.pos.z);
    this.front.position.set(this.pos.x, this.h, this.pos.z + 0.5);
    this.back.position.set(this.pos.x, this.h, this.pos.z - 0.5);

    this.topMesh.rotation.set(1.57079633, 0, 0);
    this.bottom.rotation.set(-1.57079633, 0, 0);
    this.left.rotation.set(0, 1.57079633, 0);
    this.right.rotation.set(0, -1.57079633, 0);

    scene.add(
      this.topMesh,
      this.bottom,
      this.left,
      this.right,
      this.front,
      this.back
    );
    this.shown = true;
    this.current = false;
    this.parent = parent;
    this.topMesh.name = parseInt(
      this.pos.x.toString() + this.pos.z.toString + this.h.toString() + "top"
    );
    this.bottom.name = parseInt(
      this.pos.x.toString() + this.pos.z.toString + this.h.toString() + "bottom"
    );
    this.left.name = parseInt(
      this.pos.x.toString() + this.pos.z.toString + this.h.toString() + "left"
    );
    this.right.name = parseInt(
      this.pos.x.toString() + this.pos.z.toString + this.h.toString() + "right"
    );
    this.front.name = parseInt(
      this.pos.x.toString() + this.pos.z.toString + this.h.toString() + "front"
    );
    this.back.name = parseInt(
      this.pos.x.toString() + this.pos.z.toString + this.h.toString() + "back"
    );
  }
  update() {
    if (
      Math.round(camera.position.x) === this.pos.x &&
      Math.round(camera.position.z) === this.pos.z
    ) {
      this.current = true;
      camera.position.setY(this.h + 2);
      world.currPlayerChunk = {
        x: this.parent.position.x,
        z: this.parent.position.z,
      };
      //console.log(this.pos)
    } else {
      this.current = false;
    }
  }
  refresh() {
    var i = this.pos.x;
    var j = this.pos.z;
    this.h = Math.round(
      simplex.noise2D(i / 20, j / 20) * 1 +
        simplex.noise2D(i / 350, j / 350) * 2 +
        simplex.noise2D(i / 550, j / 550) * 5 +
        simplex.noise2D(i / 800, j / 800) * 10 +
        simplex.noise2D(i / 2000, j / 2000) * 100 +
        simplex.noise2D(i / 10000, j / 10000) * 500
    );
    this.shown = true;
    this.current = false;
    this.mesh.position.set(this.pos.x, this.h, this.pos.z);
  }
  dispose() {
    remove(this.topMesh.name);
    remove(this.bottom.name);
    remove(this.left.name);
    remove(this.right.name);
    remove(this.front.name);
    remove(this.back.name);
  }
}
