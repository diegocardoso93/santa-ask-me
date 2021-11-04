import Phaser from 'phaser';
import sti2 from './assets/sti2.png';
import bt_sti2 from './assets/bt_sti2.png';
import { createNextQuestion, updateResponse } from './functions/quiz';
import countdown from './functions/countdown';

export default class Stage2Inner extends Phaser.Scene
{
  constructor ()
  {
    super('Stage2Inner');
  }

  init (data)
  {
    this.data = data;
    this.quiz = data.quiz;

    this.result = true;
    this.currentIndex = 0;
    this.stage = 'sti2';
    
    this.question_title_style = {
      fontSize: '50px',
      color: 'black',
      fontFamily: 'GROBOLD'
    };

    this.option_text_style = {
      fontSize: '25px',
      color: 'white',
      fontFamily: 'GROBOLD'
    };
  }

  preload ()
  {
    this.load.image('sti2', sti2);
    this.load.image('bt_sti2', bt_sti2);
    this.load.image(`ipfs${this.quiz.nft.ipfs_id}`, `https://cloudflare-ipfs.com/ipfs/${this.quiz.nft.ipfs_id}`);
  }

  create ()
  {
    this.add.image(512, 350, 'sti2');
    this.add.image(190, 500, `ipfs${this.quiz.nft.ipfs_id}`);

    const bt_sti_1 = this.add.image(512, 305, 'bt_sti2').setInteractive();
    const bt_sti_2 = this.add.image(512, 425, 'bt_sti2').setInteractive();
    const bt_sti_3 = this.add.image(512, 545, 'bt_sti2').setInteractive();

    countdown(this);

    bt_sti_1.on('pointerdown', (pointer) => {
      updateResponse(this, 0);
    });
    bt_sti_2.on('pointerdown', (pointer) => {
      updateResponse(this, 1);
    });
    bt_sti_3.on('pointerdown', (pointer) => {
      updateResponse(this, 2);
    });

    createNextQuestion(this, 0);
  }
}
