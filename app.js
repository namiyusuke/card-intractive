class CardMouseTracker {
  constructor(target) {
    this.cardElement = document.querySelector(target);
    this.card = document.querySelector(target + " .event-card-inner");
    this.rotation = 200;
    this.zRotationFactor = 15;
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;
    this.currentMouseX = 0;
    this.isSpinning = false;
    
    window.addEventListener("mousemove", (e) => {
      if (!this.isSpinning) {
        this.currentMouseX = e.clientX;
        this.mouseMovement(); // ここでリアルタイム実行
      }
    });

    // カードクリック時のスピン機能を追加
    this.cardElement.addEventListener("click", () => {
      this.spinAndRedirect();
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

  spinAndRedirect() {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    
    // 現在のZ軸回転を取得
    const currentRotationZ = gsap.getProperty(this.card, "rotationZ");
    
    // GSAPで滑らかな回転アニメーションを実行
    const timeline = gsap.timeline();
    
    timeline
      .to(this.card, {
        rotationY: "+=360",
        rotationZ: currentRotationZ,
        scale: 1.1,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          window.open('https://x.com/i/spaces/1dRKZYYmqeAxB', '_blank');
          this.isSpinning = false;
        }
      })
      .to(this.card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
  }
}
const cardTracker = new CardMouseTracker(".event-card");
cardTracker.mouseMovement();
