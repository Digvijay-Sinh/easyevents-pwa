// // import { createContext, useState } from "react";

// // const AuthContext = createContext({});

// // export const AuthProvider = ({ children }) => {
// //     const [auth, setAuth] = useState({});

// //     return (
// //         <AuthContext.Provider value={{ auth, setAuth }}>
// //             {children}
// //         </AuthContext.Provider>
// //     )
// // }

// // export default AuthContext;

// import {
//   createContext,
//   useState,
//   ReactNode,
//   useContext,
//   useEffect,
// } from "react";

// // Define the type for AuthData
// export interface AuthData {
//   email: string;
//   accessToken: string;
// }

// // Define the context type
// interface AuthContextType {
//   auth: AuthData;
//   setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
// }

// // Create the context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Create a custom hook to use the AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// // Create the AuthProvider component
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [auth, setAuth] = useState<AuthData>({
//     email: "",
//     accessToken: "",
//   });

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const user: AuthData = JSON.parse(userData);
//       setAuth(user);
//     }
//   }, []);

//   useEffect(() => {
//     console.log("====================================");
//     console.log(auth);
//     console.log("====================================");
//   }, [auth]);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

export interface AuthData {
  email: string;

  accessToken: string;
  // Define your user type here
}

interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthData>({
    email: "",
    accessToken: "",
    // Initialize with token from local storage
  });

  const logout = () => {
    // Clear user session without removing details from local storage
    setAuth({
      email: "",

      accessToken: "",
    });
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user: AuthData = JSON.parse(userData);
      setAuth(user);
    }
  }, []);
  useEffect(() => {
    console.log("=======auth ==========");
    console.log(auth);
    console.log("====================================");
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
