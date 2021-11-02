import { createNextQuestion } from "./quiz";

export default function countdown(ctx) {
  const countdown_style = {
    fontSize: '48px',
    color: 'black',
    fontFamily: 'GROBOLD'
  }
  ctx.timer = 10;
  const timer_props = {
    delay: 1000,
    callback: () => {
      countdown.setText(`⌚ ${--ctx.timer}`);
      if (ctx.timer < 0) {
        ctx.timer = 10;
        ctx.currentIndex = ctx.data.quiz.questions.length;
        ctx.result = false;
        createNextQuestion(ctx);
      }
    },
    loop: true,
    startAt: 0
  };
  const countdown = ctx.add.text(130, 260, `⌚ ${ctx.timer}`, countdown_style).setWordWrapWidth(300);

  const tx = ctx.time.addEvent(timer_props);

  ctx.resetTimer = () => {
    ctx.timer = 10;
    countdown.setText(`⌚ ${ctx.timer}`);
    tx.reset(timer_props);
  }
}
