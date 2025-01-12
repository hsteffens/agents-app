import { RefObject, useContext, useImperativeHandle, useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import { AgentContext } from '../AgentContext';
import { AgentInputHandle } from '..';

  
const paginationModel = { page: 0, pageSize: 10 };

type AgentTableProps = {
    columns: GridColDef[];
    ref: RefObject<AgentInputHandle | null>
};

export function AgentTable({columns, ref}: AgentTableProps) {
    const context = useContext(AgentContext);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>();

    useImperativeHandle(ref, () => ({
        getSelectedAgentId: () => rowSelectionModel,
        clearSelectedAgent: () => new Promise((resolve) => {
            setRowSelectionModel(() => {
                resolve();
                return [];
             })
          }),
    }));

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={context.agents}
                columns={columns}
                initialState={{ 
                    pagination: { paginationModel },
                }}
                slots={{ toolbar: GridToolbar }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
            />
      </Paper>
    );
} 
