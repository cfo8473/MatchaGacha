const Tap = {
  tapMethods(options) {
    const tapHeroA = document.getElementById('party-member-canvas-a');
    const tapHeroB = document.getElementById('party-member-canvas-b');
    const tapHeroC = document.getElementById('party-member-canvas-c');
    const tapHeroD = document.getElementById('party-member-canvas-d');

    const player = options.player;
    const heroA = options.heroA;
    const heroB = options.heroB;
    const heroC = options.heroC;
    const heroD = options.heroD;
    const boss = options.boss;
    
    tapHeroA.addEventListener('click', (e) => {
      player.tap(heroA.fetchPower());
      heroA.heroAttackAnimation();
      boss.takeDamage(heroA);
    });

    tapHeroB.addEventListener('click', (e) => {
      player.tap(heroB.fetchPower());
      heroB.heroAttackAnimation();
      boss.takeDamage(heroB);
    });

    tapHeroC.addEventListener('click', (e) => {
      player.tap(heroC.fetchPower());
      heroC.heroAttackAnimation();
      boss.takeDamage(heroC);
    });

    tapHeroD.addEventListener('click', (e) => {
      player.tap(heroD.fetchPower());
      heroD.heroAttackAnimation();
      boss.takeDamage(heroD);
    });

  }

  
}

module.exports = Tap;