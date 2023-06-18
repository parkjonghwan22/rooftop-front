import { Icon } from '@iconify/react';
import request from '@utils/request';


interface FileInputProps {
    state: string;
    setState: (state: string) => void;
}

export const FileInputCircle = ({ state, setState }: FileInputProps) => {

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const body = new FormData();
        body.append("file", file);
        console.log(body, file)

        try {
            const { data } = await request.post("file/upload", body, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setState(data.fileUrl);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-36 h-36 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-full">
                    {(state)
                        ? <img src={state} />
                        : <Icon icon="fluent:camera-add-20-filled" className="w-12 h-12 text-gray-400" />
                    }
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>
        </div>
    )
}