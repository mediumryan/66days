import { styled } from 'styled-components';
import './CSS/index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Habit from './Pages/Habit';
import Navigation from './Components/Navigation/Navigation';
import AlertModal from './Components/Modal/AlertModal';

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
            </Routes>
            <AlertModal />
        </MainContainer>
    );
}

export default App;
