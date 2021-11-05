import Phaser from 'phaser';
import sti1 from './assets/sti1.png';
import bt_sti1 from './assets/bt_sti1.png';
import { createNextQuestion, updateResponse } from './functions/quiz';
import countdown from './functions/countdown';

export default class Stage1Inner extends Phaser.Scene
{
  constructor ()
  {
    super('Stage1Inner');
  }

  init (data)
  {
    this.data = data;
    this.quiz = data.quiz;

    this.result = true;
    this.currentIndex = 0;
    this.stage = 'sti1';

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
    this.load.image('sti1', sti1);
    this.load.image('bt_sti1', bt_sti1);
    this.load.image(`ipfs${this.quiz.nft.ipfs_id}`, `https://cloudflare-ipfs.com/ipfs/${this.quiz.nft.ipfs_id}`);
  }

  async create ()
  {
    this.add.image(512, 350, 'sti1');
    this.add.image(190, 500, `ipfs${this.quiz.nft.ipfs_id}`);

    const bt_sti_1 = this.add.image(512, 305, 'bt_sti1').setInteractive();
    const bt_sti_2 = this.add.image(512, 425, 'bt_sti1').setInteractive();
    const bt_sti_3 = this.add.image(512, 545, 'bt_sti1').setInteractive();

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
