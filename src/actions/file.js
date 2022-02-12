import axios from 'axios';
import { TEST_URL } from '../constant';
import { setFiles } from '../reducers/fileReducer';

export function getFiles(dirId) {
    return async dispatch => {
        try {
            const queryParams = dirId ? '?parent='+dirId : '';
            const response = await axios.get(`${TEST_URL}/files${queryParams}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch(setFiles(response.data))
        } catch (error) {
            alert(error);
        }
    }
}