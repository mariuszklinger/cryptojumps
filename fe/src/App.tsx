import React from 'react';

import Footer from './components/Footer';
import Chart from './components/Chart';
import CountryList from './components/CountryList';

import { ChartDataContext } from './contexts/ChartDataContext';

import 'typeface-poppins';
import 'core-js/features/array/find';
import './App.scss';

const App: React.FC = () => {
  const { state, dispatch } = React.useContext<any>(ChartDataContext);

  return (
    <div className="root">
      <h1 className='root-header'>
      1₿itcoin = ...
      </h1>

      <div className='root-lead'>
        Check where local currency units will be soon nice and round for 1 BTC

        {/* {state &&
          <pre>
            last rates update: {state.lastUpdateBTC} <br />
            prices assuming BTC/USD: <b>{state.btcusd}</b> <br />
            last fiats rates update: {state.lastUpdateFiats} <br />
            feel free to post feature request & fork at <a href="https://github.com/mariuszklinger/cryptojumps" target="_blank">github.com</a>
          </pre>
        } */}
      </div>

      <main>
        <CountryList data={state.thresholds} />
        <Chart />
      </main>

      <Footer />
    </div>
   );
};

export default App;
