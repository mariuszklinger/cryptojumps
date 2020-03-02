import React, { useEffect, useRef, useState, useMemo } from 'react';

import Bar from './Bar';
import { ChartDataContext, ContextValue } from '../contexts/ChartDataContext';
import { NICE_NUMBERS, onWheel, ThresholdsMap, FiatRates } from '../utils/utils';

import './CountryList.scss';

function getSortedFlattedPricesMap(thresholds: ThresholdsMap | undefined): [string, number][] {
  if (!thresholds) {
    return [];
  }

  const allRatesMap: FiatRates = NICE_NUMBERS
    .reduce((arr, val) => ({ ...thresholds[val], ...arr }), {});

  const ratesArray: [string, number][] = Object
    .keys(allRatesMap)
    .map(currency => [
      currency, +allRatesMap[currency],
    ]);

  return ratesArray.sort(
    ([, value1], [, value2]) => value1 - value2
  );
}

const CountryList: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state: chartData } = React.useContext<ContextValue>(ChartDataContext);
  const [ margin, setMargin ] = useState({});
  const sortedLocalRates = useMemo(() => getSortedFlattedPricesMap(chartData.thresholds), [chartData]);

  useEffect(() => {
    const body = document.body;
    const onWheelCallback = onWheel(ref.current!, (n) => setMargin(n));

    body.addEventListener('wheel', onWheelCallback, { passive: false });

    return () => body.removeEventListener('wheel', onWheelCallback);
  }, []);

  useEffect(() => {
    console.log('margin have changed: ', margin);
  }, [margin]);

  return (
    <div ref={ref} className="country-list">
      {sortedLocalRates.map(([ currency, value ], i) => (
        <Bar
          key={currency}
          filled={100}
          currency={currency}
          value={value.toLocaleString()}
          active={margin === i}
        />
      ))}
      {/* {thresholds && NICE_NUMBERS.map(num => {
        const currencies: string[] = Object.keys(thresholds[num]);

        if (!currencies.length) {
          return null;
        }

        return (
          <div key={num}>
            {currencies.map((currency, i) => (
              <>
              {i} =
              <Bar
                key={currency}
                filled={(thresholds[num][currency] / num) * 100}
                currency={currency}
                value={(+thresholds[num][currency]).toLocaleString()}
                active={margin === i}
              />
              </>
              ))
            }
          </div>
        );
      })} */}
    </div>
   );
};

export default CountryList;
