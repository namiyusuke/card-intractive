class CardMouseTracker {
  constructor(target) {
    this.card = document.querySelector(target + " .event-card-inner");
    this.rotation = 200;
    this.zRotationFactor = 15;
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;
    this.currentMouseX = 0;
    window.addEventListener("mousemove", (e) => {
      this.currentMouseX = e.clientX;
      this.mouseMovement(); // ここでリアルタイム実行
    });
  }
  mouseMovement() {
    const mouseX = this.currentMouseX;
    const normalizedY = (mouseX - this.centerX) / this.centerX;
    const rotationY = normalizedY * this.rotation;
    const absRotation = Math.abs(rotationY);
    const rotationProgress = Math.min(absRotation / 180, 1);
    const rotationZ = 6 - rotationProgress * 12;
    const rotationZMirror = -6 + rotationProgress * 12;
    gsap.to(this.card, {
      rotationY: rotationY,
      rotationZ: rotationZ,
      duration: 0.5,
      ease: "power2.out",
    });
  }
}
const cardTracker = new CardMouseTracker(".event-card");
cardTracker.mouseMovement();
