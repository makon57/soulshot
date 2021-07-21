import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ImageInput from './components/ImageInput';
import ImageList from './components/ImageList';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <ImageList />
          </Route>
          <Route exact path='/images/create'>
            <ImageInput />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
