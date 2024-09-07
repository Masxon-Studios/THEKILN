import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Save the event for later use
            setDeferredPrompt(e);
        });
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-[90vh] w-full lg:-mt-10">
            <h1 className='text-4xl text-center tracking-tight font-bold text-slate-800 max-w-7xl sm:text-5xl md:text-6xl lg:text-8xl'>
                The Kiln
            </h1>
            <p className='text-center max-w-4xl mt-4 text-slate-500'>
                NFT Minter
            </p>

            {/* CTA buttons */}
            <div className='flex flex-col sm:flex-row gap-4 mt-8 px-4 w-full justify-center'>
                <Link
                    to='/mint'
                    className='inline-flex items-center justify-center w-full sm:w-fit px-10 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900'
                >
                    Mint
                </Link>
                <Link
                    to='/profile'
                    className='inline-flex items-center justify-center w-full sm:w-fit px-10 py-3 border border-transparent text-base font-medium rounded-md text-slate-700 bg-slate-200 hover:bg-slate-300'
                >
                    Profile
                </Link>   
            </div>
            
            {/* Install App button */}
            <div className='mt-8 w-full flex justify-center px-4'>
                <button
                    onClick={handleInstallClick}
                    className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700'
                >
                    Install The Kiln App
                </button>
            </div>
            </div>
    );
}

export default Home;
