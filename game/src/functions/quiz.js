export function updateResponse(ctx, idx) {
  ctx.result &= (idx < 0) ? false :
    ctx.currentQuestion.options
      .find(o => o.label === ctx.currentQuestion.options[idx].label)
      .anwser;

  ctx.current_question++;
  createNextQuestion(ctx, ctx.current_question);
}

export function createNextQuestion(ctx, idx) {
  if (ctx.current_question === ctx.quiz.questions.length) {
    ctx.scene.start('StageFinish', { win: ctx.result, stage: ctx.stage, asset_id: ctx.quiz.nft.asset_id });
    return false;
  }

  const question = ctx.quiz.questions[ctx.current_question];
  ctx.currentQuestion = question;
  ctx.resetTimer();

  if (!idx) {
    ctx.title = ctx.add.text(110, 110, question.title, ctx.question_title_style).setWordWrapWidth(900);

    ctx.option1 = ctx.add.text(400, 274, question.options[0].label, ctx.option_text_style).setWordWrapWidth(200);
    ctx.option2 = ctx.add.text(400, 394, question.options[1].label, ctx.option_text_style).setWordWrapWidth(200);
    ctx.option3 = ctx.add.text(400, 514, question.options[2].label, ctx.option_text_style).setWordWrapWidth(200);
  } else {
    ctx.title.setText(question.title);
    ctx.option1.setText(question.options[0].label);
    ctx.option2.setText(question.options[1].label);
    ctx.option3.setText(question.options[2].label);
  }

  return true;
}
