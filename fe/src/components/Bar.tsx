import React, { useEffect, useState } from 'react';
import 'flag-icon-css/sass/flag-icon.scss';

import './Bar.scss';
import { getCurrencyInfo } from '../utils/utils';

export interface Props {
  filled: number;
  currency: string;
  value: string;
}

export default function Bar({ filled, currency, value }: Props){
  // const [style, setStyle] = useState({});

  const currencyInfo = getCurrencyInfo(currency);

  // useEffect(() => {
  //   setTimeout(() => setStyle({
  //     width: `${filled}%`,
  //     transitionDuration: '1.5s',
  //     transitionDelay: '0.5s',
  //     transitionProperty: 'width',
  //   }), 1000);
  // });

  return (
    <div className='bar-root'>
      {/* <div className='bar' style={style}></div> */}
      <span className={`flag-icon flag-icon-${currencyInfo.code.toLowerCase()}`}></span>
      &nbsp;
      {currency}: {value}
      <div className='currency-info'>
        {currencyInfo.country || 'Unknown'}
        &nbsp;(population: {currencyInfo.population || 'Unknown'})
      </div>
    </div>
  );
}