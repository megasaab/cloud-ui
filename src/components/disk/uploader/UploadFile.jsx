import { Alert, AlertTitle, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../reducers/uploadReducer";
import LinearProgressBar from "../../../utils/LinearProgress";

const UploadFile = ({ file }) => {
    const dispatch = useDispatch();
    return (
        <Alert severity="info" icon={false} sx={{ mb: 1 }}
            action={
                <IconButton onClick={() => dispatch(removeUploadFile(file.id))}
                    aria-label="close"
                    color="inherit"
                    size="small"
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            <AlertTitle>
                <div>
                    {file.name}
                </div>
            </AlertTitle>
            <LinearProgressBar  progress={file.progress}/>
        </Alert>
    )
}

export default UploadFile;