import React from 'react';

const Docs = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[90vh] w-full lg:mt-10 px-4">
            <h1 className='text-4xl text-center tracking-tight font-bold text-slate-800 max-w-7xl sm:text-5xl md:text-6xl lg:text-8xl'>
                The Kiln Documentation
            </h1>

            <div className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Overview</h2>
                <p className="text-slate-500 mb-4">
                    Welcome to the The Kiln ecosystem documentation. Here you’ll find information on our mission, how to get started with our tools, and detailed instructions on using various features within our ecosystem.
                </p>

                <h2 className="text-2xl font-bold text-slate-800 mb-4">Getting Started</h2>
                <p className="text-slate-500 mb-4">
                    Our tools and platforms are designed to empower users to engage, create, and innovate in a decentralized world.
                </p>
                <p className="text-slate-500 mb-4">
                    The first step to joining our ecosystem is setting up a wallet that supports Klaytn, such as MetaMask. You can download MetaMask from the <a href="https://metamask.io/" className="text-blue-600 hover:underline">official website</a> and follow the setup instructions.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-2">Connecting to Klaytn</h3>
                <p className="text-slate-500 mb-4">
                    After setting up MetaMask, you’ll need to connect to the Klaytn network. To do this, open MetaMask, click on the network dropdown at the top, select “Custom RPC,” and enter the following details:
                </p>
                <ul className="list-disc pl-6 text-slate-500 mb-4">
                    <li><strong>Network Name:</strong> Klaytn Cypress</li>
                    <li><strong>New RPC URL:</strong> https://public-en-cypress.klaytn.net</li>
                    <li><strong>Chain ID:</strong> 8217</li>
                    <li><strong>Currency Symbol:</strong> KLAY</li>
                    <li><strong>Block Explorer URL:</strong> https://scope.klaytn.com</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-2">Using the NFT Minter</h3>
                <p className="text-slate-500 mb-4">
                    Our NFT Minter tool allows you to easily create NFTs on the Klaytn network. Once you’ve connected your wallet, navigate to the minting page, upload your image, input the necessary metadata (name and description), and click “Mint.” 
                    You’ll be prompted to confirm the transaction in MetaMask. Once confirmed, your NFT will be minted and viewable in your Profile tab.
                </p>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Future Developments</h3>
                <p className="text-slate-500 mb-4">
                    As we continue to develop our ecosystem, we will provide further documentation on new tools and features. These tools are designed to expand the capabilities of the Masxon platform, integrating more aspects of AI and blockchain into daily user activities.
                </p>


                <h3 className="text-xl font-semibold text-slate-800 mb-2">How do I mint an NFT?</h3>
                <p className="text-slate-500 mb-4">
                    You can mint an NFT by connecting your wallet to The Kiln platform, navigating to the NFT Minter, uploading an image, adding metadata, and confirming the transaction in MetaMask.
                </p>

            </div>
        </div>
    );
}

export default Docs;
