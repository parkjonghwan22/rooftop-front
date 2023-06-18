import { useState, ChangeEvent } from "react"

export const useInput = (initialValue?: string) => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const clear = () => {
        setValue('')
    }

    return {
        value,
        onChange,
        clear,
    }
}