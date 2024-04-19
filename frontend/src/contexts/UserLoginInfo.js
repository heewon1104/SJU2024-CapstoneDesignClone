import React, { useState, createContext } from 'react';

const UserLoginInfoContext = createContext({
  userTokenCheck: false,
  setuserTokenCheck: () => {},
});

const UserLoginInfoProvider = ({ children }) => {
  const [userTokenCheck, setuserTokenCheck] = useState(false);

  const value = { userTokenCheck, setuserTokenCheck };
  return (
    <UserLoginInfoContext.Provider value={value}>
      {children}
    </UserLoginInfoContext.Provider>
  );
};

export { UserLoginInfoContext, UserLoginInfoProvider };
