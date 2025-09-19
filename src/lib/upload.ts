import { saveImage } from '@/app/actions/saveImage';
import axios from 'axios';

export default async function handleUplaod(dataUrl: string | null, id: string) {
    try{
        if(dataUrl === null) return;

        const formData = new FormData();
        formData.append('file', dataUrl);
        formData.append('upload_preset', 'pixedit_upload');

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
        )
        const image = response.data; 

        await saveImage({
            userId: id,
            publicId: image.public_id,
            url: image.secure_url,
        });
    } catch(error) {
        console.log(error);
    }
}