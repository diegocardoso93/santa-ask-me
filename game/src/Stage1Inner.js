import Phaser from 'phaser';
import sti1 from './assets/sti1.png';
import bt_sti1 from './assets/bt_sti1.png';

export default class Stage1Inner extends Phaser.Scene
{
  constructor ()
  {
      super('Stage1Inner');
  }

  preload ()
  {
      this.load.image('sti1', sti1);
      this.load.image('bt_sti1', bt_sti1);
  }

  create ()
  {
    const sti1 = this.add.image(512, 350, 'sti1');
    const bt_sti_1 = this.add.image(512, 305, 'bt_sti1');
    const bt_sti_2 = this.add.image(512, 425, 'bt_sti1');
    const bt_sti_3 = this.add.image(512, 545, 'bt_sti1');
    const option_style = {
      fontSize: '25px',
      color: 'white',
      fontFamily: 'GROBOLD'
    };
    this.add.text(400, 274, 'Frog', option_style).setWordWrapWidth(200);
    this.add.text(400, 394, 'Lizard', option_style).setWordWrapWidth(200);
    this.add.text(400, 514, 'Salamander', option_style).setWordWrapWidth(200);

    this.add.text(110, 110, 'What animal is that?', {
      fontSize: '50px',
      color: 'black',
      fontFamily: 'GROBOLD'
    }).setWordWrapWidth(900);

    bt_sti_1.on('pointerdown', (pointer) => {
      alert('opt1');
    });
    bt_sti_2.on('pointerdown', (pointer) => {
      alert('opt2');
    });
    bt_sti_3.on('pointerdown', (pointer) => {
      alert('opt3');
    });
  }

  update(time, delta)
  {
  }
}
