import axios from 'axios';
import { TEST_URL } from '../constant';
import { addFile, deleteFileAction, setFiles } from '../reducers/fileReducer';
import { addUploadFile, changeUploadFile, showUploader } from '../reducers/uploadReducer';

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            let url = `${TEST_URL}/files`
            if (dirId) {
                url = `${TEST_URL}/files?parent=${dirId}`;
            }

            if (sort) {
                url = `${TEST_URL}/files?sort=${sort}`;
            }

            if (dirId && sort) {
                url = `${TEST_URL}/files?parent=${dirId}&sort=${sort}`;
            }
            const response = await axios.get(url,
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
            const uploadFile = { name: file.name, progress: 0, id: new Date().getTime() };
            dispatch(showUploader());
            dispatch(addUploadFile(uploadFile));
            const response = await axios.post(`${TEST_URL}/files/upload`, formData,

                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        console.log('totalLength', totalLength);
                        if (totalLength) {
                            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength);
                            dispatch(changeUploadFile(uploadFile));
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

export async function downloadFile(file) {
    const response = await fetch(`${TEST_URL}/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`${TEST_URL}/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id));
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
}