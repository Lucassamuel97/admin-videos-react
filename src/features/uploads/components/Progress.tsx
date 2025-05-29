import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function LinearProgressBar({ progress }: { progress: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export function LinearWithValueLabel() {
  const [progress, setProgress] = useState(10);


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }
    , []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressBar progress={progress} />
    </Box>
  );
}