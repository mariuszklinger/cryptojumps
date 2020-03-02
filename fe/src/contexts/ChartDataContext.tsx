import React, { useEffect } from "react";
import { init, ChartData } from "../utils/utils";

export interface ContextValue {
  state: ChartData,
  dispatch: React.Dispatch<any>,
}

const INIT_STATE: ChartData = {} as any;

const ChartDataContext = React.createContext({ state: INIT_STATE } as ContextValue);

const reducer = (_: ChartData, action: any): ChartData => {
  switch (action.type) {
    case "reset":
      return INIT_STATE;
    default:
      return action.value;
  }
};

function ChartDataContextProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, INIT_STATE);

  const value = {
    state,
    dispatch
  };

  useEffect(() => {
    init().then((data) => {
      dispatch({ action: 'SET', value: data });
    })
  }, []);

  return (
    <ChartDataContext.Provider value={value}>
      {props.children}
    </ChartDataContext.Provider>
  );
}

const ContextOneConsumer = ChartDataContext.Consumer;

export { ChartDataContext, ChartDataContextProvider, ContextOneConsumer };

