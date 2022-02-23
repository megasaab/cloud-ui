import UploadFile from "./UploadFile";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from "@mui/material";
import { hideUploader } from "../../../reducers/uploadReducer";

const Uploader = () => {
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(state => state.upload.isVisible);
    const dispatch = useDispatch();

    return (
        isVisible && 
        <div style={{ height: '300px', width: '300px', position: 'fixed', backgroundColor: '#1976d2', bottom: '0', right: '0', padding: '10px', borderRadius: '12px', overflowY: 'auto'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{ fontSize: '1.2rem' }}>Загрузки</div>
                <IconButton onClick={() => dispatch(hideUploader())}
                    aria-label="close"
                    color="inherit"
                    size="large"
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            </div>

            {files.map(file => <UploadFile key={file.id} file={file} />)}
        </div>
    )
}

export default Uploader;