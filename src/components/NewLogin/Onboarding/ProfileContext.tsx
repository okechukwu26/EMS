// import { createContext, ReactNode } from "react";

// // Define a type for the context value
// interface AccountContextValue {
//   // Define the properties you want in the context value
//   // For example, user information, authentication status, etc.
//   // Example:
//   user: {
//     username: string;
//     email: string;
//   } | null;
//   // Add more properties as needed
// }

// // Provide an initial/default value
// const initialContextValue: AccountContextValue = {
//   user: null,
//   // Initialize other properties if needed
// };

// // Create the context with the specified type
// export const AccountContext = createContext<AccountContextValue>(
//   initialContextValue
// );

// // Define a component that will provide the context
// interface AccountProviderProps {
//   children: ReactNode;
// }

// export const AccountProvider: React.FC<AccountProviderProps> = ({
//   children,
// }) => {
//   // In a real application, you might use state, context providers, or other logic
//   // to manage the values in the context.

//   // For now, we are using the initialContextValue as a placeholder.
//   const contextValue: AccountContextValue = initialContextValue;

//   return (
//     <AccountContext.Provider value={contextValue}>
//       {children}
//     </AccountContext.Provider>
//   );
// };
