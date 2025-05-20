import { Box, Container } from '@mui/material'
import * as React from "react";

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <Box>
        <Container maxWidth="lg" sx={{ color: "white", my: 12 }}>
            {children}
        </Container>
    </Box>
  )
}
