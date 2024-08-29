# The Kiln: Decentralized NFT Minting on Klaytn

![The Kiln Logo](/public/logo192.png)

The Kiln is a simple, decentralized NFT minting platform built specifically for the Klaytn blockchain. It empowers creators and collectors to mint any image into an NFT.

🚀 Features
🔗 Multi-Wallet Integration: Seamless connection with Kaikas and MetaMask wallets.
🖼️ User-Friendly Minting: Intuitive interface for uploading media and minting NFTs.
⛽ Real-Time Gas Estimation: Accurate gas fee predictions before minting.
🌐 IPFS Integration: Reliable, decentralized storage for NFT metadata and assets via Pinata.
🎥 Demo Video
Watch the demo video

🛠️ Getting Started
Prerequisites
Node.js (v14 or higher)
npm (v6 or higher)
Git
MetaMask or Kaikas wallet browser extension
Installation
Clone the repository:
[https://github.com/Masxon-Studios/THEKILN.git]
cd THEKILN
Install dependencies: bash npm install

Set up environment variables: Create a .env file in the root directory with the following: text REACT_APP_PINATA_API_KEY=your_pinata_api_key REACT_APP_PINATA_SECRET_API_KEY=your_pinata_secret_key REACT_APP_PINATA_GATEWAY=https://your_custom_gateway.pinata.cloud REACT_APP_KLAYTN_NODE_URL=https://api.baobab.klaytn.net:8651

Update contract address: In src/contractConfig.js, set your deployed contract address: javascript const contractAddress = '0xYourContractAddress';

🖥️ Usage Start the development server: bash npm start

Open your browser and navigate to http://localhost:3000. Connect your wallet (Kaikas or MetaMask). Upload your NFT image and enter metadata. Click "Mint NFT" to create your unique token on Klaytn. 📄 License This project is licensed under the MIT License - see the LICENSE file for details. 🙏 Acknowledgments Klaytn - For providing the blockchain platform and tools Pinata - For IPFS file storage solutions Hardhat - For the robust development environment React - For powering our front-end

Masxon Studios Project Link: https://github.com/Masxon-Studios/klaytn-nft-minter.git
