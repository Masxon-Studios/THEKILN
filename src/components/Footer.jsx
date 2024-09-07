import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="text-lg font-bold">The Kiln</h3>
                    <p className="text-slate-400 mt-2">Klaytn NFT Minter</p>
                </div>
                <div className="flex space-x-4">
                    <a href="/" className="text-slate-400 hover:text-white">Home</a>
                    <a href="/mint" className="text-slate-400 hover:text-white">Mint</a>
                    <a href="/profile" className="text-slate-400 hover:text-white">Profile</a>
                    <a href="/docs" className="text-slate-400 hover:text-white">Docs</a>
                    <a href="/tutorial" className="text-slate-400 hover:text-white">Tutorial</a>
                    <a href="/contact" className="text-slate-400 hover:text-white">Contact</a>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://github.com/Masxon-Studios" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 .296c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.416-4.042-1.416-.546-1.387-1.332-1.757-1.332-1.757-1.087-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.333-5.467-5.932 0-1.311.469-2.382 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.005-.404 1.022.005 2.048.138 3.006.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.653.242 2.873.118 3.176.77.838 1.235 1.909 1.235 3.22 0 4.61-2.807 5.625-5.48 5.921.43.372.824 1.104.824 2.222 0 1.605-.015 2.896-.015 3.293 0 .321.216.694.825.576 4.765-1.587 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/gregory-dixon-474986262/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M19.002 3h-14.002c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14.002c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-11.003 15h-2v-8h2v8zm-1-9c-.692 0-1.25-.558-1.25-1.25s.558-1.25 1.25-1.25c.691 0 1.25.558 1.25 1.25s-.559 1.25-1.25 1.25zm12.003 9h-2v-3.973c0-1.909-2-1.762-2 0v3.973h-2v-8h2v1.09c.857-1.59 4-1.713 4 1.523v5.387z" />
                        </svg>
                    </a>
                    <a href="https://discord.gg/sf2GgKTang" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M20.317 4.3698c-1.5083-0.6783-3.1167-1.1695-4.7727-1.4432-0.2112 0.3753-0.4492 0.8648-0.6123 1.2495-1.766-0.2643-3.5343-0.2643-5.303 0-0.1632-0.3932-0.401-0.8742-0.6123-1.2495-1.656 0.2737-3.2643 0.7649-4.7727 1.4432-2.9935 4.3565-3.8113 8.5645-3.4201 12.7065 1.8883 1.398 3.7237 2.2485 5.5353 2.7938 0.4492-0.6123 0.8493-1.2495 1.2018-1.912-0.6637-0.2518-1.3043-0.582-1.9005-0.9807 0.1632-0.1227 0.3267-0.2455 0.4955-0.3683 3.7485 1.5703 7.79 1.5703 11.4857 0 0.1688 0.1228 0.3267 0.2457 0.4955 0.3683-0.6123 0.3987-1.2528 0.7288-1.9167 0.9807 0.3525 0.6625 0.7527 1.2997 1.2018 1.912 1.8117-0.5453 3.6467-1.3957 5.5353-2.7938 0.466-4.8305-0.752-9.0385-3.4202-12.7065zm-11.4978 9.4855c-1.0477 0-1.9038-0.9608-1.9038-2.1378s0.8435-2.1378 1.9038-2.1378c1.0678 0 1.9172 0.9608 1.9038 2.1378 0 1.177-0.8435 2.1378-1.9038 2.1378zm7.6825 0c-1.0477 0-1.9038-0.9608-1.9038-2.1378s0.8435-2.1378 1.9038-2.1378c1.0678 0 1.9172 0.9608 1.9038 2.1378 0 1.177-0.8435 2.1378-1.9038 2.1378z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
