import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { isMenuOn } from '../../data/atom';

const ListWrapper = styled.div`
    width: 100%;
    padding: 0 3rem;
    margin-top: 2rem;
    ul {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 0.5rem;
        li {
            text-align: center;
            padding: 0.75rem 1rem;
            background-color: var(--primary-200);
            border-radius: 12px;
            a {
                color: var(--accent-100);
                display: block;
                text-decoration: none;
            }
            &:first-child {
                grid-area: 1 / 1 / 2 / 3;
            }
            &:nth-child(2) {
                grid-area: 1 / 3 / 2 / 5;
            }
            &:nth-child(3) {
                grid-area: 1 / 5 / 2 / 7;
            }
            &:nth-child(4) {
                grid-area: 2 / 1 / 3 / 4;
            }
            &:nth-child(5) {
                grid-area: 2 / 4 / 3 / 7;
            }
        }
    }
`;

export default function NavList() {
    const menuOn = useRecoilValue(isMenuOn);

    return (
        <ListWrapper style={{ display: menuOn ? 'block' : 'none' }}>
            <ul>
                <li>
                    <Link to="/habit1">Habit1</Link>
                </li>
                <li>
                    <Link to="/habit2">Habit2</Link>
                </li>
                <li>
                    <Link to="/habit3">Habit3</Link>
                </li>
                <li>
                    <Link to="/habit4">Habit4</Link>
                </li>
                <li>
                    <Link to="/habit5">Habit5</Link>
                </li>
            </ul>
        </ListWrapper>
    );
}
