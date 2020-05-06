import { Reducer } from 'react';
import { IGlobalReducerAction, IGlobalState } from './types';

const GlobalReducer: Reducer<IGlobalState, IGlobalReducerAction> = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case 'SET_GLOBAL_TITLE':
      return {
        ...state,
        getters: {
          ...state.getters,
          documentTitle: action.payload,
        },
      };
    case 'SET_DASHBOARD_TITLE':
      return {
        ...state,
        getters: {
          ...state.getters,
          dashBoardTitle: action.payload,
        },
      };
  }
};

export default GlobalReducer;
