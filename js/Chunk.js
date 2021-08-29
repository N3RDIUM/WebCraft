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
    if (world.currPlayerChunk.x - this.position.x > renderDistance) {
      this.position.x = world.midChunk.position.x + renderDistance - val;
      setTimeout(() => {
        this.refresh_(this);
      }, Math.round(Math.random(10, 150)));
    } else if (world.currPlayerChunk.x - this.position.x < -renderDistance) {
      this.position.x = world.midChunk.position.x - renderDistance + val;
      setTimeout(() => {
        this.refresh_(this);
      }, Math.round(Math.random(10, 150)));
    } else if (world.currPlayerChunk.z - this.position.z > renderDistance) {
      this.position.z = world.midChunk.position.z + renderDistance - val;
      setTimeout(() => {
        this.refresh_(this);
      }, Math.round(Math.random(10, 150)));
    } else if (world.currPlayerChunk.z - this.position.z < -renderDistance) {
      this.position.z = world.midChunk.position.z - renderDistance + val;
      setTimeout(() => {
        this.refresh_(this);
      }, Math.round(Math.random(10, 150)));
    }
  }
  refresh_(that) {
    for (var i in that.cubes) {
      for (var j in that.cubes[i]) {
        that.cubes[i][j].dispose();
      }
    }
    that.cubes.pop();
    //console.log('disposed chunk cubes at ' + that.position.x.toString() + ' ' +that.position.z.toString())
    for (var i = 0; i < 16; i++) {
      that.cubes[i] = [];
      for (var j = 0; j < 16; j++) {
        that.cubes[i].push(
          new Block(i + that.position.x * 16, j + that.position.z * 16, that)
        );
      }
    }
  }
  updateBlocks() {
    for (var i in this.cubes) {
      for (var j in this.cubes[i]) {
        this.cubes[i][j].update();
      }
    }
  }
}
