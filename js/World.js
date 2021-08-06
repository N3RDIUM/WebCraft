class World {
  constructor() {
    this.player = "";
    this.chunks = [];
    this.currPlayerChunk = { x: 0, z: 0 };
  }
  generate() {
    for (var i = -renderDistance; i < renderDistance + 1; i++) {
      var arr = [];
      for (var j = -renderDistance; j < renderDistance + 1; j++) {
        arr.push(new Chunk(i, j, this));
        //console.log([i, j]);
      }
      this.chunks.push(arr);
    }
    //console.log(this.chunks);
    this.player = new Player();
    this.gameState = "play";
    this.midChunk = this.getMidChunk();
  }
  play() {
    this.player.update();
    this.update();
    for (var i in this.chunks) {
      for (var j in this.chunks[i]) {
        this.chunks[i][j].update();
      }
    }
  }
  getMidChunk() {
    for (var i in this.chunks) {
      this.chunks[i].sort(function (a, b) {
        //console.log(a.position.z, b.position.z);
        return a.position.z - b.position.z;
      });
    }
    this.chunks.sort(function (a, b) {
      //console.log([a[0].position.x, b[0].position.x]);
      return a[0].position.x - b[0].position.x;
    });
    //console.log(this.chunks);
    this.midChunk = this.chunks[renderDistance][renderDistance];
    return this.chunks[renderDistance][renderDistance];
  }
  update() {
    //this.midChunk = this.getMidChunk();
  }
}
