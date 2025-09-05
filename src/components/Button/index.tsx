import { Container } from "./styles";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
}

export default function Button({ children, ...otherProps }: ButtonProps) {
    return (
        <Container {...otherProps}>
            {children}
        </Container>
    );
}