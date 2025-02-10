/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: { staff_id?: string; user_id?: string } | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    staff_id?: string;
    user_id?: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const staff_id = localStorage.getItem("staff_id");
    const user_id = localStorage.getItem("user_id");
    if (token) {
      try {
        if (staff_id) {
          // console.log("adding staff_id: ", staff_id);
          setUser({ staff_id: staff_id });
        } else if (user_id) {
          //console.log("adding user_id: ", user_id);
          setUser({ user_id: user_id });
        }
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, []);

  const login = () => {
    const staff_id = localStorage.getItem("staff_id");
    const user_id = localStorage.getItem("user_id");
    if (staff_id) {
      setUser({ staff_id: staff_id });
    } else if (user_id) {
      setUser({ user_id: user_id });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
