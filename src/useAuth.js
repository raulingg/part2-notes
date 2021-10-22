import { useState, useContext, createContext } from "react"

const authContext = createContext(null)

export function ProvideAuth({ children, ...props }) {
  const auth = useProvideAuth(props)
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  const auth = useContext(authContext);

  if (!auth) {
    throw new Error('Cannot use `useStore` outside of a StoreProvider')
  }

  return auth;
};

  
function useProvideAuth({ signInWithEmailAndPassword }) {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    return signInWithEmailAndPassword(email, password).then(() => setUser(email));
  };

  return {
    user,
    signin,
  };
}

