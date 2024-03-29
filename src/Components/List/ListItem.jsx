import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Swal from 'sweetalert2';
// import state data
import {
    completeState,
    dateState,
    failModalState,
    failState,
    failTitleState,
    listDateState,
    listState,
    titleState,
} from '../../data/habitData';

const ListItemContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--margin-medium);
    padding: var(--padding-medium) 0;
    font-size: var(--font-size-micro);
    border-bottom: 1px solid var(--accent-100);
`;

const ListTitle = styled.span`
    font-weight: 700;
`;

const ListDate = styled.span`
    font-size: calc(var(--font-size-micro) * 0.75);
    margin: var(--margin-small) 0;
    margin: 0.75rem 0;
`;

const ListButton = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    button {
        font-size: var(--font-size-micro);
        color: var(--accent-100);
        background-color: var(--primary-200);
        margin: 0 var(--margin-small);
        padding: var(--padding-double-small);
        border-radius: 10px;
        transition: 300ms opacity;
        &:hover {
            opacity: 0.5;
        }
    }
`;

export default function ListItem({ item, habitNumber }) {
    const [list, setList] = useRecoilState(listState);
    const [title, setTitle] = useRecoilState(titleState);
    // setting list date
    const [date, setDate] = useRecoilState(dateState);
    const listDate = useRecoilValue(listDateState);
    // handle complete
    const setComplete = useSetRecoilState(completeState);
    const handleComplete = () => {
        if (title[habitNumber].submitted && date[habitNumber].submitted) {
            if (list[habitNumber].length > 1) {
                setComplete((prev) => {
                    const newComplete = prev.map((item) => {
                        return { ...item };
                    });
                    newComplete[habitNumber].count++;
                    return newComplete;
                });
                setList((prev) => {
                    const newList = [...prev];
                    newList[habitNumber] = newList[habitNumber].slice(1);
                    return newList;
                });
            } else if (list[habitNumber].length === 1) {
                Swal.fire({
                    title: 'Congratulation!',
                    showDenyButton: true,
                    confirmButtonText: 'Reset',
                    denyButtonText: `Cancel`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        // 저장된 상태 초기화
                        setTitle((prev) => {
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
                        setComplete((prev) => {
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
                        setFail((prev) => {
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
                        setList((prev) => {
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
                        setDate((prev) => {
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
            } else {
                return;
            }
        } else {
            Swal.fire({
                title: 'Habit or Date is not defined.',
                icon: 'warning',
            });
        }
    };
    // handle fail
    const [fail, setFail] = useRecoilState(failState);
    const setFailModal = useSetRecoilState(failModalState);
    const setFailTitle = useSetRecoilState(failTitleState);
    const handleFail = () => {
        if (title[habitNumber].submitted && date[habitNumber].submitted) {
            if (fail[habitNumber].count === 0) {
                setFail((prev) => {
                    const newFail = prev.map((item) => {
                        return { ...item };
                    });
                    newFail[habitNumber].count++;
                    return newFail;
                });
                setList((prev) => {
                    const newList = [...prev];
                    if (newList[habitNumber].length > 1) {
                        newList[habitNumber] = newList[habitNumber].slice(1);
                    }
                    return newList;
                });
            } else if (fail[habitNumber].count === 1) {
                Swal.fire({
                    title: 'There is one chance left.',
                    icon: 'warning',
                });
                setFail((prev) => {
                    const newFail = prev.map((item) => {
                        return { ...item };
                    });
                    newFail[habitNumber].count++;
                    return newFail;
                });
                setList((prev) => {
                    const newList = [...prev];
                    if (newList[habitNumber].length === 2) {
                        newList[habitNumber] = newList[habitNumber].slice(1);
                    }
                    return newList;
                });
            } else if (fail[habitNumber].count === 2) {
                setFailTitle(title[habitNumber].value);
                setTitle((prev) => {
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
                setComplete((prev) => {
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
                setFail((prev) => {
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
                setList((prev) => {
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
                setDate((prev) => {
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
                setFailModal(true);
            } else {
                return;
            }
        } else {
            Swal.fire({
                title: 'Habit or Date is not defined.',
                icon: 'warning',
            });
        }
    };

    return (
        <ListItemContainer>
            <ListTitle>
                {title[habitNumber].value !== ''
                    ? `${title[habitNumber].value} ${item.value}`
                    : 'Empty'}
            </ListTitle>
            <ListDate>
                {date[habitNumber].start === ''
                    ? 'Undefined'
                    : listDate[habitNumber][item.id]}
            </ListDate>
            <ListButton>
                <button
                    onClick={() => {
                        handleComplete();
                    }}
                >
                    Complete
                </button>
                <button
                    onClick={() => {
                        handleFail();
                    }}
                    style={{
                        backgroundColor:
                            fail[habitNumber].count === 2
                                ? '#FF4D4D'
                                : '#61398f',
                    }}
                >
                    Fail
                </button>
            </ListButton>
        </ListItemContainer>
    );
}
