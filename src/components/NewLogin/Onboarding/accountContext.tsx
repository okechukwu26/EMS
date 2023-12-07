import React from "react"

export type AccountContextType = {
    switchToLogin: () => void;
    switchToReset: () => void;
}

export const AccountContext = React.createContext({
  switchToLogin: () => {},
  switchToReset: () => {},
});

// export const AccountContext = React.createContext<AccountContextType | undefined>(undefined);
