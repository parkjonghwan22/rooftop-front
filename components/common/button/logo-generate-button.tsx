import axios from "axios";
import config from "../../../config";
import { Button } from "./button";
import { useState } from "react";
import { LoadingSpinner } from "../loading";
import request from "@utils/request";

interface ButtonProps {
  state: string;
  setState: (state: string) => void;
  description: string | undefined;
}


export const LogoGenerator = ({ state, setState, description }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/image/generation",
    headers: {
      authorization: `Bearer ${config.EDEN_API_TOKEN}`,
    },
    data: {
      providers: "openai",
      text: description,
      resolution: "512x512",
    },
  };

  const handleApiRequest = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      if (response.data.openai.status === "success") {
        const base64Image = response.data.openai.items[0].image;
        const blob = await fetch(`data:image/png;base64,${base64Image}`).then((res) => res.blob());

        const body = new FormData();
        body.append("file", blob, "generated_image.png");

        const { data } = await request.post("file/upload", body, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data) {
          setState(data.fileUrl);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!description) return null;
  return (
    <div>
      <Button color="red" onClick={handleApiRequest}>
        {isLoading ? (
          <>
            <LoadingSpinner />Pending...
          </>
        ) : (
          "AI Generate"
        )}
      </Button>
    </div>
  );
};
