export interface InputType {
    type?: string;
    id?: string;
    name?: string;
    placeholder?: string;
    fontSize?: string;
    value: string | number | undefined;
    icon?: string | any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
