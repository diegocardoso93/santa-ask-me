const algosdk = require('algosdk');
const express = require("express");

const token = { 'X-API-key' : process.env.PURESTAKE_API_KEY }
const mnemonic = process.env.WALLET_MNEMONIC;
const apiBase = process.env.ENVIRONMENT === 'mainnet' ? 'mainnet-algorand' : 'testnet-algorand';
const indexerClient = new algosdk.Indexer(token, `https://${apiBase}.api.purestake.io/idx2`, '');
const algodClient = new algosdk.Algodv2(token, `https://${apiBase}.api.purestake.io/ps2`, '');

const app = express();

app.use('/', express.static(__dirname + '/game/dist'));

app.listen(process.env.PORT, () => {
 console.log(`Server running on port ${process.env.PORT}`);
});

app.get("/api/transfer_asset", (req, res, next) => {
  (async() => {
    const assetIndex = +req.query.assetIndex;
    const info = await indexerClient.searchForTransactions().assetID(assetIndex).do();
    const transactions = info['transactions'];
    let countSent = 0;
    for (transaction of transactions) {
      if (transaction['tx-type'] === 'axfer' && transaction['sender'] === transaction['asset-transfer-transaction']['receiver']) {
        const account = transaction['sender'];
        if (!assetAlreadySent(transactions, account)) {
          try {
            await assetSend(assetIndex, account);
            countSent++;
          } catch(e) {
            console.log(e);
          };
        }
      }
    }
    res.json({ message: countSent === 0 ? 'Already sent or invalid configured asset id' : 'success' });
  })().catch(e => {
    console.log(e);
  });
});


app.get("/api/quiz", (req, res, next) => {
  const json = require(__dirname + '/quizzes.json');
  const qres = json.find(j => j.stage == (req.query.stage || 1));
  const quiz = qres['quizzes'][req.query.num || 0];
  res.json(quiz);
});


function assetAlreadySent(transactions, account) {
  for (transaction of transactions) {
    if (
      transaction['tx-type'] === 'axfer' &&
      account === transaction['asset-transfer-transaction']['receiver'] &&
      transaction['asset-transfer-transaction']['amount'] === 1
    ) {
      return true;
    }
  }
  return false;
}

async function assetSend(assetIndex, account) {
  await delayMs(1000);
  let suggestedParams = await algodClient.getTransactionParams().do();

  const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);

  let transactionOptions = {
    from: recoveredAccount.addr,
    to: account,
    amount: 1,
    assetIndex,
    suggestedParams
  };

  await delayMs(1000);

  const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(transactionOptions);

  const signedTxn = txn.signTxn(recoveredAccount.sk);
  let sendTx = await algodClient.sendRawTransaction(signedTxn).do();
  console.log("Transaction: " + sendTx.txId);
}

async function delayMs(ms) {
  return new Promise((res, rej) => setTimeout(res(), ms));
}
