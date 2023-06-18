import { CheckBoxWrapper, OptionWrapper, Input, Label } from "./styled/checkbox.styled";

interface CheckBoxProps {
    options: string[];
    selectedOption: string;
    onChange: (value: string) => void;
}

export const CheckBox = ({ selectedOption, options, onChange }: CheckBoxProps) => {

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
      };

    const radioOptions = () => {
      return options.map((item: string, index: number) => (
        <OptionWrapper key={index}>
          <div className="flex items-center pl-3">
            <Input 
                id={`${index}`}             
                type="radio"
                value={item}
                checked={selectedOption === item}
                onChange={handleOptionChange}
              />
            <Label htmlFor={`${index}`}>{item}</Label>
          </div>
        </OptionWrapper>
      ));
    };
  
    return (
      <CheckBoxWrapper>
        {radioOptions()}
      </CheckBoxWrapper>
    );
  };

function useState(arg0: string): [any, any] {
    throw new Error("Function not implemented.");
}
