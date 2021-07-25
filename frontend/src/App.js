import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import ImageList from './components/ImageList';
import ImageDetail from './components/ImageDetailModal/ImageDetail';
import AlbumImagesList from './components/AlbumList';

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
          <Route path='/images/:id'>
            <ImageDetail />
          </Route>
          <Route path='/albums/:id'>
            <AlbumImagesList />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
