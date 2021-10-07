import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import * as sessionActions from "./store/session";
import './index.css';

import Navigation from "./components/Navigation";
import ImageList from './components/ImageList';
import ImageDetail from './components/ImageDetailModal/ImageDetail';
import AlbumImagesList from './components/AlbumList';
import Footer from './components/Footer';
import Splash from './components/Splash';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div id='wrapper'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/splash' exact={true}>
            <Splash />
          </Route>
          <ProtectedRoute exact path='/' >
            <ImageList />
          </ProtectedRoute>
          <ProtectedRoute path='/images/:id' exact={true}>
            <ImageDetail />
          </ProtectedRoute>
          <ProtectedRoute path='/albums/:id' exact={true}>
            <AlbumImagesList />
          </ProtectedRoute>
        </Switch>
      )}
      <Footer />
      </div>
    </>
  );
}

export default App;
