'use client'

import inpaintImage from '@/app/actions/inpaintImage'
import { useImagePreviewStore } from '@/store/store'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export default function AIEditor() {
  const [prompt, setPrompt] = useState('')
  const [submittedPrompt, setSubmittedPrompt] = useState('')
  const { dataURL, setDataURL } = useImagePreviewStore();

  const { mutate, data, isPending, error } = useMutation({
    mutationKey: ['prompt'],
    mutationFn: () => inpaintImage({
      inputs: dataURL,
      parameters: {
        prompt
      }
    }),
    onSuccess: () => {
      setSubmittedPrompt(prompt)
      if(data) {
        setDataURL(data);
      }
      setPrompt('')
    },
    onError: () => {
      console.log(error);
    }
  })

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
        onClick={() => mutate()}
        disabled={isPending}
        className="w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-md text-white font-medium transition"
      >
        {isPending ? 'Loading...' : 'Submit'}
      </button>

      <div className='text-neutral-200 text-xl mt-6'>Instructions</div>
      <p className="text-neutral-400 -mt-4">
        Write a prompt above describing how you want your image to be edited.
        Our AI will process it and return the edited image based on your instructions.
      </p>

      {submittedPrompt && (
        <p className="mt-4 text-neutral-200 text-center">
          Last submitted prompt: {submittedPrompt}
        </p>
      )}
    </div>
  )
}
