import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SortIcon from '@mui/icons-material/Sort';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import FileList from './fileList/FileList';
import Popup from './Popup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);

    const showPopUp = () => {
        dispatch(setPopupDisplay(true));
    }

    const onBackHandlerClicked = () => {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }

    const fileUploadHandler = (event) => {
        const files = [...event.target.files];
        files.forEach(file => {
            dispatch(uploadFile(file, currentDir));
        });
    }

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={6} padding='1rem'>

                    <Button variant="outlined" style={{ marginBottom: '1rem' }} onClick={() => onBackHandlerClicked()}><KeyboardReturnIcon /></Button>
                    <br />
                    <Button variant="outlined" onClick={() => showPopUp()} sx={{ mr: 2 }}>
                        <Typography component="h4" variant="div">
                            Create new folder
                        </Typography>
                    </Button>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        <CloudUploadIcon sx={{ mr: 1 }} />
                        <span>Upload File</span>
                        <input
                            multiple={true}
                            onChange={(event) => fileUploadHandler(event)}
                            type="file"
                            hidden
                        />
                    </Button>
                </Grid>
                <Grid item container xs={6} alignItems="flex-end" direction="column" padding='1rem'>
                    <Grid item>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row-reverse',
                                p: 1,
                                m: 1,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                            }}
                        >
                            <div>
                                <ArrowDownwardIcon />
                                <SortIcon />
                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                        </Box>
                        <Popup />
                    </Grid>
                </Grid>
            </Grid>
            <FileList />
        </>
    )
}

export default Disk;