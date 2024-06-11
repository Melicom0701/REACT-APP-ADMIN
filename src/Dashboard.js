import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const chartFilters = (data) =>{
    let labels = [12];
    data.forEach(element => {
        const month = new Date(element.month).getMonth();
        labels[month] = element.count;
    });
    console.log(labels);
    return labels;
}

export const Dashboard = () => {
    const getStats = async () => {
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/stats/numUsers`);
        const data = await response.json();
        setNumUsers(data);
        const response2 = await fetch(`${process.env.REACT_APP_ENDPOINT}/stats/numDestinations`);
        const data2 = await response2.json();
        setNumDestinations(data2);
        const response3 = await fetch(`${process.env.REACT_APP_ENDPOINT}/stats/numReviews`);
        const data3 = await response3.json();
        setNumReviews(data3);
        const response4 = await fetch(`${process.env.REACT_APP_ENDPOINT}/stats/monthlyUsers`);
        const data4 = await response4.json();
        setMonthlyUsers(chartFilters(data4));
        const response5 = await fetch(`${process.env.REACT_APP_ENDPOINT}/stats/monthlyDestinations`);
        const data5 = await response5.json();
        setMonthlyDestinations(chartFilters(data5));
        const response6 = await fetch(`${process.env.REACT_APP_ENDPOINT}/stats/monthlyReviews`);
        const data6 = await response6.json();
        setMonthlyInteractions(chartFilters(data6));

    };
    const [numUsers,setNumUsers ] = useState(0);
    const [numDestinations, setNumDestinations] = useState(0);
    const [numReviews, setNumReviews] = useState(0);
    const [monthlyUsers, setMonthlyUsers] = useState([]);
    const [monthlyDestinations, setMonthlyDestinations] = useState([]);
    const [monthlyInteractions, setMonthlyInteractions] = useState([]);
    const [selectedChart, setSelectedChart] = useState('users');

    useEffect(() => {
        getStats();
    }
    , []);

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    const chartData = {
        users: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Users',
                    data: monthlyUsers,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        destinations: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Destinations',
                    data: monthlyDestinations,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                },
            ],
        },
        interactions: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Interactions',
                    data:monthlyInteractions,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                },
            ],
        },
    };

    const selectedChartData = chartData[selectedChart];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Welcome to the administration" />
                    <CardContent>
                        <Typography variant="body1">Lorem ipsum sic dolor amet...</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="Total User" />
                    <CardContent>
                        <Typography variant="h4">{numUsers}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="Total Destinations" />
                    <CardContent>
                        <Typography variant="h4">{numDestinations}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="Total Interactions" />
                    <CardContent>
                        <Typography variant="h4">{numReviews}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title="Charts" />
                    <CardContent>
                        <FormControl fullWidth>
                            <InputLabel id="chart-select-label">Select Chart</InputLabel>
                            <Select
                                labelId="chart-select-label"
                                value={selectedChart}
                                onChange={handleChartChange}
                                label="Select Chart"
                            >
                                <MenuItem value="users">Users According to Month</MenuItem>
                                <MenuItem value="destinations">Destinations According to Month</MenuItem>
                                <MenuItem value="interactions">Interactions According to Month</MenuItem>
                            </Select>
                        </FormControl>
                        <Bar data={selectedChartData} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

