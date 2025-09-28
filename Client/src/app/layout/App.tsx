// Import react hooks
/*
 useState: lets you create state variables in a functional component.
 useEffect: lets you run side effects (e.g., API calls, subscriptions) when the component renders.
 */
import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import { Outlet } from 'react-router';

export default function App() {



  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}