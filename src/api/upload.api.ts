import axiosClient from '@/api/axiosClient'

const uploadApi = {
    imageUploader: async (image: File) => {
        const url = 'upload/image'
        const uploadData = new FormData()
        uploadData.set('image', image)
        return await axiosClient.post(url, uploadData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
    },
}

export default uploadApi
