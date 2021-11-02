import Phaser from 'phaser';
import sti1 from './assets/sti1.png';
import bt_sti1 from './assets/bt_sti1.png';

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
    this.load.image(`ipfs${this.quiz.nft.ipfs_id}`, `https://${this.quiz.nft.ipfs_id}.ipfs.dweb.link`);
  }

  async create ()
  {
    const sti1 = this.add.image(512, 350, 'sti1');
    const bt_sti_1 = this.add.image(512, 305, 'bt_sti1').setInteractive();
    const bt_sti_2 = this.add.image(512, 425, 'bt_sti1').setInteractive();
    const bt_sti_3 = this.add.image(512, 545, 'bt_sti1').setInteractive();
    const ipfs = this.add.image(190, 500, `ipfs${this.quiz.nft.ipfs_id}`);

    this.createNextQuestion(0);

    bt_sti_1.on('pointerdown', (pointer) => {
      this.updateResponse(0);
    });
    bt_sti_2.on('pointerdown', (pointer) => {
      this.updateResponse(1);
    });
    bt_sti_3.on('pointerdown', (pointer) => {
      this.updateResponse(2);
    });
  }

  updateResponse(idx)
  {
    this.result &= this.currentQuestion.options
    .find(o => o.label === this.currentQuestion.options[idx].label)
    .anwser;

    this.currentIndex++;
    this.createNextQuestion(this.currentIndex);
  }

  createNextQuestion(idx)
  {
    if (this.currentIndex === this.quiz.questions.length) {
      this.scene.start('Stage1Finish', { win: this.result, rurl: this.quiz.rurl });
      return false;
    }

    const question = this.quiz.questions[this.currentIndex];
    this.currentQuestion = question;

    if (!idx) {
      this.title = this.add.text(110, 110, question.title, this.question_title_style).setWordWrapWidth(900);

      this.option1 = this.add.text(400, 274, question.options[0].label, this.option_text_style).setWordWrapWidth(200);
      this.option2 = this.add.text(400, 394, question.options[1].label, this.option_text_style).setWordWrapWidth(200);
      this.option3 = this.add.text(400, 514, question.options[2].label, this.option_text_style).setWordWrapWidth(200);
    } else {
      this.title.setText(question.title);
      this.option1.setText(question.options[0].label);
      this.option2.setText(question.options[1].label);
      this.option3.setText(question.options[2].label);
    }

    return true;
  }
}
