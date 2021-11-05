
export async function apiGetQuiz(stage, num) {
  const response = await fetch(`/api/quiz?stage=${stage}&num=${num}`)
    .then(r => r.json());

  return response;
}

export async function apiReedemToken(assetIndex) {
  const response = await fetch(`/api/transfer_asset?assetIndex=${assetIndex}`)
    .then(r => r.json());

  return response;
}
