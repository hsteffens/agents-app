
import { useContext, useEffect, useRef, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';

import { AgentTable } from './AgentTable';
import { AgentUser, AgentContext } from './AgentContext';
import { AgentInput } from './AgentInput';
import { AppContext } from '../../AppContext';


export interface AgentInputHandle {
  getSelectedAgentId: () => any;
  clearSelectedAgent: () => Promise<void>;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 350 },
  { field: 'email', headerName: 'Email', width: 350 },
  { field: 'status', headerName: 'Status', width: 90 },
];

export function Agent() {
  const { step, setStep } = useContext(AppContext);
  const inputRef = useRef<AgentInputHandle>(null);
  const [rows, setRows] = useState<AgentUser[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const transformedData = data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          status: 'active',
        }));

        setRows(transformedData);
      } catch (err: any) {
        alert('Error loading agents');
      }
    };

    fetchData();
  }, [setRows]);


  let agentStep = <AgentTable columns={columns} ref={inputRef}/>;
 
  if (step === 'add') {
    const onSave = (user: AgentUser) => {
      setRows(prevRows => [...prevRows, user]);
      setStep('list');
    }
    agentStep = <AgentInput onSaveClick={onSave}/>;
  } else if (step === 'edit') {
    const onSave = (user: AgentUser) => {
      setRows(prevRows => prevRows.map(row => row.id === user.id ? { ...row, ...user } : row));
      setStep('list');
    }

    const selectedAgent = rows.find(row => row.id === parseInt(inputRef.current?.getSelectedAgentId()));
    if (!selectedAgent) {
      setStep('list');
      alert('No agent selected!');
    }

    agentStep = <AgentInput onSaveClick={onSave} selectedUser={selectedAgent}/>;
  } else if (step === 'delete') {
    const selectedRow = inputRef.current?.getSelectedAgentId();
    if (!selectedRow) {
      alert('No agent selected!');
    } else {
      inputRef.current?.clearSelectedAgent().then(() => {
        setRows(prevRows => prevRows.filter(row => row.id !== parseInt(selectedRow)));
        setStep('list');
      });
    }
  }

  return (
    <AgentContext value={{ agents: rows }}>
     { agentStep }
    </AgentContext>);
}
