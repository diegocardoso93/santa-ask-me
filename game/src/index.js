import Phaser from 'phaser';
import sc1 from './assets/sc1.png';
import bt_play from './assets/bt_play.png';
import bt_instructions from './assets/bt_instructions.png';
import st1_small from './assets/st1_small.png';
import st2_small from './assets/st2_small.png';
import bt_back from './assets/bt_back.png';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage1Inner from './Stage1Inner';
import Stage2Inner from './Stage2Inner';
import StageFinish from './StageFinish';
import backmusic from './assets/after_all.mp3';
import { createSnowflakeEmitter, preloadSnowflakes } from './functions/snowflakeEmitter';

class SantaAskMe extends Phaser.Scene
{
  constructor ()
  {
    super('SantaAskMe');
  }

  init()
  {
    this.title_style = {
      fontSize: '30px',
      color: '#ad0500',
      fontFamily: 'GROBOLD'
    };
    this.text_instructions_style = {
      fontSize: '24px',
      color: '#000',
      fontFamily: 'GROBOLD'
    };
  }

  preload ()
  {
    this.load.image('sc1', sc1);
    this.load.image('bt_play', bt_play);
    this.load.image('bt_instructions', bt_instructions);
    this.load.image('st1_small', st1_small);
    this.load.image('st2_small', st2_small);
    this.load.image('bt_back', bt_back);
    this.load.audio('backmusic', backmusic);
    preloadSnowflakes(this);
  }

  create ()
  {
    this.add.image(512, 350, 'sc1');

    let music = this.sound.add('backmusic');
    music.play();

    createSnowflakeEmitter(this);

    const bt_play = this.add.image(512, 574, 'bt_play').setInteractive();
    const bt_instructions = this.add.image(212, 526, 'bt_instructions').setInteractive();
    const st1_small = this.add.image(512, 535, 'st1_small').setInteractive().setVisible(false);
    const st2_small = this.add.image(222, 535, 'st2_small').setInteractive().setVisible(false);
    const bt_back = this.add.image(186, 390, 'bt_back').setInteractive().setVisible(false);

    const label = this.add.text(250, 380, 'Select a stage', this.title_style).setVisible(false);
    const instructions = this.add.text(150, 420, `
🎅 Santa will drop the NFT if you answer the quiz correctly
🖼️ select a stage 
⌚ answer the questions before time ends 
🔔 if you hit the correctly answer, add the AssetID on your wallet and click to receive the NFT 
    `, this.text_instructions_style)
    .setVisible(false)
    .setWordWrapWidth(500);

    bt_play.on('pointerdown', (pointer) => {
      bt_play.setVisible(false);
      bt_instructions.setVisible(false);
      st1_small.setVisible(true);
      st2_small.setVisible(true);
      label.setVisible(true);
      bt_back.setVisible(true);
      label.setText('Select a stage');
    });
    bt_instructions.on('pointerdown', (pointer) => {
      bt_play.setVisible(false);
      bt_instructions.setVisible(false);
      label.setVisible(true);
      bt_back.setVisible(true);
      label.setText('Instructions');
      instructions.setVisible(true);
    });
    bt_back.on('pointerdown', (pointer) => {
      bt_play.setVisible(true);
      bt_instructions.setVisible(true);
      st1_small.setVisible(false);
      st2_small.setVisible(false);
      label.setVisible(false);
      bt_back.setVisible(false);
      instructions.setVisible(false);
    });
    st1_small.on('pointerdown', (pointer) => {
      this.scene.start('Stage1');
    });
    st2_small.on('pointerdown', (pointer) => {
      this.scene.start('Stage2');
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 700,
  scene: [SantaAskMe, Stage1, Stage2, Stage1Inner, Stage2Inner, StageFinish],
  backgroundColor: '#ffffff'
};

const game = new Phaser.Game(config);
