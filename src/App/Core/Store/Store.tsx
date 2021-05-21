import {
  combineReducers,
  createStore
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { customerDetailsFormStepsReducer } from './Reducers';

const initialState = {};

const reducers = combineReducers(
  {
    customerDetailsFormStepsState: customerDetailsFormStepsReducer
  }
);

export const Store =  process.env.NODE_ENV !== 'production' ? createStore(
  reducers,
  initialState,
  composeWithDevTools()
) : createStore(
  reducers,
  initialState
);

