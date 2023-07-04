import request from "@utils/request";
import { CollectionData } from "@utils/types/nft.interface";
import { useState } from "react";

export const useSearch = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchWord, setSearchWord] = useState("");
    const [searchResult, setSearchResult] = useState<CollectionData[]>([]);

    const handleChange = async () => {
        if (searchWord.length < 2) {
            setSearchResult([]);
            return;
        }

        try {
            setIsLoading(true)
            const { data } = await request.get(`collection?search=${searchWord}`);
            if (data)
                setIsLoading(false)
            setSearchResult(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWord(e.target.value);
        handleChange();
    };

    return { searchWord, searchResult, isLoading, handleSearch };
};

