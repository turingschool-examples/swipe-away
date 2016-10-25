class Cards {
  constructor () {
    this.cards = document.querySelectorAll('.card');

    this.target = null;
    this.targetBoundingClientRect = null;
    this.startX = 0;
    this.currentX = 0;
    this.screenX = 0;
    this.targetX = 0;

    this.draggingCard = false;

    this.update = this.update.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);

    this.addEventListeners();
  }

  addEventListeners () {
    document.addEventListener('touchstart', this.onStart);
    document.addEventListener('touchmove', this.onMove);
    document.addEventListener('touchend', this.onEnd);

    document.addEventListener('mousedown', this.onStart);
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseup', this.onEnd);
  }

  onStart (event) {
    if (this.target) return;
    if (!event.target.classList.contains('card')) return;
    event.preventDefault();

    this.target = event.target;
    this.targetBoundingClientRect = this.target.getBoundingClientRect();
    this.startX = event.pageX || event.touches[0].pageX;
    this.currentX = this.startX;
    this.target.style.willChange = 'transform';
    this.draggingCard = true;

    requestAnimationFrame(this.update);
  }

  onMove (event) {
    if (!this.target) return;

    this.currentX = event.pageX || event.touches[0].pageX;
  }

  onEnd (event) {
    if (!this.target) return;

    const screenX = this.currentX - this.startX;
    this.targetX = 0;

    if (Math.abs(screenX) > this.targetBoundingClientRect.width * 0.35) {
      this.targetX = this.targetBoundingClientRect.width * (screenX > 0 ? 1 : -1);
    }

    this.draggingCard = false;
  }

  update (event) {
    if (!this.target) return;
    requestAnimationFrame(this.update);

    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX;
    } else {
      this.screenX += (this.targetX - this.screenX) / 10;
    }

    const normalizedDragDistance = Math.abs(this.screenX) / this.targetBoundingClientRect.width;
    const opacity = 1 - Math.pow(normalizedDragDistance, 3);

    this.target.style.transform = `translateX(${this.screenX}px)`;
    this.target.style.opacity = opacity;

    const isNearlyInvisible = opacity < 0.01;

    if (!this.draggingCard && isNearlyInvisible) {
      this.target.parentNode.removeChild(this.target);
      this.target.style.willChange = 'initial';
      this.target.style.transform = 'none';
      this.target = null;
    }
  }
}

window.addEventListener('load', () => new Cards());
