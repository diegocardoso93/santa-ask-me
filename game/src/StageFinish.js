import Phaser from 'phaser';
import sti1 from './assets/sti1.png';
import bt_finish from './assets/bt_finish.png';
import bt_back from './assets/bt_back.png';
import typewriteText from './functions/typewriteText';
import { apiReedemToken } from './functions/api';

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
    this.bt_text_style = {
      fontSize: '40px',
      color: 'black',
      fontFamily: 'GROBOLD',
      align: 'center'
    };
    this.info_style = {
      fontSize: '28px',
      color: 'black',
      fontFamily: 'GROBOLD',
      align: 'center'
    };
  }

  preload ()
  {
    this.load.image('bt_finish', bt_finish);
    this.load.image('bt_back', bt_back);
  }

  create ()
  {
    this.add.image(512, 350, this.data.stage);
    const bt_back = this.add.image(100, 100, 'bt_back').setInteractive();
    bt_back.on('pointerdown', (pointer) => {
      this.scene.start('SantaAskMe');
    });

    if (this.data.win) {
      const label = this.add.text(170, 170, '', this.label_style1).setWordWrapWidth(500);
      typewriteText(this, label, `     You win!    \n ⭐⭐⭐\n Add AssetID ${this.data.asset_id} to your Wallet and click to redeem your reward.`);
    } else {
      const label = this.add.text(200, 170, '', this.label_style2).setWordWrapWidth(430);
      typewriteText(this, label, `   You missed!  \n 😢😢😢\n Click to try again.`);
    }

    setTimeout(() => {
      const bt_finish = this.add.image(392, 470, 'bt_finish').setInteractive();
      const bt_finish_text = this.add.text(314, 446, '', this.bt_text_style).setText(`${this.data.win ? 'Redeem' : 'Retry'}`);
      const label2 = this.add.text(180, 550, '', this.info_style).setWordWrapWidth(500);

      bt_finish.on('pointerdown', async (pointer) => {
        if (this.data.win) {
          bt_finish.setInteractive(false);
          bt_finish_text.setText('Loading...');
          label2.setText('');
          const res = await apiReedemToken(this.data.asset_id);
          bt_finish.setInteractive(true);

          if (res.message === 'success') {
            typewriteText(this, label2, `Done! Click to return.`);
            bt_finish_text.setText('Return');
            this.data.win = null;
          } else {
            typewriteText(this, label2, res.message);
            bt_finish_text.setText('Redeem');
          }
        } else {
          this.scene.start('SantaAskMe');
        }
      });
    }, 2000);
  }
}
