import button_finish from './assets/button_finish.png';
import button_back from './assets/button_back.png';

import Phaser from 'phaser';
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

    this.button_text_style = {
      fontSize: '40px',
      color: 'black',
      fontFamily: 'GROBOLD',
      align: 'center'
    };

    this.message_style = {
      fontSize: '28px',
      color: 'black',
      fontFamily: 'GROBOLD',
      align: 'center'
    };
  }

  preload ()
  {
    this.load.image('button_finish', button_finish);
    this.load.image('button_back', button_back);
  }

  create ()
  {
    this.add.image(512, 350, this.data.stage);
    const button_back = this.add.image(100, 100, 'button_back').setInteractive();
    const sound_click = this.sound.add('sound_click');

    button_back.on('pointerdown', (pointer) => {
      sound_click.play();
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
      const button_finish = this.add.image(this.data.win ? 402 : 392, 470, 'button_finish').setInteractive();
      const button_finish_text = this.add.text(314, 446, '', this.button_text_style).setText(`${this.data.win ? 'Redeem' : ' Retry'}`);
      const label2 = this.add.text(180, 550, '', this.message_style).setWordWrapWidth(500);

      button_finish.on('pointerdown', async (pointer) => {
        sound_click.play();
        if (this.data.win) {
          button_finish.disableInteractive();
          button_finish_text.setText('Loading...');
          label2.setText('');
          const response = await apiReedemToken(this.data.asset_id);
          button_finish.setInteractive();

          if (response.message === 'success') {
            typewriteText(this, label2, `Done! Click to return.`);
            button_finish_text.setText(' Return');
            this.data.win = null;
          } else {
            typewriteText(this, label2, response.message);
            button_finish_text.setText('Redeem');
          }
        } else {
          this.scene.start('SantaAskMe');
        }
      });
    }, 2000);
  }
}
