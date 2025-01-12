import { ChangeEvent, useContext, useState } from "react";
import {
    TextField,
    Switch,
    FormControlLabel,
    Button,
    Box,
    Typography,
  } from "@mui/material";
import { AgentUser } from "../AgentContext";
import { AppContext } from "../../../AppContext";

type HandleBarProps = {
    onSaveClick: (user: AgentUser) => void;
    selectedUser?: AgentUser;
};

export function AgentInput({
    onSaveClick,
    selectedUser = { email: '', name: '', status: 'inactive', id: -1 }
}: HandleBarProps) {
    const { setStep } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: selectedUser.email,
        name: selectedUser.name,
        isActive: selectedUser.status === 'active' ? true : false,
    });
 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
    };

    const handleToggle = () => {
        setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
    };

    const handleSave = () => {
        onSaveClick({
            id: selectedUser.id !== -1 ? selectedUser.id : Math.floor(Math.random() * (50 - 10 + 1) + 10), // from 10 - 50
            status: formData.isActive ? 'active': 'inactive',
            name: formData.name,
            email: formData.email
        });
        setStep('list');
    };

    const handleCancel = () => {
        setFormData({ email: "", name: "", isActive: false });
        setStep('list');
    };

    let title = 'Create new agent';
    if (selectedUser.id > 0) {
        title = 'Edit agent';
    }

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "95%",
                margin: "auto",
                padding: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: 3,
                backgroundColor: "#fff",
            }}
        >
            <Typography variant="h6" align="center">
                {title}
            </Typography>
            <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
            />
            <FormControlLabel
                control={
                <Switch
                    checked={formData.isActive}
                    onChange={handleToggle}
                    color="primary"
                />
                }
                label={formData.isActive ? "Active" : "Inactive"}
            />
            <Box
                sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: '10px',
                marginTop: 2,
                }}
            >
                <Button variant="contained" color="primary" onClick={handleSave}>
                Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
                </Button>
            </Box>
            </Box>
    );
}