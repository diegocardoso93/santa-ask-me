
export async function apiGetQuiz(stage, num) {
  let quiz;
  if (stage === 1) {
    quiz = {
      nft: {
        ipfs_id: 'bafkreiap4b7p34iorkv2qtgeen53ehntizzagnkq6ebz5gsaifm36rvhxe'
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
      rurl: '/reward/abcde123'
    };
  } else if (stage === 2) {
    quiz = {
      nft: {
        ipfs_id: 'bafkreia6xk7nzgnzolrci7vln6z5k72j4kpmht4ec7urwe6g2kk3aujcry'
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
      rurl: '/reward/abcde123'
    };
  }
  return new Promise((resolve, reject) => setTimeout(() => resolve(quiz), 1000));
}
