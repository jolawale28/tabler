// store.ts
import { create } from 'zustand';

interface UserObj {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  password: string
}

interface sessionObject { // Structure for session object
  user: UserObj,
  token: string,
  loggedIn: boolean
}

interface State {
  session: sessionObject;
  updateSession: (newSession: sessionObject) => void;
  resetSession: () => void;
}

const useStore = create<State>(set => ({
  session: {
    user: {
      id: 0,
      firstName: '',
      lastName: '',
      role: '',
      password: ''
    },
    token: '',
    loggedIn: false
  },
  updateSession: (newSession) => {
    set(state => ({ session: { ...state.session, ...newSession } }));
  },
  resetSession: () => set({ session: { user: { id: 0, firstName: '', lastName: '', role: '', password: '' }, token: '', loggedIn: false } }),
}));

export default useStore;