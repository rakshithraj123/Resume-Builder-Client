import { configureStore,applyMiddleware, compose, } from '@reduxjs/toolkit';
import rootReducer from "../reducers/rootReducer";
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, 
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
},enhancer);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('../reducers/rootReducer', () => store.replaceReducer(rootReducer))
}

export const persistor = persistStore(store);