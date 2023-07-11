import { Icon } from '@iconify/react'
import request from '@utils/request'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

interface FileNftInputProps {
    state: string
    id: string
    name: string
    type: string
    setState: (state: string) => void
}

export const FileNftInputBox = ({ state, setState, id, name, type }: FileNftInputProps) => {
    const pending = () => toast.info('Image Uploading...')
    const success = () => toast.success('Image upload successfully completed. Press the button to create your NFT')
    const [previewImage, setPreviewImage] = useState('')
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        const file = e.target.files?.[0]
        const buffer = await file.arrayBuffer()
        const bytes = new Uint8Array(buffer)
        console.log(file, buffer, bytes)

        const body = new FormData()
        body.append('file', file)
        console.log(body, file)

        try {
            pending()
            fetch('/api/verify-image', {
                method: 'POST',
                body: JSON.stringify({
                    bytes: Array.from(bytes),
                    contentType: file.type,
                    fileName: file.name.replace(/\.[^/.]+$/, ''),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setState(data.IpfsHash)
                    setPreviewImage(URL.createObjectURL(file))
                    URL.revokeObjectURL(previewImage)
                    success()
                })
                .catch((error) => console.log(error))
        } catch (e: any) {
            console.log(e.message)
        }
    }
    console.log(`state:`, state)

    return (
        <div className="flex items-center justify-center w-full">
            <label
                htmlFor="dropzone-file"
                className="mb-5 flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 overflow-hidden rounded-lg">
                    {state ? (
                        <img src={previewImage} />
                    ) : (
                        <>
                            <Icon icon="bx:image-add" className="w-12 h-12 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">이미지 파일을 선택해주세요</span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG or GIF (최대 1MB)
                            </p>
                        </>
                    )}
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    )
}
