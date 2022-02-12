import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import File from './file/File';
import { Divider } from '@mui/material';

export default function FileList() {

    const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} />);

    return (
        <>
            <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="1fr 4fr repeat(4, 1fr)" gap={2}>
                    <Box gridColumn="span 2">
                        <div style={{ marginLeft: '13rem' }}>
                            <Typography component="h3" variant="div" color='primary'>
                                Name
                            </Typography>
                        </div>
                    </Box>
                    <Box gridColumn="span 2" justifySelf='center'>
                        <div>
                            <Typography component="h3" variant="div" color='primary'>
                                Date
                            </Typography>
                        </div>
                    </Box>
                    <Box gridColumn="span 2" justifySelf='center'>
                        <div>
                            <Typography component="h3" variant="div" color='primary'>
                                Size
                            </Typography>
                        </div>
                    </Box>
                </Box>
                <Divider />
                {files}
            </Box>
        </>
    );
}