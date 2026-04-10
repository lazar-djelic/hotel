import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useMe } from "../services/useMe";
import { socket } from "../services/socket";

type AuthContextType = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useMe();

  useEffect(() => {
    if (data?.user && data?.authenticated) {
      socket.emit("register", data.user._id || data.user.id);
    }
  }, [data?.user, data?.authenticated]);

  const value: AuthContextType = {
    user: data?.user ?? null,
    isAuthenticated: data?.authenticated ?? false,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
