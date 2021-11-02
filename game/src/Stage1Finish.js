import Phaser from 'phaser';
import sti1 from './assets/sti1.png';
import bt_finish from './assets/bt_finish.png';

export default class Stage1Finish extends Phaser.Scene
{
  constructor ()
  {
      super('Stage1Finish');
  }

  init (data)
  {
    this.data = data;
  }

  preload ()
  {
      this.load.image('sti1', sti1);
      this.load.image('bt_finish', bt_finish);
  }

  create ()
  {
    const sti1 = this.add.image(512, 350, 'sti1');

    this.label = this.add.text(200, 180, '', {
      fontSize: '50px',
      color: 'black',
      fontFamily: 'GROBOLD',
      align: 'center'
    }).setWordWrapWidth(430);

    if (this.data.win) {
      this.typewriteText(`  You win!   \n ⭐⭐⭐\n Click to redeem your reward.`);
    } else {
      this.typewriteText(` You loose!  \n 😢😢😢\n Click to try again.`);
    }

    setTimeout(() => {
      const bt_finish = this.add.image(392, 470, 'bt_finish').setInteractive();

      this.add.text(314, 450, '', {
        fontSize: '40px',
        color: 'black',
        fontFamily: 'GROBOLD',
        align: 'center'
      }).setText(`${this.data.win ? 'Redeem' : 'Retry'}`);
  
      bt_finish.on('pointerdown', (pointer) => {
        if (this.data.win) {
          location.href = this.data.rurl;
        } else {
          this.scene.start('SantaAskMe');
        }
      });
    }, 3000);
  }

  typewriteText(text)
  {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
        callback: () => {
          this.label.text += text[i];
          ++i;
        },
        repeat: length - 1,
        delay: 50
    });
  }
}
