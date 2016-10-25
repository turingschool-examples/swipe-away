class Cards {
  constructor () {
    this.cards = document.querySelectorAll('.card');

    this.target = null;
    this.startX = 0;
    this.currentX = 0;
    this.screenX = 0;

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

    document.addEventListener('mousestart', this.onStart);
    document.addEventListener('mousemove', this.onMove);
    document.addEventListener('mouseend', this.onEnd);
  }

  onStart (event) {
    if (!event.target.classList.contains('card')) return;
    event.preventDefault();

    this.target = event.target;
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
    this.draggingCard = false;
  }

  update (event) {
    if (!this.target) return;
    requestAnimationFrame(this.update);

    if (this.draggingCard) {
      this.screenX = this.currentX - this.startX;
    } else {
      this.screenX += (0 - this.screenX) / 10;
    }

    this.target.style.transform = `translateX(${this.screenX}px)`;
  }
}

window.addEventListener('load', () => new Cards());
