

export const getMessages = store => store.wsReducer.messages || [];
export const getUser = store => store.user;
export const getWsConnected = state => state.wsReducer.wsConnected;
export const getLoading = store => store.wsReducer.loading;