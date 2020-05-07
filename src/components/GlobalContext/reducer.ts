import { IGlobalReducerAction, IGlobalState } from './types';

export default (state: IGlobalState, action: IGlobalReducerAction) => {
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
