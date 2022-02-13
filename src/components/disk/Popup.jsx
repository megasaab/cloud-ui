import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupDisplay } from '../../reducers/fileReducer';
import { createDir } from '../../actions/file';

const Popup = ({ isOpen }) => {

    const dispatch = useDispatch();
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);

    const createHandler = () => {
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        closePopup();
    }

    const closePopup = () => {
        dispatch(setPopupDisplay(false))
    }

    return (
        <Dialog open={popupDisplay}>
            <DialogTitle>Create folder</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create name for you folder
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Write folder name"
                    fullWidth
                    variant="standard"
                    value={dirName}
                    onChange={(e) => setDirName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => closePopup()}>Cancel</Button>
                <Button onClick={() => createHandler()}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Popup;