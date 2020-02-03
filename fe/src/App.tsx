import React, { useEffect, useState } from 'react';

import Footer from './components/Footer';
import Chart from './components/Chart';

import { init } from './utils/utils';

import 'typeface-poppins';
import 'core-js/features/array/find';
import './App.scss';
import CountryList from './components/CountryList';

const App: React.FC = () => {

  const [state, setState] = useState(null as any);

  useEffect(() => {
    init().then(setState)
  }, []);

  return (
    <div className="root">
      <h1 className='root-header'>
      1₿itcoin = ...
      </h1>

      <div className='root-lead'>
        Check where local currency units will be soon nice and round for 1 BTC

        {state &&
          <pre>
            last rates update: {state.lastUpdateBTC} <br />
            prices assuming BTC/USD: <b>{state.btcusd}</b> <br />
            last fiats rates update: {state.lastUpdateFiats} <br />
            feel free to post feature request & fork at <a href="https://github.com/mariuszklinger/cryptojumps">github.com</a>
          </pre>
        }
      </div>

      <main>
        <CountryList data={state} />
        <Chart />
      </main>

      <Footer />
    </div>
   );
};

export default App;
