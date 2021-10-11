import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import * as sessionActions from "./store/session";
import './index.css';

import Navigation from "./components/Navigation";
import ImageList from './components/ImageList';
import ImageDetail from './components/ImageDetailModal/ImageDetail';
import AlbumImagesList from './components/AlbumList';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Navigation isLoaded={isLoaded} />
          <Switch>
            <ProtectedRoute exact path='/'>
              <ImageList />
            </ProtectedRoute>
            <ProtectedRoute path='/images/:id' exact={true}>
              <ImageDetail />
            </ProtectedRoute>
            <ProtectedRoute path='/albums/:id' exact={true}>
              <AlbumImagesList />
            </ProtectedRoute>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
