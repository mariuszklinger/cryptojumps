import React, { useEffect, useRef } from 'react';

import Bar from './Bar';
import { ChartDataContext } from '../contexts/ChartDataContext';
import { NICE_NUMBERS, onWheel } from '../utils/utils';

import './CountryList.scss';

const CountryList: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { state: chartData, dispatch } = React.useContext<any>(ChartDataContext);

  useEffect(() => {
    const body = document.body;
    const onWheelCallback = onWheel(ref.current!);

    body.addEventListener('wheel', onWheelCallback, { passive: false });

    return () => body.removeEventListener('wheel', onWheel(ref.current!));
  }, []);

  const { thresholds } = chartData;

  return (
    <div ref={ref} className="country-list">
      {thresholds && NICE_NUMBERS.map(num => {
        if (!Object.keys(thresholds[num]).length) {
          return null;
        }

        return (
          <div key={num}>
            <h1>{num.toLocaleString()}</h1>

            {!!thresholds[num] &&
              Object
                .keys(thresholds[num])
                .map((currency) => (
                  <Bar
                    key={currency}
                    filled={(thresholds[num][currency] / num) * 100}
                    currency={currency}
                    value={(+thresholds[num][currency]).toLocaleString()}
                  />
                ))
            }
          </div>
        );
      })}
    </div>
   );
};

export default CountryList;
