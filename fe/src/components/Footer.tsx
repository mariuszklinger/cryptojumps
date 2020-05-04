import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="footer-root">
      <span>
        Powered by <a href="https://www.coindesk.com/price/bitcoin" target="_blank" rel="noopener noreferrer">CoinDesk</a> &amp; <a href="https://openexchangerates.org" target="_blank" rel="noopener noreferrer"> openexchangerates.org</a>
      </span>
    </div>
   );
};

export default Footer;
