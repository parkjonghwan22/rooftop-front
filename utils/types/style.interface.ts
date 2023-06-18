export interface StyledOptions {
    [key: string]: string;
}

export interface StyledProps {
    width?: string;
    height?: string;
    size?: string;
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    activatedColor?: string;
    children: React.ReactNode;
};