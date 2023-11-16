import { styled } from 'styled-components';
import Reset from '../Reset';
import Title from '../Components/Title/Title';
import Progress from '../Components/Progress/Progress';
import List from '../Components/List/List';
import Complete from '../Components/CompleteFail/Complete';
import Fail from '../Components/CompleteFail/Fail';
import { useRecoilValue } from 'recoil';
import { completeCountState, failCountState } from '../atom';

export const PageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    padding: var(--padding-medium-large);
    background-color: var(--bg-100);
    color: var(--text-100);
    overflow-y: scroll;
`;

export const TagName = styled.h3`
    color: var(--primary-200);
    font-size: var(--font-size-medium);
    margin: var(--margin-medium) 0;
`;

export default function Habit1() {
    const complete = useRecoilValue(completeCountState);
    const fail = useRecoilValue(failCountState);

    return (
        <PageWrapper>
            <Reset />
            <TagName>Habit</TagName>
            <Title />
            <TagName>Progress</TagName>
            <Progress />
            <TagName>Check List</TagName>
            <List />
            <TagName>Complete ({complete})</TagName>
            <Complete />
            <TagName>Fail ({fail})</TagName>
            <Fail />
        </PageWrapper>
    );
}
