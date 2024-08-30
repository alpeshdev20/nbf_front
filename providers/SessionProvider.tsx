"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "@/services/profile";

//* Interface
import UserInterface from "@/interfaces/UserInterface";
interface User {
  user_id: string;
  name: string;
  token: string;
}

interface SessionInterface {
  isLoggedIn: boolean;
  user: User;
}

const sessionValues: SessionInterface = {
  isLoggedIn: false,
  user: {
    user_id: "",
    name: "",
    token: "",
  },
};

interface SessionContextProps {
  session: SessionInterface;
  setSession: React.Dispatch<React.SetStateAction<SessionInterface>>;
  profile: UserInterface | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextProps>({
  session: sessionValues,
  setSession: () => {},
  profile: null,
  isLoading: false,
});

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionInterface>(sessionValues);

  //* react query
  const { profile, isLoading, isError, isSuccess } = getProfile();

  useEffect(() => {
    if (localStorage.getItem("token") !== null && profile) {
      setSession({
        isLoggedIn: true,
        user: {
          user_id: profile.user_id || "", 
          name: profile.name || "",        
          token: localStorage.getItem("token") || "", 
        },
      });
    } else {
      setSession(sessionValues);
    }
  }, [profile, isLoading]);


  return (
    <SessionContext.Provider
      value={{ session, setSession, profile, isLoading }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
