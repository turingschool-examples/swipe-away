class Cards {
  constructor () {
    this.cards = document.querySelectorAll('.card');

    this.target = null;
    this.startX = 0;
    this.currentX = 0;

    this.update = this.update.bind(this);

    this.addEventListeners();
    requestAnimationFrame(this.update);
  }

  addEventListeners () {
    document.addEventListener('touchstart', e => this.onStart(e));
    document.addEventListener('touchmove', e => this.onMove(e), { passive: true });
    document.addEventListener('touchend', e => this.onEnd(e));

    document.addEventListener('mousestart', e => this.onStart(e));
    document.addEventListener('mousemove', e => this.onMove(e));
    document.addEventListener('mouseend', e => this.onEnd(e));
  }

  onStart (event) {
    if (!event.target.classList.contains('card')) return;

    this.target = event.target;
    this.startX = event.pageX || event.touches[0].pageX;
    this.currentX = this.startX;

    event.preventDefault();
  }

  onMove (event) {
    if (!this.target) return;

    this.currentX = event.pageX || event.touches[0].pageX;
  }

  onEnd (event) {
    if (!this.target) return;
  }

  update (event) {
    requestAnimationFrame(this.update);

    if (!this.target) return;

    const screenX = this.currentX - this.startX;

    this.target.style.transform = `translateX(${screenX}px)`;
  }
}

window.addEventListener('load', () => new Cards());
