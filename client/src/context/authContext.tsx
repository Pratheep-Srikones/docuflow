import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: { staff_id?: string; user_id?: string } | null;
  login: (token: string, roleId: string, role: "staff" | "user") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    staff_id?: string;
    user_id?: string;
  } | null>(null);

  // ✅ Load user from localStorage when app starts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const staff_id = localStorage.getItem("staff_id");
    const user_id = localStorage.getItem("user_id");

    if (token) {
      if (staff_id) {
        setUser({ staff_id });
      } else if (user_id) {
        setUser({ user_id });
      }
    }
  }, []);

  // ✅ Save token & user role on login
  const login = (token: string, roleId: string, role: "staff" | "user") => {
    localStorage.setItem("token", token);
    if (role === "staff") {
      localStorage.setItem("staff_id", roleId);
      setUser({ staff_id: roleId });
    } else if (role === "user") {
      localStorage.setItem("user_id", roleId);
      setUser({ user_id: roleId });
    }
  };

  // ✅ Remove token & user role on logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("staff_id");
    localStorage.removeItem("user_id");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook for using Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
