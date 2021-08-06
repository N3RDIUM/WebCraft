class Chunk {
  constructor(x, z, parent) {
    this.position = { x: x, z: z };
    this.parent = parent;
    this.cubes = [];
    for (var i = 0; i < 16; i++) {
      this.cubes[i] = [];
      for (var j = 0; j < 16; j++) {
        this.cubes[i].push(
          new Block(i + this.position.x * 16, j + this.position.z * 16, this)
        );
      }
    }
    this.shown = false;
    this.currChunk = false;
  }
  async update() {
    let val = 0;
    for (var i in this.cubes) {
      for (var j in this.cubes[i]) {
        this.cubes[i][j].update();
      }
    }
    if (world.currPlayerChunk.x - this.position.x > renderDistance) {
      this.position.x = world.getMidChunk().position.x + renderDistance - val;
      this.position.x = world.getMidChunk().position.x + renderDistance - val;
      this.refresh_();
    } else if (world.currPlayerChunk.x - this.position.x < -renderDistance) {
      this.position.x = world.getMidChunk().position.x - renderDistance + val;
      this.position.x = world.getMidChunk().position.x - renderDistance + val;
      this.refresh_();
    } else if (world.currPlayerChunk.z - this.position.z > renderDistance) {
      this.position.z = world.getMidChunk().position.z + renderDistance - val;
      this.position.z = world.getMidChunk().position.z + renderDistance - val;
      this.refresh_();
    } else if (world.currPlayerChunk.z - this.position.z < -renderDistance) {
      this.position.z = world.getMidChunk().position.z - renderDistance + val;
      this.position.z = world.getMidChunk().position.z - renderDistance + val;
      this.refresh_();
    }
  }
  refresh_() {
    for (var i in this.cubes) {
      for (var j in this.cubes[i]) {
        this.cubes[i][j].dispose();
      }
    }
    this.cubes.pop();
    //console.log('disposed chunk cubes at ' + this.position.x.toString() + ' ' + this.position.z.toString())
    for (var i = 0; i < 16; i++) {
      this.cubes[i] = [];
      for (var j = 0; j < 16; j++) {
        this.cubes[i].push(
          new Block(i + this.position.x * 16, j + this.position.z * 16, this)
        );
      }
    }
  }
}
