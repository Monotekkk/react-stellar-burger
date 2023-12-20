export const getMessages = store => store.chat.messages || [];
export const getUser = store => store.user;
export const getWsConnected = state => state.chat.wsConnected;