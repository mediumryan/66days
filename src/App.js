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
`;

export const TagName = styled.h3`
    color: red;
    font-size: var(--font-size-medium);
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
