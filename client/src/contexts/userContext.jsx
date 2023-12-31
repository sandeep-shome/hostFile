import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
