import axios from 'axios';
import { TEST_URL } from '../constant';
import { addFile, setFiles } from '../reducers/fileReducer';

export function getFiles(dirId) {
    return async dispatch => {
        try {
            const queryParams = dirId ? '?parent=' + dirId : '';
            const response = await axios.get(`${TEST_URL}/files${queryParams}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch(setFiles(response.data))
        } catch (error) {
            alert(error);
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            
            const response = await axios.post(`${TEST_URL}/files`,
                {
                    name,
                    parent: dirId,
                    type: 'dir'
                },

                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch(addFile(response.data))
        } catch (error) {
            alert(error.response.data.message);
        }
    }
}