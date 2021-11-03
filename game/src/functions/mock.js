
export async function apiGetQuiz(stage, num) {
  let quiz;
  if (stage === 1) {
    quiz = {
      nft: {
        ipfs_id: 'bafkreigpvbmhyoviydp5zt2rbgf45p5ea3tzgjfbpkwlcufbavs6njxq5i',
        asset_id: 12345678
      },
      questions: [{
        title: 'What animal is that?',
        options: [{
          label: 'Frog',
          anwser: false
        }, {
          label: 'Lizard',
          anwser: true
        }, {
          label: 'Salamander',
          anwser: false
        }]
      }, {
        title: 'Where he lives?',
        options: [{
          label: 'Water',
          anwser: false
        }, {
          label: 'Tree',
          anwser: false
        }, {
          label: 'Eye',
          anwser: true
        }]
      }, {
        title: 'What is your medium life period?',
        options: [{
          label: '< 1 year',
          anwser: false
        }, {
          label: '< 10 year',
          anwser: true
        }, {
          label: '< 100 year',
          anwser: false
        }]
      }],
    };
  } else if (stage === 2) {
    quiz = {
      nft: {
        ipfs_id: 'bafkreidwp7ugvtpad72ijl4qbsal7tx4cndtqh4v3o5i6ifq7biqbjuo4a',
        asset_id: 12345678
      },
      questions: [{
        title: 'What car is that?',
        options: [{
          label: 'Bugatti Veyron',
          anwser: true
        }, {
          label: 'McLaren Speedtail',
          anwser: false
        }, {
          label: 'Saleen S7',
          anwser: false
        }]
      }],
    };
  }
  return new Promise((resolve, reject) => setTimeout(() => resolve(quiz), 1000));
}
