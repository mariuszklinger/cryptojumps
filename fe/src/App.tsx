import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import Bar from './components/Bar';
import { init, NICE_NUMBERS } from './utils/utils';

import 'typeface-poppins';
import './App.scss';

import 'core-js/features/array/find';
import Footer from './components/Footer';

const App: React.FC = () => {

  const [state, setState] = useState(null as any);

  useEffect(() => {
    init().then(setState);
  }, []);

  return (
    <div className="root">
      <div className='root-lead'>
        Check where local currency units will be soon nice and round for 1 BTC
      </div>

      <h1 className='root-header'>
        1&nbsp;Bitcoin
      </h1>

      <div className="cols-container">
        {state && NICE_NUMBERS.map(num => {
          if (!Object.keys(state[num]).length) {
            return null;
          }

          return (
            <div className="col">
              <FadeIn key={num}>
                <h1>
                  <span className="pre-threshold">
                    is&nbsp;almost
                  </span>
                  <br />

                  {num.toLocaleString()}
                </h1>

                <FadeIn delay={150}>
                  {!!state[num] &&
                    Object
                    .keys(state[num])
                    .map((currency) => (
                      <Bar
                      key={currency}
                      filled={(state[num][currency] / num) * 100}
                      currency={currency}
                      value={(Math.round(+state[num][currency])).toLocaleString()}
                      />
                      ))
                    }
                </FadeIn>
              </FadeIn>
            </div>
          );
        })}
      </div>

      {state &&
        <pre>
          last rates update: {state.lastUpdateBTC} <br />
          prices assuming BTC/USD: <b>{state.btcusd}</b> <br />
          last fiats rates update: {state.lastUpdateFiats} <br />
          feel free to post feature request & fork at <a href="https://github.com/mariuszklinger/cryptojumps">github.com</a>
        </pre>
      }

      <Footer />
    </div>
   );
};

export default App;
