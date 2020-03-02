import React from 'react';
import 'flag-icon-css/sass/flag-icon.scss';

import './Bar.scss';
import { getCurrencyInfo } from '../utils/utils';
import { RADIUS_WIDTH } from './Chart';

export interface Props {
  active: boolean;
  currency: string;
  filled: number;
  value: string;
}

export default function Bar({ active, filled, currency, value }: Props){
  const currencyInfo = getCurrencyInfo(currency);

  const style = {
    height: `${RADIUS_WIDTH}px`,
    ...(active && {
      backgroundColor: 'red'
    }),
    // lineHeight: `${RADIUS_WIDTH}px`,
  }

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