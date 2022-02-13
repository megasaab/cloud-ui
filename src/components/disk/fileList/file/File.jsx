import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Divider, ListItemIcon, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';

const File = ({ file }) => {

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    const openDirHandler = () => {
        dispatch(pushToStack(currentDir));
        dispatch(setCurrentDir(file._id))
    }
    

    return (
        <>
            <Box sx={{ width: 1, mb: 1, mt: 1, alignItems: 'center', cursor: 'pointer' }} onClick={file.type === 'dir' ? () => openDirHandler(): ''}>
                <Box display="grid" alignItems='center' gridTemplateColumns="1fr 4fr repeat(4, 1fr)" gap={2}>
                    <Box gridColumn="span 1">
                        <div style={{ marginLeft: '1rem' }}>
                            <ListItemIcon>

                                {file.type === 'dir' ? <FolderOpenIcon fontSize='large' /> : <InsertDriveFileIcon fontSize='large'/> }

                            </ListItemIcon>
                        </div>
                    </Box>
                    <Box gridColumn="span 1">
                        <div>
                            <Typography component="h3" variant="div" color='secondary'>
                                {file?.name}
                            </Typography>
                        </div>
                    </Box>
                    <Box gridColumn="span 2" justifySelf='center'>
                        <div>
                            <Typography component="h3" variant="div" color='gray'>
                                {file?.date?.slice(0, 10)}
                            </Typography>
                        </div>
                    </Box>
                    <Box gridColumn="span 2" justifySelf='center'>
                        <div>
                            <Typography component="h3" variant="div" color='gray'>
                                {file?.size}
                            </Typography>
                        </div>
                    </Box>
                </Box>
            </Box>
            <Divider />
        </>

    )
}

export default File;