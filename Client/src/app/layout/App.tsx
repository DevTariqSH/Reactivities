// Import react hooks
/*
 useState: lets you create state variables in a functional component.
 useEffect: lets you run side effects (e.g., API calls, subscriptions) when the component renders.
 */
import { useState } from 'react'
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/Dashboard/ActivityDashboard';
import { useActivities } from "../../lib/hooks/useActivities";

 export default function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending} = useActivities();


  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }



  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading ...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectedActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
          />
        )}

      </Container>


    </Box>
  )
}