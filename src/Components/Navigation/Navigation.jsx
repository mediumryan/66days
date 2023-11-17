import { styled } from 'styled-components';
import { GiCat, GiChecklist } from 'react-icons/gi';
import NavList from './NavList';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { isMenuOn } from '../../data/atom';

const NavWrapper = styled.nav`
    background-color: var(--bg-200);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0.75rem 0;
    & > a {
        font-size: 2rem;
        color: var(--accent-200);
        text-decoration: none;
    }
`;

const MenuToggleBtn = styled.button`
    font-size: 2rem;
    position: absolute;
    top: 0.75rem;
    right: 1%;
    color: var(--accent-200);
`;

export default function Navigation() {
    const setMenuOn = useSetRecoilState(isMenuOn);
    const handleMenuOn = () => {
        setMenuOn((prev) => !prev);
    };

    return (
        <NavWrapper>
            <Link to="/">
                <GiCat />
            </Link>
            <NavList />
            <MenuToggleBtn onClick={handleMenuOn}>
                <GiChecklist />
            </MenuToggleBtn>
        </NavWrapper>
    );
}
