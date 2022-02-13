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

export function uploadFile(file, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            if (dirId) {
                formData.append('parent', dirId);
            }

            const response = await axios.post(`${TEST_URL}/files/upload`, formData,

                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        console.log('totalLength', totalLength);
                        if (totalLength) {
                            let progress = Math.round((progressEvent.loaded * 100) / totalLength);
                            console.log(progress);
                        }
                    }

                },

            );
            dispatch(addFile(response.data))
        } catch (error) {
            alert(error.response.data.message);
        }
    }
}