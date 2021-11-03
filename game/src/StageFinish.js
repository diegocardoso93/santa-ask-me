import Phaser from 'phaser';
import sti1 from './assets/sti1.png';
import bt_finish from './assets/bt_finish.png';
import typewriteText from './functions/typewriteText';

export default class Stage1Finish extends Phaser.Scene
{
  constructor ()
  {
    super('StageFinish');
  }

  init (data)
  {
    this.data = data;
    this.label_style1 = {
      fontSize: '40px',
      color: 'black',
      fontFamily: 'GROBOLD',
      align: 'center'
    };
    this.label_style2 = {
      fontSize: '50px',
      color: 'black',
      fontFamily: 'GROBOLD',
      align: 'center'
    };
    this.bt_text_Style = {
      fontSize: '40px',
      color: 'black',
      fontFamily: 'GROBOLD',
      align: 'center'
    };
  }

  preload ()
  {
    this.load.image('bt_finish', bt_finish);
  }

  create ()
  {
    this.add.image(512, 350, this.data.stage);

    if (this.data.win) {
      const label = this.add.text(170, 180, '', this.label_style1).setWordWrapWidth(500);
      typewriteText(this, label, `  You win!   \n ⭐⭐⭐\n Add AssetID ${this.data.asset_id} on your Wallet and click to redeem your reward.`);
    } else {
      const label = this.add.text(200, 180, '', this.label_style2).setWordWrapWidth(430);
      typewriteText(this, label, ` You missed!  \n 😢😢😢\n Click to try again.`);
    }

    setTimeout(() => {
      const bt_finish = this.add.image(392, 470, 'bt_finish').setInteractive();

      this.add.text(314, 446, '', this.bt_text_Style).setText(`${this.data.win ? 'Redeem' : 'Retry'}`);
  
      bt_finish.on('pointerdown', (pointer) => {
        if (this.data.win) {
          alert('Redeem');
        } else {
          this.scene.start('SantaAskMe');
        }
      });
    }, 2000);
  }
}
