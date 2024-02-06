import { styled } from 'styled-components';
import Swal from 'sweetalert2';
// 상태 초기화
import { useSetRecoilState } from 'recoil';
import {
    completeState,
    dateState,
    failState,
    listState,
    titleState,
} from './data/habitData';

const ResetButton = styled.button`
    position: absolute;
    top: 2%;
    right: 4%;
    font-size: var(--font-size-micro);
    font-weight: 800;
    color: var(--accent-100);
    border: 2px solid var(--accent-100);
    border-radius: 4px;
    padding: 2px 4px;
    transition: 300ms all;
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

export default function Reset({ habitNumber }) {
    // persist list
    const resetTitle = useSetRecoilState(titleState);
    const resetComplete = useSetRecoilState(completeState);
    const resetFail = useSetRecoilState(failState);
    const resetList = useSetRecoilState(listState);
    const resetDate = useSetRecoilState(dateState);

    const handleReset = () => {
        Swal.fire({
            title: 'Are you sure?',
            showDenyButton: true,
            confirmButtonText: 'Reset',
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                // 저장된 상태 초기화
                resetTitle((prev) => {
                    const newTitle = prev.map((item) => {
                        return { ...item };
                    });
                    newTitle[habitNumber] = {
                        id: habitNumber,
                        value: '',
                        isActive: false,
                        submitted: false,
                    };
                    return newTitle;
                });
                resetComplete((prev) => {
                    const newComplete = prev.map((item) => {
                        return { ...item };
                    });
                    newComplete[habitNumber] = {
                        id: habitNumber,
                        value: '',
                        submitted: false,
                        count: 0,
                    };
                    return newComplete;
                });
                resetFail((prev) => {
                    const newFail = prev.map((item) => {
                        return { ...item };
                    });
                    newFail[habitNumber] = {
                        id: habitNumber,
                        value: '',
                        submitted: false,
                        count: 0,
                    };
                    return newFail;
                });
                resetList((prev) => {
                    const newList = [...prev];
                    newList[habitNumber] = Array.from(
                        { length: 66 },
                        (_, index) => ({
                            id: index,
                            value: index + 1 + '일차',
                        })
                    );
                    return newList;
                });
                resetDate((prev) => {
                    const newDate = prev.map((item) => {
                        return { ...item };
                    });
                    newDate[habitNumber] = {
                        id: habitNumber,
                        start: '',
                        submitted: false,
                    };
                    return newDate;
                });
                Swal.fire('Reset complete', '', 'success');
            } else if (result.isDenied) {
                return;
            }
        });
    };

    return <ResetButton onClick={handleReset}>Reset</ResetButton>;
}
