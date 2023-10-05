import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { startDateState, titleState } from '../../atom';

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

    const startDate = useRecoilValue(startDateState);

    const currentDate = new Date(startDate); // 문자열을 Date 객체로 변환

    // 다음 날을 구하기 위해 현재 날짜를 가져와서 하루를 더합니다.
    currentDate.setDate(currentDate.getDate() + item.id);

    // 다음 날짜를 원하는 형식으로 포맷
    const listDate = currentDate.toLocaleDateString('ko-KR');

    return (
        <ListItemContainer>
            <ListTitle>
                {title} {item.value}
            </ListTitle>
            <ListDate>{listDate}</ListDate>
            <ListButton>
                <button>Complete</button>
                <button>Fail</button>
            </ListButton>
        </ListItemContainer>
    );
}
