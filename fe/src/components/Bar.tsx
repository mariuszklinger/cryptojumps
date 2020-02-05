import React, { useEffect, useState } from 'react';
import 'flag-icon-css/sass/flag-icon.scss';

import './Bar.scss';
import { getCurrencyInfo } from '../utils/utils';
import { RADIUS_WIDTH } from './Chart';

export interface Props {
  filled: number;
  currency: string;
  value: string;
}

const style = {
  height: `${RADIUS_WIDTH}px`,
  // lineHeight: `${RADIUS_WIDTH}px`,
}

export default function Bar({ filled, currency, value }: Props){
  const currencyInfo = getCurrencyInfo(currency);

  return (
    <div className='bar-root' style={style}>
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