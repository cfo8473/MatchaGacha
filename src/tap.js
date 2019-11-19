const Tap = {
  tapMethods(player) {
    const tapClick = document.getElementById('tap-click');
    const tapUpgrade = document.getElementById('tap-upgrade');

    tapClick.addEventListener('click', (e) => {
      player.tap();
    });

    tapUpgrade.addEventListener('click', (e) => {
      player.upgrade(5);
    });
  }

  
}

module.exports = Tap;