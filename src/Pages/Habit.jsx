import { styled } from 'styled-components';
import Reset from '../Reset';
import Title from '../Components/Title/Title';
import Progress from '../Components/Progress/Progress';
import List from '../Components/List/List';
import Complete from '../Components/CompleteFail/Complete';
import Fail from '../Components/CompleteFail/Fail';
import { useRecoilValue } from 'recoil';
import { completeState, failState } from '../data/habitData';
import { useParams } from 'react-router-dom';

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

export default function Habit() {
    const { id } = useParams();
    const complete = useRecoilValue(completeState);
    const fail = useRecoilValue(failState);

    return (
        <PageWrapper>
            <Reset habitNumber={id} />
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