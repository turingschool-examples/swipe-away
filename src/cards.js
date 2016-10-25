class Cards {
  constructor () {
    this.cards = document.querySelectorAll('.card');
    this.addEventListeners();
  }

  addEventListeners () {
    document.addEventListener('touchstart', e => this.onStart(e));
    document.addEventListener('touchmove', e => this.onMove(e));
    document.addEventListener('touchend', e => this.onEnd(e));

    document.addEventListener('mousestart', e => this.onStart(e));
    document.addEventListener('mousemove', e => this.onMove(e));
    document.addEventListener('mouseend', e => this.onEnd(e));
  }

  onStart (event) {
    if (!event.target.classList.contains('card')) return;

    console.log(event.target);

    event.preventDefault();
  }

  onMove (event) {

  }

  onEnd (event) {

  }

  update (event) {

  }
}

window.addEventListener('load', () => new Cards());
