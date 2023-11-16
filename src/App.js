import { styled } from 'styled-components';
import './CSS/index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Habit1 from './Pages/Habit1';
import Habit2 from './Pages/Habit2';
import Habit3 from './Pages/Habit3';
import Habit4 from './Pages/Habit4';
import Habit5 from './Pages/Habit5';
import Navigation from './Components/Navigation/Navigation';

const MainContainer = styled.div``;

function App() {
    return (
        <MainContainer>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/habit1" element={<Habit1 />} />
                <Route path="/habit2" element={<Habit2 />} />
                <Route path="/habit3" element={<Habit3 />} />
                <Route path="/habit4" element={<Habit4 />} />
                <Route path="/habit5" element={<Habit5 />} />
            </Routes>
        </MainContainer>
    );
}

export default App;
