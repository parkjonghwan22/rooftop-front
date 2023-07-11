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

export const NFTGenerator = ({ state, setState, description }: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/image/generation",
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNmRhM2E0NDQtYjM3NS00YmI0LTliYTYtNjc3Y2Y2NGJkNDY5IiwidHlwZSI6ImFwaV90b2tlbiJ9.rhbuXVvCn6AcNK3lLG3XGw1u0G74VgK70D92bLlQR9M`,
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

        const file = new File([blob], 'generated_image.png');
        const arrayBuffer = await file.arrayBuffer();
        const bytes = Array.from(new Uint8Array(arrayBuffer));
        const contentType = 'image/png';
        const fileName = file.name.replace(/\.[^/.]+$/, '');

        fetch('/api/verify-image', {
          method: 'POST',
          body: JSON.stringify({
            bytes,
            contentType,
            fileName,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setState(data.IpfsHash);
          })
          .catch((error) => console.log(error));    
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!description) return <LoadingSpinner />;
  return (
    <div>
      <Button color="red" onClick={handleApiRequest}>
        {isLoading ? (
          <>
            <LoadingSpinner />Pending...
          </>
        ) : (
          "Auto Generate"
        )}
      </Button>
    </div>
  );
};
