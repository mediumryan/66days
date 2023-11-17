import { styled } from 'styled-components';
// 상태 초기화
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
    completeCountState,
    completeState,
    completeSubmitted,
    dateSubmitted,
    failCountState,
    failState,
    failSubmitted,
    listState,
    resetState,
    startDateState,
    titleState,
    titleSubmitted,
} from './data/habitData';

const ResetButton = styled.button`
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: var(--font-size-micro);
    font-weight: 800;
    color: var(--accent-100);
    border: 2px solid var(--accent-100);
    border-radius: 4px;
    padding: 2px 4px;
    &:hover {
        color: var(--primary-200);
        border: 2px solid var(--primary-200);
        transform: scale(1.05);
    }
`;

const ResetModal = styled.div`
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 50%;
    background-color: rgba(0, 0, 0, 0.85);
    color: orange;
    z-index: 5;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    span {
        font-size: var(--font-size-medium);
    }
    div {
        button {
            font-size: var(--font-size-micro);
            color: orange;
            border: 1px solid orange;
            border-radius: 4px;
            padding: var(--padding-micro) var(--padding-medium);
            margin: var(--margin-micro);
        }
    }
`;

export default function Reset() {
    const [reset, setReset] = useRecoilState(resetState);
    // persist list
    const resetTitle = useResetRecoilState(titleState);
    const resetTitleSubmitted = useResetRecoilState(titleSubmitted);
    const resetComplete = useResetRecoilState(completeState);
    const resetCompleteSubmitted = useResetRecoilState(completeSubmitted);
    const resetCompleteCount = useResetRecoilState(completeCountState);
    const resetFail = useResetRecoilState(failState);
    const resetFailSubmitted = useResetRecoilState(failSubmitted);
    const resetFailCount = useResetRecoilState(failCountState);
    const resetStartDate = useResetRecoilState(startDateState);
    const resetDateSubmitted = useResetRecoilState(dateSubmitted);
    const resetList = useResetRecoilState(listState);

    const handleReset = () => {
        setReset((prev) => !prev);
        // 저장된 상태 초기화
        resetTitle();
        resetTitleSubmitted();
        resetComplete();
        resetCompleteSubmitted();
        resetCompleteCount();
        resetFail();
        resetFailSubmitted();
        resetFailCount();
        resetStartDate();
        resetDateSubmitted();
        resetList();
    };

    return (
        <>
            <ResetButton
                onClick={() => {
                    setReset((prev) => !prev);
                }}
            >
                Reset
            </ResetButton>
            {reset ? (
                <ResetModal>
                    <span>Are you Sure?</span>
                    <div>
                        <button onClick={handleReset}>Y</button>
                        <button
                            onClick={() => {
                                setReset((prev) => !prev);
                            }}
                        >
                            N
                        </button>
                    </div>
                </ResetModal>
            ) : null}
        </>
    );
}
