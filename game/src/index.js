import background1 from './assets/background1.png';
import button_play from './assets/button_play.png';
import button_instructions from './assets/button_instructions.png';
import stage1_small from './assets/stage1_small.png';
import stage2_small from './assets/stage2_small.png';
import button_back from './assets/button_back.png';
import speaker_off from './assets/speaker_off.png';
import speaker_on from './assets/speaker_on.png';
import background_music from './assets/sound_after_all.mp3';
import sound_click_tone from './assets/sound_click_tone.wav';

import Phaser from 'phaser';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage1Inner from './Stage1Inner';
import Stage2Inner from './Stage2Inner';
import StageFinish from './StageFinish';
import { createSnowflakeEmitter, preloadSnowflakes } from './functions/snowflakeEmitter';
import { showLoader } from './functions/loaderControl';

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
    showLoader(this);

    this.load.image('background1', background1);
    this.load.image('button_play', button_play);
    this.load.image('button_instructions', button_instructions);
    this.load.image('stage1_small', stage1_small);
    this.load.image('stage2_small', stage2_small);
    this.load.image('button_back', button_back);
    this.load.image('speaker_off', speaker_off);
    this.load.image('speaker_on', speaker_on);
    this.load.audio('background_music', background_music);
    this.load.audio('sound_click', sound_click_tone);
    preloadSnowflakes(this);
  }

  create ()
  {
    this.add.image(512, 350, 'background1');
    const sound_click = this.sound.add('sound_click');

    createSnowflakeEmitter(this);

    const button_play = this.add.image(512, 574, 'button_play').setInteractive();
    const button_instructions = this.add.image(212, 526, 'button_instructions').setInteractive();
    const stage1_small = this.add.image(512, 535, 'stage1_small').setInteractive().setVisible(false);
    const stage2_small = this.add.image(222, 535, 'stage2_small').setInteractive().setVisible(false);
    const button_back = this.add.image(186, 390, 'button_back').setInteractive().setVisible(false);
    const speaker = this.add.image(882, 130, this.sound.mute ? 'speaker_off' : 'speaker_on').setInteractive();

    const label = this.add.text(250, 380, 'Select a stage', this.title_style).setVisible(false);
    const instructions = this.add.text(150, 420, `
🎅 Santa will drop the NFT if you answer the quiz correctly
🖼️ select a stage 
⌚ answer the questions before time ends 
🔔 if you hit the correctly answer, add the AssetID on your wallet and click to receive the NFT 
    `, this.text_instructions_style)
    .setVisible(false)
    .setWordWrapWidth(500);

    button_play.on('pointerdown', (pointer) => {
      sound_click.play();
      button_play.setVisible(false);
      button_instructions.setVisible(false);
      stage1_small.setVisible(true);
      stage2_small.setVisible(true);
      label.setVisible(true);
      button_back.setVisible(true);
      label.setText('Select a stage');
    });

    button_instructions.on('pointerdown', (pointer) => {
      sound_click.play();
      button_play.setVisible(false);
      button_instructions.setVisible(false);
      label.setVisible(true);
      button_back.setVisible(true);
      label.setText('Instructions');
      instructions.setVisible(true);
    });

    button_back.on('pointerdown', (pointer) => {
      sound_click.play();
      button_play.setVisible(true);
      button_instructions.setVisible(true);
      stage1_small.setVisible(false);
      stage2_small.setVisible(false);
      label.setVisible(false);
      button_back.setVisible(false);
      instructions.setVisible(false);
    });

    stage1_small.on('pointerdown', (pointer) => {
      sound_click.play();
      this.scene.start('Stage1');
    });

    stage2_small.on('pointerdown', (pointer) => {
      sound_click.play();
      this.scene.start('Stage2');
    });

    speaker.on('pointerdown', (pointer) => {
      if (speaker.texture.key === 'speaker_on') {
        speaker.setTexture('speaker_off');
        this.sound.mute = true;
      } else {
        speaker.setTexture('speaker_on');
        this.sound.mute = false;
      }
    });

    if (!this.sound.get('background_music')) {
      let background_music = this.sound.add('background_music');
      this.sound.pauseOnBlur = false;
      background_music.play();
    }
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
