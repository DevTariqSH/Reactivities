// Import react hooks
/*
 useState: lets you create state variables in a functional component.
 useEffect: lets you run side effects (e.g., API calls, subscriptions) when the component renders.
 */
import { useEffect, useState } from 'react'
import { Box, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/Dashboard/ActivityDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

      return () => {}
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleOpenForm = (id?: string) => {
    if(id) handleSelectActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleSubmitForm = (activity: Activity) => {
    if(activity.id){
      setActivities(activities.map(x => x.id === activity.id ? activity: x))
    }else{
      setActivities([...activities, {...activity, id: activities.length.toString()}])
    }
  }

  const handleDelete = (id: string) => {
    setActivities(activities.filter(x => x.id !== id))
  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
    <CssBaseline/>
      <NavBar openForm={handleOpenForm}/>
      <Container maxWidth='xl' sx={{mt: 3}}>
        <ActivityDashboard 
        activities={activities}
        selectActivity = {handleSelectActivity}
        cancelSelectActivity = {handleCancelSelectedActivity}
        selectedActivity = {selectedActivity}
        editMode={editMode}
        openForm = {handleOpenForm}
        closeForm={handleFormClose}
        submitForm={handleSubmitForm}
        deleteActivity={handleDelete}
        />
      </Container>
     

    </Box>
  )
}

export default App
