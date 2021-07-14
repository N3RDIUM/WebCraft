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
    this.shown = true;
    this.current = false;
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.mesh);
    this.mesh.position.set(this.pos.x, this.h, this.pos.z);
    this.parent = parent;
    this.mesh.name = parseInt(this.pos.x.toString() + this.pos.z.toString + this.h.toString())
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
    remove(this.mesh.name)
  }
}
