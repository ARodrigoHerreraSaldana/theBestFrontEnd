import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authorized, setAuthorized] = React.useState(false);

  return {
    authorized,
    login() {
      return new Promise((res) => {
        setAuthorized(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthorized(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}

