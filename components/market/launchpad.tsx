import { useState, useEffect } from "react";
import { Button } from "@components/common/button";
import { CheckBox } from "@components/common/checkbox/checkbox";
import {
  FileInputBox,
  InputBox,
  TextArea,
  InputCheck,
} from "@components/common/input";
import {
  LaunchPadWrapper,
  FormContainer,
  SectionTitle,
  Label,
} from "./styled/launchpad.styled";
import { useInput } from "@utils/hooks/useInput";
import { useEthers } from "@utils/hooks/useEthers";
import request from "@utils/request";
import { LoadingSpinner } from "@components/common/loading/loading";
import { Alert } from "@components/common/alert";

interface LaunchPadProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LaunchPad = ({ setIsOpenModal }: LaunchPadProps) => {
  const { factory, provider, signer } = useEthers();

  const [collectionLogo, setCollectionLogo] = useState("");
  const [creatorFee, setCreatorFee] = useState("0%");
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const collectionName = useInput("");
  const collectionSymbol = useInput("");
  const collectionUrl = useInput("");
  const collectionDescription = useInput("");

  const handleCheckBox = (option: string) => {
    setCreatorFee(option);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputId = e.target.id;
      setIsFocused(inputId);

      const { data } = await request.post("collection/check", {
        [`${inputId}`]: e.target.value,
      });
      !data ? setIsDuplicated(true) : setIsDuplicated(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (!factory || !signer) return;

      const factoryTransaction = await factory.getDeployTransaction(
        collectionName.value,
        collectionSymbol.value
      );
      const deployedTransaction = await signer.sendTransaction(
        factoryTransaction
      );
      const receipt = await deployedTransaction.wait();
      if (!receipt) throw new Error("Transaction failed");
      console.log(receipt.contractAddress);

      const { data } = await request.post("collection/create", {
        address: receipt.contractAddress,
        creator: receipt.from,
        name: collectionName.value,
        symbol: collectionSymbol.value,
        description: collectionDescription.value,
        url: collectionUrl.value,
        logo: collectionLogo,
        creatorFee,
      });
      if (data) {
        await request.put("auth/update", {
          address: receipt.from,
          hasCollection: true,
        });
        setIsLoading(false);
        setIsOpenModal(false);
        setIsOpenAlert(true);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (signer) console.log(factory, provider, signer);
  }, [factory, provider, signer]);

  return (
    <>
      <LaunchPadWrapper>
        <FormContainer onSubmit={handleSubmit}>
          <SectionTitle>자신만의 NFT 컬렉션을 만들어주세요</SectionTitle>
          <Label htmlFor="name">컬렉션 이름</Label>
          <InputBox
            value={collectionName.value}
            onChange={collectionName.onChange}
            onInput={handleInputChange}
            name="name"
            icon="mdi:collection"
            placeholder="컬렉션의 이름을 정해주세요"
          />
          <InputCheck
            id="name"
            isFocused={isFocused}
            isDuplicated={isDuplicated}
          />
          <Label htmlFor="symbol">심볼</Label>
          <InputBox
            value={collectionSymbol.value}
            onChange={collectionSymbol.onChange}
            onInput={handleInputChange}
            name="symbol"
            icon="ri:nft-fill"
            placeholder="심볼명을 적어주세요"
          />
          <InputCheck
            id="symbol"
            isFocused={isFocused}
            isDuplicated={isDuplicated}
          />
          <Label htmlFor="description">세부 설명</Label>
          <TextArea
            value={collectionDescription.value}
            onChange={collectionDescription.onChange}
            id="description"
            placeholder="당신의 컬렉션을 소개해주세요"
          />
          <Label htmlFor="url">컬렉션 주소</Label>
          <InputBox
            value={collectionUrl.value}
            onChange={collectionUrl.onChange}
            onInput={handleInputChange}
            name="url"
            icon="mdi:web"
            placeholder="URL에는 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다"
          />
          <InputCheck
            id="url"
            isFocused={isFocused}
            isDuplicated={isDuplicated}
          />
          <Label htmlFor="creatorFee">로열티 설정</Label>
          <CheckBox
            options={["0%", "2.5%", "5%"]}
            onChange={handleCheckBox}
            selectedOption={creatorFee}
          />
          <Label htmlFor="logo">대표 이미지 등록</Label>
          <FileInputBox state={collectionLogo} setState={setCollectionLogo} />
          {isLoading ? (
            <Button type="submit" color="blue" disabled>
              <LoadingSpinner /> 등록중...
            </Button>
          ) : (
            <Button type="submit" color="blue">
              컬렉션 등록
            </Button>
          )}
        </FormContainer>
      </LaunchPadWrapper>
      <Alert
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        color="green"
      >
        컬렉션이 생성되었습니다
      </Alert>
    </>
  );
};
