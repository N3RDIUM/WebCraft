class Player {
  constructor() {
    this.player = new THREE.PointerLockControls(camera, document.body);
    scene.add(this.player.getObject());
    //add event listener to your document.body
    document.body.addEventListener("click", () => this.lock(), false);
    this.moveForward = false;
    this.moveBackward = false;
    this.moveRight = false;
    this.moveLeft = false;
    this.moveSpeed = 0.8;
    document.addEventListener(
      "keyup",
      (e) => {
        switch (e.keyCode) {
          case 87:
            /*W*/ this.moveForward = false;
            break;
          case 65:
            /*A*/ this.moveLeft = false;
            break;
          case 83:
            /*S*/ this.moveBackward = false;
            break;
          case 68:
            /*D*/ this.moveRight = false;
            break;
        }
      },
      false
    );
    document.addEventListener(
      "keydown",
      (e) => {
        switch (e.keyCode) {
          case 87:
            /*W*/ this.moveForward = true;
            break;
          case 65:
            /*A*/ this.moveLeft = true;
            break;
          case 83:
            /*S*/ this.moveBackward = true;
            break;
          case 68:
            /*D*/ this.moveRight = true;
            break;
        }
      },
      false
    );
  }
  update() {
    if (this.moveForward == true) {
      this.player.moveForward(this.moveSpeed);
    }
    if (this.moveBackward == true) {
      this.player.moveForward(-this.moveSpeed);
    }
    if (this.moveLeft == true) {
      this.player.moveRight(-this.moveSpeed);
    }
    if (this.moveRight == true) {
      this.player.moveRight(this.moveSpeed);
    }
  }
  lock() {
    this.player.lock();
  }
}
