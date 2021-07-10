class World {
  constructor() {
    this.player = "";
    this.chunks = [];
    this.currPlayerChunk = { x: 0, z: 0 };
  }
  generate() {
    for (var i = -renderDistance; i < renderDistance; i++) {
      var arr = [];
      for (var j = -renderDistance; j < renderDistance; j++) {
        arr.push(new Chunk(i, j, this));
      }
      this.chunks.push(arr);
    }
    //console.log(this.chunks);
    this.player = new Player();
    this.gameState = "play";
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
  update() {}
}
