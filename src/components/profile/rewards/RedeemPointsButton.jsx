import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useRewards } from '../../../context/RewardsContext';
import { toast } from "react-toastify";

export default function RedeemPointsButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();
  const { points, removePoints } = useRewards();

  // Determine if the user has enough points to enable the redeem button and apply the twinkle effect
  const canRedeem = points >= 100 && !loading;

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading && canRedeem) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        removePoints(100, false); // Adjusted to suppress toast for point deduction
        setSuccess(true);
        setLoading(false);
        // Custom toast message for redeeming points
        toast.success("Congratulations! You've redeemed 100 points for rewards.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 2000);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative', mb: 2, display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
        <Fab
          aria-label="redeem"
          color="primary"
          sx={{
            ...buttonSx,
            width: 94, // Custom width
            height: 94, // Custom height
            '& .MuiSvgIcon-root': { // Adjust the icon size within the button if needed
              fontSize: '2.5rem',
            zIndex: 1,
            },
          }}
          onClick={handleButtonClick}
          disabled={!canRedeem}
          className={`${canRedeem ? 'animate-twinkle' : ''}`} // Apply twinkle effect conditionally
        >
          {success ? <CheckIcon /> : <MonetizationOnIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={104} // Increased size for visual encircling effect
            sx={{
              color: '#C9FFFF', // Matching Fab color or custom color
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-52px', // Half of the CircularProgress size to center vertically
              marginLeft: '-52px', // Half of the CircularProgress size to center horizontally
              zIndex: 0, // Ensure it's behind the Fab button
            }}
          />
        )}
      </Box>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={!canRedeem}
        onClick={handleButtonClick}
      >
        Redeem Rewards!
      </Button>
    </Box>
  );
}
