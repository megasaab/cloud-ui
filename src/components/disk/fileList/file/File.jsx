import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Divider, ListItemIcon, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFileAction, pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteFile, downloadFile } from '../../../../actions/file';

const File = ({ file }) => {

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    const openDirHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    const downloadClickHandlder = (event) => {
        event.stopPropagation();
        downloadFile(file);
    }

    const deleteFileHandler = (event) => {
        event.stopPropagation();
        dispatch(deleteFile(file));
    }


    return (
        <>
            <div>
                <Box sx={{ width: 1, mb: 1, mt: 1, alignItems: 'center', cursor: 'pointer' }}>
                    <Box display="grid" alignItems='center' gridTemplateColumns="1fr 4fr repeat(4, 1fr)" gap={2}>
                        <Box gridColumn="span 1" onClick={() => openDirHandler()}>
                            <div style={{ marginLeft: '1rem' }}>
                                <ListItemIcon>

                                    {file.type === 'dir' ? <FolderOpenIcon fontSize='large' /> : <InsertDriveFileIcon fontSize='large' />}

                                </ListItemIcon>
                            </div>
                        </Box>
                        <Box gridColumn="span 1" onClick={() => openDirHandler()}>
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
                        <Box gridColumn="span 1" justifySelf='center'>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div>
                                    {file.type !== 'dir' && <CloudDownloadIcon onClick={(event) => downloadClickHandlder(event)} fontSize='large' sx={{ mr: 3 }} color='success'/>}
                                </div>
                                <div>
                                    {<DeleteIcon onClick={(event) => deleteFileHandler(event)} color='error' fontSize='large'/>}
                                </div>
                            </div>
                        </Box>
                        <Box gridColumn="span 1" justifySelf='center'>
                            <div>
                                <Typography component="h3" variant="div" color='gray'>
                                    {file?.size}
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                </Box>
                <Divider />
            </div>
        </>

    )
}

export default File;