import { styled } from 'styled-components';
import Reset from '../Reset';
import Title from '../Components/Title/Title';
import Progress from '../Components/Progress/Progress';
import List from '../Components/List/List';
import Complete from '../Components/CompleteFail/Complete';
import Fail from '../Components/CompleteFail/Fail';
import { useRecoilValue } from 'recoil';
import { completeState, failState } from '../data/habitData';
import { useNavigate, useParams } from 'react-router-dom';
// import icons
import { FaBackward } from 'react-icons/fa';

export const PageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: var(--padding-medium-large);
    padding-bottom: 5rem;
    background-color: var(--bg-100);
    color: var(--text-100);
    overflow-y: scroll;
`;

export const TagName = styled.h3`
    color: var(--primary-200);
    font-size: var(--font-size-medium);
    margin: var(--margin-medium) 0;
`;

const GoBack = styled(FaBackward)`
    position: absolute;
    top: 2.5%;
    left: 5%;
    font-size: var(--font-size-micro);
    color: var(--accent-100);
    transition: 300ms all;
    &:hover {
        color: var(--primary-200);
        transform: scale(1.05);
    }
`;

export default function Habit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const complete = useRecoilValue(completeState);
    const fail = useRecoilValue(failState);

    return (
        <PageWrapper>
            <Reset habitNumber={id} />
            <GoBack
                onClick={() => {
                    navigate(-1);
                }}
            />
            <TagName>Habit</TagName>
            <Title habitNumber={id} />
            <TagName>Progress</TagName>
            <Progress habitNumber={id} />
            <TagName>Check List</TagName>
            <List habitNumber={id} />
            <TagName>Complete ({complete[id].count})</TagName>
            <Complete habitNumber={id} />
            <TagName>Fail ({fail[id].count})</TagName>
            <Fail habitNumber={id} />
        </PageWrapper>
    );
}
