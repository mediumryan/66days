import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import {
    completeCountState,
    dateSubmitted,
    failCountState,
    listState,
    startDateState,
    titleState,
} from '../../atom';

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

export default function ListItem({ item }) {
    const title = useRecoilValue(titleState);
    // setting list date
    const startDate = useRecoilValue(startDateState);
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + item.id);
    const listDate = currentDate.toLocaleDateString('ko-KR');
    const isDate = useRecoilValue(dateSubmitted);
    // handle complete
    const setCompleteCount = useSetRecoilState(completeCountState);
    const [list, setList] = useRecoilState(listState);
    const handleComplete = (item) => {
        const copy = [...list];
        const newList = copy.filter((a) => a.id !== item.id);
        setList(newList);
        setCompleteCount((prev) => prev + 1);
    };
    // handle fail
    const [failCount, setFailCount] = useRecoilState(failCountState);
    const handleFail = () => {
        if (failCount < 2) {
            const copy = [...list];
            const newList = copy.filter((a) => a.id !== item.id);
            setList(newList);
            setFailCount((prev) => prev + 1);
        } else {
            setList([]);
            alert('project fail');
        }
    };

    console.log(dateSubmitted);

    return (
        <ListItemContainer>
            <ListTitle>
                {title} {item.value}
            </ListTitle>
            <ListDate>
                {isDate === true ? listDate : 'Data is not found'}
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
