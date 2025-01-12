import { createContext } from "react";


export type AgentUser = {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'inactive';
}

export type Context = {
    agents: AgentUser[];
};

export const AgentContext = createContext<Context>({} as Context);

