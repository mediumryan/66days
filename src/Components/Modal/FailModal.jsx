import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { failModalState } from '../../data/habitData';

const FailModalWrapper = styled.div`
    background-color: red;
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    button {
        color: green;
        font-size: 64px;
    }
`;

export default function FailModal() {
    const [failModal, setFailModal] = useRecoilState(failModalState);

    return (
        <FailModalWrapper style={{ display: failModal ? 'flex' : 'none' }}>
            <button
                onClick={() => {
                    setFailModal(false);
                }}
            >
                X
            </button>
        </FailModalWrapper>
    );
}
