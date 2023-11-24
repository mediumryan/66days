import { styled } from 'styled-components';

const AlertModalWrapper = styled.div`
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100vh;
    display: none;
    justify-content: center;
    align-items: center;
`;

export default function AlertModal() {
    return <AlertModalWrapper>AlertModal</AlertModalWrapper>;
}
