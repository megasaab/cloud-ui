import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import File from './file/File';
import { Divider } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
export default function FileList() {

    const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file} />);

    if (files.length === 0) {
        return (
            <Box sx={{ width: 1, justifyContent: 'center' , display: 'flex', alignItems: 'center', mt: '10rem'}}>
                <SearchOffIcon /><h3>Файлы не найдены</h3>
            </Box>
        )
    }

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
                    <Box gridColumn="span 1" justifySelf='center'>
                    </Box>
                    <Box gridColumn="span 1" justifySelf='center'>
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