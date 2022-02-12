import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../actions/file';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Box, IconButton, ListItem, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
import FileList from './fileList/FileList';

const Disk = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [currentDir]);
    return (
        <>
            <Grid container justifyContent="center">
                <Grid item xs={6} padding='1rem'>

                    <Button variant="outlined" style={{ marginBottom: '1rem' }}><KeyboardReturnIcon /></Button>
                    <br />
                    <Button variant="outlined">
                        <Typography component="h3" variant="div">
                            Create new folder
                        </Typography>
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
                    </Grid>
                </Grid>
            </Grid>
            <FileList />
        </>
    )
}

export default Disk;