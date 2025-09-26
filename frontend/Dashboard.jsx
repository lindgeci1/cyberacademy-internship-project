import React, {useState, useMemo} from "react"
import {Box, Drawer, List, ListItem, ListItemText, Typography, IconButton, createTheme, ThemeProvider, CssBaseline} from "@mui/material";
import Brightnes4Icon from '@mui/icons-material/Brightness4';
import Brightnes7Icon from '@mui/icons-material/Brightness7';
import ResourceList from "./src/components/ResourceList";

export default function Dashboard(){
    const[dark, setDark] = useState(false);
    const theme = useMemo(()=>createTheme({palette: {mode:dark?"dark":"light"}}), [dark]);

    return(
        <ThemeProvider theme ={theme}>
            <CssBaseline/>
            <Box sx = {{display: "flex"}}>
                {/* Dashboard */}
                <Drawer 
                    variant = "permanent"
                    sx = {{width: 200, "$ .MuiDrawer-paper":{width: 200, boxSizing: "border-box"}}}>
                <List>
                    <ListItem component = "button" sx = {{color: "inherit", backgroundColor: "transparent", "&:hover": {backgroundColor: "#e0e0e0"},}}>
                            <ListItemText primary = "Resources"/>
                    </ListItem>
                </List>
        </Drawer>

        <Box sx = {{flewGrow: 1, p: 3}}>
            <Box sx = {{display: "flex", justifyContent:"space-between", alignItems: "center", mb: 2}}>
               
                <IconButton onClick={()=>setDark(!dark)} color="inherit">
                    {dark? <Brightnes4Icon/>: <Brightnes7Icon/>}
                </IconButton>
            </Box>
        <ResourceList/>
        </Box>
    </Box>

        </ThemeProvider>
    )
}