import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import {
    completeState,
    dateState,
    failState,
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

const ListTitle = styled.span``;

const ListDate = styled.span`
    font-size: calc(var(--font-size-micro) * 0.75);
    margin: var(--margin-small) 0;
`;

const ListButton = styled.div`
    display: flex;
    align-items: center;
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
    const title = useRecoilValue(titleState);
    // setting list date
    const date = useRecoilValue(dateState);
    const [listDate, setListDate] = useRecoilState(listDateState);
    console.log(listDate);
    // const currentDate = new Date(date[habitNumber].start);
    // currentDate.setDate(currentDate.getDate() + item.id);
    // const listDate = currentDate.toLocaleDateString('ko-KR');
    // handle complete
    const [complete, setComplete] = useRecoilState(completeState);
    const handleComplete = () => {
        if (complete[habitNumber].count < 65) {
            setComplete((prev) => {
                const newComplete = prev.map((item) => {
                    return { ...item };
                });
                newComplete[habitNumber].count++;
                return newComplete;
            });
            setList((prev) => {
                const newList = [...prev];
                if (newList.length > 0 && newList[habitNumber].length > 1) {
                    newList[habitNumber] = newList[habitNumber].slice(1);
                }
                return newList;
            });
        } else if (complete[habitNumber].count === 65) {
            setComplete((prev) => {
                const newComplete = prev.map((item) => {
                    return { ...item };
                });
                newComplete[habitNumber].count++;
                return newComplete;
            });
            setList((prev) => {
                const newList = [...prev];
                if (newList.length > 0 && newList[habitNumber].length > 1) {
                    newList[habitNumber] = newList[habitNumber].slice(1);
                }
                return newList;
            });
            alert('Project complete. Congratulation!');
        } else {
            return;
        }
    };
    // handle fail
    const [fail, setFail] = useRecoilState(failState);
    const handleFail = () => {
        if (fail[habitNumber].count < 2) {
            setFail((prev) => {
                const newFail = prev.map((item) => {
                    return { ...item };
                });
                newFail[habitNumber].count++;
                return newFail;
            });
            setList((prev) => {
                const newList = [...prev];
                if (newList.length > 0 && newList[habitNumber].length > 1) {
                    newList[habitNumber] = newList[habitNumber].slice(1);
                }
                return newList;
            });
        } else if (fail[habitNumber].count === 2) {
            setFail((prev) => {
                const newFail = prev.map((item) => {
                    return { ...item };
                });
                newFail[habitNumber].count++;
                return newFail;
            });
            setList((prev) => {
                const newList = [...prev];
                if (newList.length > 0 && newList[habitNumber].length > 1) {
                    newList[habitNumber] = newList[habitNumber].slice(1);
                }
                return newList;
            });
            alert('Project fail.');
        } else {
            return;
        }
    };

    return (
        <ListItemContainer>
            <ListTitle>
                {title[habitNumber].value !== ''
                    ? `${title[habitNumber].value} ${item.value}`
                    : 'Title is not defined'}
            </ListTitle>
            <ListDate>
                {date[habitNumber].start === ''
                    ? 'Start date is not defined'
                    : date[habitNumber].start}
            </ListDate>
            <ListButton>
                <button
                    onClick={() => {
                        handleComplete(item);
                    }}
                >
                    Complete
                </button>
                <button
                    onClick={() => {
                        handleFail(item);
                    }}
                >
                    Fail
                </button>
            </ListButton>
        </ListItemContainer>
    );
}
