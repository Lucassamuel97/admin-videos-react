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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LinearProgressWithLabel } from "./components/Progress";
import { selectUploads } from "./UploadSlice";

type Upload = {
    name: string;
    progress: number;
};

type Props = {
    uploads?: Upload[];
};


export const UploadList: React.FC<Props> = () => {
    const uploadList = useAppSelector(selectUploads);
    const dispatch = useAppDispatch();

    if (!uploadList || uploadList.length === 0) {
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
                            uploadList.map((upload, index) => (
                                <ListItem key={index}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography>{upload.field}</Typography>
                                        <ListItem>
                                            <LinearProgressWithLabel value={upload.progress} />
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