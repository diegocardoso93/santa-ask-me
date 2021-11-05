# Santa Ask Me
### 🎅 Santa will drop the NFT if you answer the quiz correctly
Santa Ask Me is a browser game with Christmas-themed NFT ASA rewards quiz mechanics. 
The questions are related to the NFT you are trying to earn. 
Initially, NFTs will be things and animals. 
The art of NFTs will be 16bpp pixelized with 128x128bits resolution, hosted on IPFS. 
The total supply amount of each ASA token per quiz will be 100. 
In the game, you will need to choose a door that will give you access to the challenge. 
Each question has 10 seconds timeout to answer. 
In the end, the asset ID will appear to the player, and after being added and clicked on receive, the token will be transferred. 
To hit and win you will need a mix of knowledge and luck. 

## Setup
Create and update the quizzes on file `quizzes.json`.  
Configure the environment variables:
```
WALLET_MNEMONIC=
PURESTAKE_API_KEY=
ENVIRONMENT=
PORT=
```
`WALLET_MNEMONIC` is the wallet that created the ASAs  
`PURESTAKE_API_KEY` you can get one at https://developer.purestake.io  
`ENVIRONMENT` should be `mainnet` or `testnet`  
`PORT` eg. 3000

## Build the game app
```
npm run build
```
## Start application
```
npm i
npm start
```
<sub>Almost all images are from https://www.freepik.com</sub>.   
<sub>Sounds are from https://itch.io packs</sub>.
