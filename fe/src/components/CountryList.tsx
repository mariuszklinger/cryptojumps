import React from 'react';

import Bar from './Bar';

import { NICE_NUMBERS } from '../utils/utils';

import './CountryList.scss';

interface Props {
  data: any;
}

const CountryList: React.FC<Props> = ({ data }: Props) => {

  return (
    <div className="country-list">
      {data && NICE_NUMBERS.map(num => {
        if (!Object.keys(data[num]).length) {
          return null;
        }

        return (
          <div key={num}>
            <h1>{num.toLocaleString()}</h1>

            {!!data[num] &&
              Object
                .keys(data[num])
                .map((currency) => (
                  <Bar
                    key={currency}
                    filled={(data[num][currency] / num) * 100}
                    currency={currency}
                    value={(+data[num][currency]).toLocaleString()}
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
