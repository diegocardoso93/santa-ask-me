
export default function colorTween(ctx, target, duration = 1000, colorFrom = '#ffffff', colorTo = '#33eeee') {
  ctx.tweens.addCounter({
    from: 0,
    to: 100,
    duration: duration,
    ease: Phaser.Math.Easing.Sine.InOut,
    repeat: -1,
    yoyo: true,
    onUpdate: tween => {
      const value = tween.getValue();
      const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
        Phaser.Display.Color.ValueToColor(colorFrom),
        Phaser.Display.Color.ValueToColor(colorTo),
        100,
        value
      );
      const color = Phaser.Display.Color.GetColor(colorObject.r, colorObject.g, colorObject.b);
      target.setTint(color);
    }
  });
}
