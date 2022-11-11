import React from 'react';
import logo from './logo.svg';
import './sass/main.scss'
import './App.css';

import { Main } from './views/Main';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers/store';
import useTimeout from './assets/hooks/useTimeout';
import { setInitialLoad } from './reducers/slice';





function App() {

  const initialLoad = useSelector((state: RootState) => state.appConfig.initialLoad)

  const dispatch = useDispatch();

  const doDispatch = ()=>dispatch(setInitialLoad(false));

  useTimeout(  doDispatch , initialLoad? 5000: 0 )

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
