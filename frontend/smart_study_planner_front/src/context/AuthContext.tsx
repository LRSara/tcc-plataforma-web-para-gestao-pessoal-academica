import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api, { setToken as setApiToken } from "../services/api";

interface User { id: number; name: string; email: string; created_at: string }
interface AuthContextType { user: User | null; token: string | null; login: (email:string,password:string)=>Promise<void>; logout: ()=>void;loading: boolean;}
interface AuthProviderProps { children: ReactNode; }

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider = ({children}:AuthProviderProps) => {
  const [user,setUser] = useState<User|null>(null);
  const [token,setToken] = useState<string|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
      setApiToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = async(email:string,password:string)=>{
    const res = await api.post("/login",{email,password});
    const {token,user} = res.data;
    setToken(token); setApiToken(token); setUser(user);
    localStorage.setItem("token",token);
    localStorage.setItem("user",JSON.stringify(user));
  };

  const logout = ()=>{
    setToken(null); setUser(null); localStorage.removeItem("token"); localStorage.removeItem("user"); setApiToken("");
  };

  return <AuthContext.Provider value={{user,token,login,logout,loading}}> {children}</AuthContext.Provider>;
};

export const useAuth = ()=>{
  const context = useContext(AuthContext);
  if(!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};
