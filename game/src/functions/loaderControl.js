
export function showLoader(ctx) {
  ctx.load.on('progress', () => {
    document.querySelector('#loader').style.display = 'block';
  });

  ctx.load.on('complete', () => {
    document.querySelector('#loader').style.display = 'none';
  });
}
