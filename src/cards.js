class Cards {
  constructor () {
    this.cards = document.querySelectorAll('.card');

    this.target = null;
    this.startX = 0;
    this.currentX = 0;

    this.update = this.update.bind(this);
    this.onStart = this.this.onStart.bind(this);
    this.onMove = this.this.onMove.bind(this);
    this.onEnd = this.this.onEnd.bind(this);

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

    requestAnimationFrame(this.update);
  }

  onMove (event) {
    if (!this.target) return;

    this.currentX = event.pageX || event.touches[0].pageX;
  }

  onEnd (event) {
    if (!this.target) return;
  }

  update (event) {
    if (!this.target) return;
    requestAnimationFrame(this.update);

    const screenX = this.currentX - this.startX;

    this.target.style.transform = `translateX(${screenX}px)`;
  }
}

window.addEventListener('load', () => new Cards());
