import { render, screen } from "@testing-library/react";
import { AgentInput } from ".";
import { AgentUser } from "../AgentContext";


describe('Agent Input', () => {

    test('renders agent input component - new agent', () => {
        render(<AgentInput onSaveClick={() => {}}/>);
    
        expect(screen.getByText('Create new agent')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Inactive')).toBeInTheDocument();
    });

    test('renders agent input component - edit agent', () => {
        const user: AgentUser = {id: 1, name: 'test', email: 'potato@a.com', status: 'active'};
        render(<AgentInput onSaveClick={() => {}} selectedUser={user}/>);
    
        expect(screen.getByText('Edit agent')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();

        const name = screen.getByRole('textbox', { name: /name/i });
        expect(name).toHaveValue('test');

        const email = screen.getByRole('textbox', { name: /email/i });
        expect(email).toHaveValue('potato@a.com');
    });

});