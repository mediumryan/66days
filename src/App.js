import { styled } from 'styled-components';
import './CSS/index.css';
import Title from './Components/Title/Title';
import List from './Components/List/List';
import Complete from './Components/CompleteFail/Complete';
import Fail from './Components/CompleteFail/Fail';
import Progress from './Components/Progress/Progress';

const MainWrapper = styled.div`
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

function App() {
    return (
        <MainWrapper>
            <TagName>Make habit this</TagName>
            <Title />
            <TagName>Progress</TagName>
            <Progress />
            <TagName>Check List</TagName>
            <List />
            <TagName>Complete</TagName>
            <Complete />
            <TagName>Fail</TagName>
            <Fail />
        </MainWrapper>
    );
}

export default App;
