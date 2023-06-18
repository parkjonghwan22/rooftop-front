interface TextAreaType {
    id?: string;
    name?: string;
    placeholder?: string;
    value: string | number | undefined;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({ value, onChange, name, placeholder }: TextAreaType) => {

    return (
        <textarea value={value} onChange={onChange} id={name} name={name} placeholder={placeholder} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
    )
}