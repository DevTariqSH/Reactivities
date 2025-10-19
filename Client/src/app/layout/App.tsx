// Import react hooks
/*
 useState: lets you create state variables in a functional component.
 useEffect: lets you run side effects (e.g., API calls, subscriptions) when the component renders.
 */
import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import { Outlet, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';

export default function App() {

  const location = useLocation();

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container maxWidth='xl' sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}

    </Box>
  )
}