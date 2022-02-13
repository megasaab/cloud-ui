import Box from '@mui/material/Box';
import { Divider, ListItemIcon, Typography } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const File = ({ file }) => {
    return (
        <>
            <Box sx={{ width: 1, mb: 1, mt: 1, alignItems: 'center' }}>
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