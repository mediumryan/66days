import { styled } from 'styled-components';
import './CSS/index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Habit from './Pages/Habit';
import Navigation from './Components/Navigation/Navigation';
import FailModal from './Components/Modal/FailModal';
import Test from './Pages/Test';

const MainContainer = styled.div`
    position: relative;
`;

function App() {
    return (
        <MainContainer>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/habit/:id" element={<Habit />} />
                <Route path="/test" element={<Test />} />
            </Routes>
            <FailModal />
        </MainContainer>
    );
}

export default App;
