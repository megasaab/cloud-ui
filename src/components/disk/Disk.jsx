import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SortIcon from '@mui/icons-material/Sort';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../actions/file';
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import FileList from './fileList/FileList';
import Popup from './Popup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import Uploader from './uploader/Uploader';
import LinearProgress from '@mui/material/LinearProgress';
import { searchFiles } from '../../actions/file';

const Disk = () => {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.app.loader)
    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const [sort, setSort] = useState(1);
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    }, [currentDir, sort]);

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

    const searchHandler = (event) => {
        setSearchName(event.target.value);
    }

    const onSearchClicked = () => {
        dispatch(searchFiles(searchName))
    }

    if (loader === true) {

        return (
            <Grid container justifyContent="center" p={1}>
                <Box sx={{ width: '100%' }} style={{ height: "calc(100vh - 50px)" }}>
                    <LinearProgress />
                </Box>
            </Grid>
        )

    } else {
        return (
            <>
                <Grid container justifyContent="center">
                    <Grid item xs={6} padding='1rem'>

                        <Button variant="outlined" style={{ marginBottom: '1rem' }} onClick={() => onBackHandlerClicked()}><KeyboardReturnIcon /></Button>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <Button variant="outlined" onClick={() => showPopUp()} sx={{ mr: 2 }}>
                                <Typography component="h4" variant="div">
                                    Create new folder
                                </Typography>
                            </Button>
                            <Button sx={{ mr: 2 }}
                                variant="contained"
                                component="label"
                            >
                                <CloudUploadIcon sx={{ mr: 0 }} />
                                <span>Upload File</span>
                                <input
                                    multiple={true}
                                    onChange={(event) => fileUploadHandler(event)}
                                    type="file"
                                    hidden
                                />
                            </Button>
                            <TextField
                                value={searchName}
                                onChange={(event) => searchHandler(event)}
                                label="Search files"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton onClick={() => onSearchClicked()}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }} />
                        </div>
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
                                {sort === 1 ?
                                    <div style={{ cursor: 'pointer' }} onClick={() => setSort(-1)}>
                                        <ArrowDownwardIcon />
                                        <SortIcon />
                                    </div>
                                    :
                                    <div>
                                        <div style={{ cursor: 'pointer' }} onClick={() => setSort(1)}>
                                            < ArrowUpwardIcon />
                                            <SortIcon style={{ transform: "rotate(-180deg)" }} />
                                        </div>
                                    </div>
                                }
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
                <Uploader />
            </>
        )
    }


}

export default Disk;