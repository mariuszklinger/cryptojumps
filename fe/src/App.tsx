import React, { useEffect, useState } from 'react';
import Bar from './components/Bar';
import { init, NICE_NUMBERS } from './utils/utils';
import './App.css';

import 'core-js/features/array/find';

const App: React.FC = () => {

  const [state, setState] = useState(null as any);

  useEffect(() => {
    init().then(setState)
  }, []);

  return (
    <div className="root">
      <h1 className='root-header'>
      1₿ = ...
      </h1>

      <div className='root-lead'>
        Check where local currency units will be soon nice and round for 1 BTC

        {state &&
          <pre>
            last rates update: {state.lastUpdate} <br />
            prices assuming BTC/USD: <b>{state.btcusd}</b> <br />
            feel free to post feature request & fork at <a href="https://github.com/mariuszklinger/cryptojumps">github.com</a>
          </pre>
        }
      </div>
      {state && NICE_NUMBERS.map(num => <>
        <h1>{num.toLocaleString()}</h1>

        {!!state[num] &&
          Object
            .keys(state[num])
            .map((currency) => (
              <Bar
                filled={(state[num][currency] / num) * 100}
                currency={currency}
                value={(+state[num][currency]).toLocaleString()}
              />
            ))
        }
      </>
      )}
    </div>
   );
};

export default App;
