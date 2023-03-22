import React from 'react';
import Collapsible from 'react-collapsible';

const Faq = () => {
    return (
        <div className='faq_wrapper'>
            <div className="faq_container">
                <h2>FAQS</h2>
                <Collapsible trigger="How do you buy/mint an NFT?">
                    <ol>
                        <p> <span className='numbers'>1</span>. You need a crypto wallet <span className='numbers'>(</span>where you can buy,send, receive crypto and store your NFTs<span className='numbers'>)</span> such as MetaMask</p>
                        <p><span className='numbers'>2</span>. Booby Birds can only be bought with Ethereum crypto so you will need to buy Ethereum crypto first.</p>
                        <p><span className='numbers'>3</span>. You can buy ETH through in the same MetaMask app!</p>
                        <p><span className='numbers'>4</span>. On the day of launch, you will be able to click the buy/mint page on our website which will connect your wallet and now you can click “Mint” your Booby Bird NFT! <span className='numbers'>:)</span></p>
                        
                    </ol>
                </Collapsible>
                <Collapsible trigger="What's the utility of a Booby Bird?">
                    <p>
                    In a nutshell: your Booby Bird is a lifetime ticket into our virtual theme park in the Meta Verse <span className='numbers'>&</span> an exclusive secret member invite to the Booby Bonfire Games. Your Booby Bird includes commercial rights, <span className='numbers'>& 10% </span>of the NFT will go into supporting important causes (Murph’s Life Foundation <span className='numbers'>&</span> Breast Cancer nonprofit)
                    </p>
                </Collapsible>
                <Collapsible trigger="Wen BUY/MINT?">
                    <p>
                    Soon! Specific date will be announced closer to mint date. 
                    </p>
                </Collapsible>
                <Collapsible trigger="What's the buy/mint price">
                    <p>
                    <span className='numbers'>.07</span> for WL <span className='numbers'>& 0.8</span> for public
                    </p>
                </Collapsible>
                <Collapsible trigger="Where’s the party until launch date?">
                    <p>
                    Did you see our videos dancing on the street wearing our Booby Birds costume<span className='numbers'>?</span> Plus, we got weekly competitions on our Discord with cash giveaways <span className='numbers'>&</span> fun interactions with our founder on Tik Tok and Instagram <span className='numbers'>;)</span>
                    </p>
                </Collapsible>
            </div>


        </div>
    )
}

export default Faq