import React from 'react';
import { useEffect, useState } from 'react';
import { metricsAllFunc } from '../utils/getMetricsAllFunc';
import Typography from '@mui/material/Typography';

///MATERIAL UI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function Home(props) {
  const [totalInvocations, setInvocations] = useState(0);
  const [totalThrottles, setThrottles] = useState(0);
  const [totalErrors, setErrors] = useState(0);

  const { creds } = props;

  const promise = (metric, setter) => {
    Promise.resolve(metricsAllFunc(creds, metric))
      .then(data => data.data.reduce((x, y) => x + y.y , 0))
      .then(data => setter(data))
      .catch(e => console.log(e));
  }

  if (creds.region.length) {
    // Invocations
    const invocations = promise('Invocations', setInvocations);

    // Throttles
    const throttles = promise('Throttles', setThrottles);

    // Errors
    const errors = promise('Errors', setErrors);
  }

  return (

    <Container maxWidth="lg">
       <Typography variant="h3" component="div" gutterBottom>
              Account Totals
        </Typography>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', bgcolor: '#cfe8fc', height: '100vh' }}>

        <Grid container spacing={2} >

            <Grid item xs={5}>
                <Stack sx={{ width: '100%' }} spacing={2}>

                    <Alert severity="success">
                      <AlertTitle>Invocations</AlertTitle>
                      { totalInvocations }
                    </Alert>

                    <Alert severity="warning">
                      <AlertTitle>Throttles</AlertTitle>
                      { totalThrottles }
                    </Alert>

                    <Alert severity="error">
                      <AlertTitle>Errors</AlertTitle>
                      { totalErrors }
                    </Alert>

                </Stack>
            </Grid>

            <Grid item xs={7}>
              <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur animi quia explicabo itaque, ipsa laborum corrupti sed atque ab totam quaerat veniam expedita suscipit, similique sint est ipsam doloribus facilis!
              </Typography>
            </Grid>

        </Grid>
      </Box>
    </Container>
  )
}

export default Home;