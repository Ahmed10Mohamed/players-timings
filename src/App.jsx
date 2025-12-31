import { Container } from '@mui/material';
import './App.css'
import MainComponent from './Component/MainComponent';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
       fontFamily: "IBM Plex Sans Arabic"

  },
});
function App() {

  return (
    <>
     <ThemeProvider theme={theme}>

      <div style={{ display:"flex",justifyContent:"center",width:"100vw" }}>
        <Container maxWidth="xl">

         <MainComponent/>
        </Container>
      </div>
     </ThemeProvider>
    
     
    </>
  )
}

export default App
