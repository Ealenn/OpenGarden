/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { TbUser, TbSeeding, TbTree, TbPlant2 } from 'react-icons/tb';
import { HttpClient } from './configs/HttpClient';
import { BASE_URL } from './configs/BaseUrl';

export default class Dashboard extends React.Component {
  state = {
    loading: true,
    stats: {}
  };

  componentDidMount() {
    HttpClient(`${BASE_URL}/stats/global`).then(res => {
      this.setState({ stats: JSON.parse(res.body), loading: false })
    });
  };

  render() {
    return (
      <>
        <Box component="span" sx={{ p: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs>
              <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardHeader
                  avatar={<TbUser />}
                  title="Users"
                  subheader={this.state.loading ? <Skeleton /> : this.state?.stats?.estimatedCount?.users}></CardHeader>
              </Card>
            </Grid>
            <Grid item xs>
              <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardHeader
                  avatar={<TbTree />}
                  title="Plants"
                  subheader={this.state.loading ? <Skeleton /> : this.state?.stats?.estimatedCount?.plants}></CardHeader>
              </Card>
            </Grid>
            <Grid item xs>
              <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardHeader
                  avatar={<TbSeeding />}
                  title="Varieties"
                  subheader={this.state.loading ? <Skeleton /> : this.state?.stats?.estimatedCount?.varieties}></CardHeader>
              </Card>
            </Grid>
            <Grid item xs>
              <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardHeader
                  avatar={<TbPlant2 />}
                  title="Floors"
                  subheader={this.state.loading ? <Skeleton /> : this.state?.stats?.estimatedCount?.floors}></CardHeader>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}
