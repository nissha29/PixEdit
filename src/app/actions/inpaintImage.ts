'use server'

import { ImageEditType } from "@/types/types";
import axios from "axios"

export default async function inpaintImage(data: ImageEditType) {
    const apiKey = process.env.HF_API_KEY;
    console.log('im here');
    if (!data.inputs) {
        throw new Error('dataURL invalid');
    }

    const response = await axios.post(
        "https://router.huggingface.co/fal-ai/fal-ai/qwen-image-edit?_subdomain=queue",
        {
            "inputs": data.inputs,
            "parameters": data.parameters,
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
            responseType: 'arraybuffer',
        }
    )
    console.log('im here after api');
    console.log(response.data.response_url);

    return response.data;
}
