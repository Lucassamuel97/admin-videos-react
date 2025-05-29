import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    ListItem,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { LinearWithValueLabel } from "./components/Progress";

type Upload = {
    name: string;
    progress: number;
};

type Props = {
    uploads?: Upload[];
};


export const UploadList: React.FC<Props> = ({ uploads }) => {


    if (!uploads || uploads.length === 0) {
        return null;
    }
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
                    aria-controls="upload-content"
                >
                    <Typography>Uploads</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {
                            uploads.map((upload, index) => (
                                <ListItem key={index}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography>{upload.name}</Typography>
                                        <ListItem>
                                            <LinearWithValueLabel />
                                        </ListItem>
                                    </Box>
                                </ListItem>
                            ))
                        }
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}