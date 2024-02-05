import React, { useState } from 'react';
import { Container, Button, Checkbox, FormControl, Radio, RadioGroup, FormLabel, Grid, MenuItem, Select, TextField, FormGroup, FormControlLabel } from '@mui/material';

const PostShiftForm = () => {
  const [facility, setFacility] = useState('');
  const [address, setAddress] = useState('');
  const [workerType, setWorkerType] = useState(''); 
  // const [nurseChecked, setNurseChecked] = useState(false);
  // const [pswChecked, setPswChecked] = useState(false);
  const [rate, setRate] = useState('');
  const [gender, setGender] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleFacilityChange = (event) => {
    setFacility(event.target.value);
  };

  const handleAddressChange = async (event) => {
    setAddress(event.target.value);
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);
      }
    } catch (error) {
      console.error('Error fetching geocode data', error);
    }

  };

  // const handleNurseChange = (event) => {
  //   setNurseChecked(event.target.checked);
  // };

  // const handlePswChange = (event) => {
  //   setPswChecked(event.target.checked);
  // };

  const handleWorkerTypeChange = (event) => {
    setWorkerType(event.target.value);
  };

  const handleRateChange = (event) => {
    setRate(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleStartTimeChange =  (event) => {
    setStartTime(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();


    console.log({
      facility,
      address,
      // nurseChecked,
      // pswChecked,
      rate,
      gender,
      duration,
      startDate,
      startTime,
      latitude,
      longitude
    });
  };

  return (
    <Container maxWidth="sm" >
      <h1 className="text-6xl p-8 text-[#24233E] text-center">Post a Shift</h1>
      <form onSubmit={handleFormSubmit} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '16px' }}>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            value={facility}
            onChange={handleFacilityChange}
            size='small'
            label="Facility Name"
          />
        </FormControl>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            label="Facility Address"
            value={address}
            size='small'
            onChange={handleAddressChange}
          />
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl component="fieldset" fullWidth style={{ marginBottom: '20px' }}>
              <FormLabel component="legend">Type of Worker</FormLabel>
              <RadioGroup
                row
                aria-label="workerType"
                name="workerType"
                value={workerType}
                onChange={handleWorkerTypeChange}
              >
                <FormControlLabel
                  value="nurse"
                  control={<Radio />}
                  label="Registered Nurse"
                />
                <FormControlLabel
                  value="psw"
                  control={<Radio />}
                  label="Personal Support Worker"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <FormLabel component="legend">Gender</FormLabel>
          <Select
            value={gender}
            onChange={handleGenderChange}
            size='small'
          >
            <MenuItem value="any">Any</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>


        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <TextField
              label="Rate"
              type="number"
              fullWidth
              value={rate}
              size='small'
              onChange={handleRateChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Duration"
              type="number"
              fullWidth
              value={duration}
              size='small'
              onChange={handleDurationChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              value={startDate}
              onChange={handleStartDateChange}
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Time"
              type="time"
              fullWidth
              value={startTime}
              onChange={handleStartTimeChange}
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary">
          Post Job
        </Button>
      </form>
    </Container>
  );
};

export default PostShiftForm;
