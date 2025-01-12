import { act, fireEvent, render, screen } from '@testing-library/react';
import { AgentTable } from '.';
import { GridColDef } from '@mui/x-data-grid';
import { createRef } from 'react';
import { AgentInputHandle } from '..';
import { AgentContext, AgentUser } from '../AgentContext';

describe('Agent Table', () => {

    test('renders table input component', () => {
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', width: 350 },
          ];
        const ref = createRef<AgentInputHandle>();

        render(<AgentTable columns={columns} ref={ref}/>);
    
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
    });

    test('renders table input rows', () => {
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', width: 350 },
            { field: 'email', headerName: 'Email', width: 350 },
          ];
        const ref = createRef<AgentInputHandle>();

        const agents: AgentUser[] = [
            { id: 1, name: 'Jon Snow', email: 'Jon@test.com', status: 'active' },
          ];

        render(<AgentContext value={{ agents: agents }}><AgentTable columns={columns} ref={ref}/></AgentContext>);
    
        expect(screen.getByText('Jon Snow')).toBeInTheDocument();
        expect(screen.getByText('Jon@test.com')).toBeInTheDocument();
    });

    test('agent table grid select row', () => {
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', width: 350 },
            { field: 'email', headerName: 'Email', width: 350 },
          ];
        const ref = createRef<AgentInputHandle>();

        const agents: AgentUser[] = [
            { id: 1, name: 'Jon Snow', email: 'Jon@test.com', status: 'active' },
          ];

        render(<AgentContext value={{ agents: agents }}><AgentTable columns={columns} ref={ref}/></AgentContext>);
    

        fireEvent.click(screen.getByText('Jon Snow'));

        expect(parseInt(ref.current?.getSelectedAgentId())).toBe(1);
    });

    test('agent table grid clear selected rows', async () => {
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', width: 350 },
            { field: 'email', headerName: 'Email', width: 350 },
          ];
        const ref = createRef<AgentInputHandle>();

        const agents: AgentUser[] = [
            { id: 1, name: 'Jon Snow', email: 'Jon@test.com', status: 'active' },
          ];

        render(<AgentContext value={{ agents: agents }}><AgentTable columns={columns} ref={ref}/></AgentContext>);
    

        fireEvent.click(screen.getByText('Jon Snow'));

        expect(parseInt(ref.current?.getSelectedAgentId())).toBe(1);

        await act(async () => {
            ref.current?.clearSelectedAgent();
          });

        expect(ref.current?.getSelectedAgentId()).toEqual([]);
    });
});