import { Box, LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function LinearProgressWithLabel(
  props: LinearProgressProps & { value?: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value ?? 0,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}