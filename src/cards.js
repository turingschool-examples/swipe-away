class Cards {
  constructor () {
    this.cards = document.querySelectorAll('.card');
  }
}

window.addEventListener('load', () => new Cards());
