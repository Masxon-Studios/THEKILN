import React from 'react';

const Blog = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-[90vh] w-full lg:mt-20 px-4">
            <h1 className='text-4xl text-center tracking-tight font-bold text-slate-800 max-w-7xl sm:text-5xl md:text-6xl lg:text-8xl'>
                The Kiln Tutorial
            </h1>

            <div className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Easy NFT Minting with Masxon</h2>
                
                <div className="video-container mb-4">
                    <iframe
                        title="The Kiln NFT Minting Tutorial"
                        width="100%"
                        height="315"
                        src={`https://gateway.pinata.cloud/ipfs/QmYLTyUg7qAA3rWSgn3GWSsvC6e7kbw9jYaiW5keP8q8ZU`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <p className="text-slate-500 mb-4">
                    Minting NFTs with The Kiln is easy and straightforward. Here's a quick guide on how to sign in with your MetaMask wallet, navigate to the minter, and mint your very first NFT.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-2">Step 1: Sign in with MetaMask</h3>
                <p className="text-slate-500 mb-4">
                    Ensure that you have MetaMask installed on your browser. If not, you can download it from the <a href="https://metamask.io/" className="text-blue-600 hover:underline">official MetaMask website</a>.
                    After installation, click on the MetaMask extension in your browser, and log in or create a new account if you don’t already have one.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-2">Step 2: Navigate to the Minter</h3>
                <p className="text-slate-500 mb-4">
                    You can access The Kiln NFT Minter through the navigation bar. Simply click on the “Mint” button, which will direct you to the minting page.
                    You can also navigate to the minter from the home page by clicking on the Mint button under our main banner.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-2">Step 3: Upload Image, Name, and Description</h3>
                <p className="text-slate-500 mb-4">
                    Once on the minting page, you can upload the image that you want to mint as an NFT. After uploading, enter the name and description for your NFT. 
                    These will be used as metadata associated with your NFT.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-2">Step 4: Mint Your NFT</h3>
                <p className="text-slate-500 mb-4">
                    Click on the "Mint NFT" button. MetaMask will prompt you to confirm the transaction. After confirming, your NFT will be minted and added to your account.
                    You’ll receive a confirmation once the minting is complete.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-2">Step 5: View Your NFT on OpenSea</h3>
                <p className="text-slate-500 mb-4">
                    To view your minted NFT, go to your Profile by clicking on the Profile tab, you can also sell them at <a href="https://opensea.io/" className="text-blue-600 hover:underline">OpenSea</a>, click on your profile in the top right, 
                    and select "Hidden" from the dropdown. Here you’ll see the NFT you’ve just minted. Congratulations!
                </p>
            </div>
        </div>
    );
}

export default Blog;
