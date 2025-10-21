# GoodMint

![Team Logo][]

## About Me

I’m Barış Taş, a Software Engineering student at Manisa Celal Bayar University with a strong passion for Web3 technologies. My journey began with web development 
using PHP and .NET, where I built practical and user-focused applications. Over time, my curiosity for decentralized systems grew, leading 
me to explore blockchain development and smart contracts.Now, I aim to combine my traditional software experience with the transparency 
and innovation of Web3 to create projects like GoodMint, which use technology to make a real, positive impact in the world.

## Description

GoodMint is a decentralized application built on the Scroll Blockchain that rewards users for doing good in the real world. Users can record verifiable 
positive actions—such as donating blood, planting trees, cleaning the environment, or helping animal shelters—directly on the blockchain. 
Each verified action is permanently stored and earns the user Impact Tokens, which represent their contribution to society. These tokens can be used to access 
community rewards, participate in impact-based programs, or simply showcase their verified good deeds. GoodMint connects real-world 
kindness with Web3 technology, turning meaningful actions into lasting digital value.

## Vision

GoodMint aims to inspire a global movement where doing good becomes a shared habit, not an exception. 
By turning real-world positive actions into verifiable digital achievements, it encourages people to contribute to their communities and the planet. 
Every tree planted, every donation made, and every helping hand becomes part of a transparent and rewarding ecosystem. GoodMint’s vision is to build a 
future where blockchain technology empowers kindness, motivating millions to make small acts of good that together 
create a massive, lasting impact on society and the environment.

## Project Roadmao / Future Plans

Step 1: Smart Contract Design
	•	Define core variables: userAddress, actionType, verificationStatus, impactValue, impactTokenBalance.
	•	Create ImpactToken as an ERC-20 compatible token.
	•	Map verified actions to user addresses for transparency.

Step 2: Smart Contract Functions
	•	recordAction(actionType, proofURI): Logs user-submitted good deeds with proof (image/link).
	•	verifyAction(userAddress, actionID): Admin or verifier confirms authenticity.
	•	mintImpactTokens(userAddress, amount): Rewards verified users.
	•	getUserImpactData(userAddress): Returns user’s actions and total impact score.

Step 3: Access Control & Security
	•	Implement role-based verification (admin/verifier/user).
	•	Add anti-spam and proof validation mechanisms.

Step 4: Front-End Development
	•	Build a simple dApp interface (React/Next.js):
	•	User dashboard showing verified deeds and token balance.
	•	“Submit Action” and “View Proof” pages.
	•	Wallet integration (MetaMask, Scroll network).

Step 5: Testing & Deployment
	•	Test contracts using Hardhat/Foundry on Scroll testnet.
	•	Deploy verified contracts and front-end to Scroll mainnet.

## The Tech We Use

Rust & Web3 & Stellar

## Setup Environment

⚙️ Installation

1. Clone the repository
   
git clone https://github.com/username/goodmint.git
cd goodmint

2. Install dependencies

   npm install

3. Configure environment

Create a .env file and set your environment variables:
  PRIVATE_KEY=your_wallet_private_key
  SCROLL_RPC_URL=https://scroll-testnet.public.blastapi.io

4. Compile & deploy smart contracts

   npx hardhat compile
   npx hardhat run scripts/deploy.js --network scrollTestnet

5. Run the frontend

   cd frontend
   npm install  
   npm run dev

The app will be live at http://localhost:3000

🧠 Smart Contract Overview

Main functions:
	•	recordAction(actionType, proofURI)
	•	verifyAction(userAddress, actionID)
	•	mintImpactTokens(userAddress, amount)
	•	getUserImpactData(userAddress)

⸻

🪩 License

MIT License © 2025 Barış Taş
