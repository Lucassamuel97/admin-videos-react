import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

export const UploadList = () => {
  return (
    <Box
      right={0}
      bottom={0}
      zIndex={9}
      width={"100%"}
      position={"fixed"}
      sx={{ "@media (min-width: 600px)": { width: 450 } }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<GridExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <List>
                <Box>
                <Typography>File1.mp4</Typography>
                <Typography>File2.mp4</Typography>
                <Typography>File3.mp4</Typography>
                </Box>
            </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}