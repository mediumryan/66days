import { useRecoilState, useRecoilValue } from 'recoil';
import { keyframes, styled } from 'styled-components';
import { failModalState, failTitleState } from '../../data/habitData';
import { FaUndoAlt } from 'react-icons/fa';

const FailModalWrapper = styled.div`
    background-color: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: center;
    & > div {
        display: flex;
        flex-direction: column;
        color: var(--bg-200);
        font-size: 1.5rem;
        margin-top: 30%;
        padding: 0 2rem;
        p {
            text-align: center;
            margin-bottom: 5rem;
        }
    }
`;

const NeverGiveUp = styled.p`
    font-size: 1.5rem;
    color: var(--primary-100);
    display: flex;
    flex-direction: column;
    span {
        margin-bottom: 1.5rem;
    }
`;

const FailModalCloseBtn = styled.button`
    position: absolute;
    top: 2%;
    right: 5%;
    color: var(--primary-100);
    font-size: 2rem;
`;

const rotateAnimation = keyframes`
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
`;

const FailModalRetry = styled.button`
    color: var(--accent-100);
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
        margin-bottom: 1rem;
    }
    svg {
        animation: ${rotateAnimation} 3s linear infinite;
        &:hover {
            animation: none;
        }
    }
`;

export default function FailModal() {
    const [failModal, setFailModal] = useRecoilState(failModalState);
    const failTitle = useRecoilValue(failTitleState);

    return (
        <FailModalWrapper style={{ display: failModal ? 'flex' : 'none' }}>
            <div>
                <p>The ' {failTitle} ' project failed.</p>
                <p>Data will be reset.</p>
                <NeverGiveUp>
                    <span>Never give up,</span>
                    <span>You can do it!</span>
                </NeverGiveUp>
                <FailModalRetry
                    onClick={() => {
                        setFailModal(false);
                    }}
                >
                    <span>Retry</span>
                    <FaUndoAlt />
                </FailModalRetry>
            </div>
            <FailModalCloseBtn
                onClick={() => {
                    setFailModal(false);
                }}
            >
                X
            </FailModalCloseBtn>
        </FailModalWrapper>
    );
}
