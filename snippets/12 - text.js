function create () {
  this.countdownText = this.add.text(
    0,
    0,
    secondsToNextColor(),
    { fontSize: '64px', fill: '#333' }
  );
}


function update () {
  this.countdownText.setText(secondsToNextColor());
}
