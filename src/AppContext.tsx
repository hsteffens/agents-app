import { ReactNode, createContext, useState } from "react";


export type Context = {
    step: string;
    setStep: (step: string) => void;
};

export const AppContext = createContext<Context>({} as Context);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [step, setStep] = useState("list");
  
    return (
      <AppContext.Provider value={{ step, setStep }}>
        {children}
      </AppContext.Provider>
    );
  };
