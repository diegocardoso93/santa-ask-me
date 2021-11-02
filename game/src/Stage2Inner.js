import Phaser from 'phaser';
import sti2 from './assets/sti2.png';
import bt_sti2 from './assets/bt_sti2.png';

export default class Stage2Inner extends Phaser.Scene
{
  constructor ()
  {
      super('Stage2Inner');
  }

  preload ()
  {
      this.load.image('sti2', sti2);
      this.load.image('bt_sti2', bt_sti2);
  }

  create ()
  {
    const sti = this.add.image(512, 350, 'sti2');
    const bt_sti_1 = this.add.image(512, 305, 'bt_sti2');
    const bt_sti_2 = this.add.image(512, 425, 'bt_sti2');
    const bt_sti_3 = this.add.image(512, 545, 'bt_sti2');
    const option_style = {
      fontSize: '25px',
      color: 'white',
      fontFamily: 'GROBOLD'
    };
    this.add.text(400, 274, 'Bugatti Veyron', option_style).setWordWrapWidth(200);
    this.add.text(400, 394, 'McLaren Speedtail', option_style).setWordWrapWidth(200);
    this.add.text(400, 514, 'Saleen S7', option_style).setWordWrapWidth(200);

    this.add.text(110, 110, 'What car is that?', {
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
