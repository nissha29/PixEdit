'use client'

import { useImagePreviewStore } from '@/store/store'
import { useState } from 'react'
import axios from 'axios'

export default function AIEditor() {
  const [prompt, setPrompt] = useState('')
  const [submittedPrompt, setSubmittedPrompt] = useState('')
  const [isPending, setIsPending] = useState(false);
  const { setDataURL } = useImagePreviewStore();

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      if (!prompt) throw new Error("Prompt is required");

      const response = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?nologo=true`, {
        responseType: 'blob'
      });
      if (!response) {
        throw new Error(`Image fetch failed`);
      }

      const blob = response.data as Blob;
      if (!blob || blob.size === 0) {
        throw new Error("Image fetch failed: empty blob");
      }

      setSubmittedPrompt(prompt);
      setPrompt('');
      setIsPending(false);

      const objectUrl = URL.createObjectURL(blob);
      setDataURL(objectUrl);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="space-y-6 p-4 rounded-xl text-neutral-200">
      <h1 className="text-xl font-semibold mb-4">AI Image Editing</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your editing prompt here..."
        className="mt-5 w-full p-3 rounded-md bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        rows={5}
      />

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-medium transition hover:cursor-pointer"
      >
        {isPending ? 'Loading...' : 'Submit'}
      </button>

      <div className='text-neutral-200 text-xl mt-6'>Instructions</div>
      <p className="text-neutral-400 -mt-4">
        Write a prompt above describing the image you want to generate. Our AI will create the image, and you can then refine or edit it further in the Pixedit editor.
      </p>

      {submittedPrompt && (
        <div className="mt-4 text-neutral-200">
          Last submitted prompt: <p className='text-neutral-400'>{submittedPrompt}</p>
        </div>
      )}
    </div>
  )
}
