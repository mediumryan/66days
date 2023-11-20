import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { isMenuOn } from '../../data/atom';
import { titleState } from '../../data/habitData';

const ListWrapper = styled.div`
    width: 100%;
    padding: 0 3rem;
    margin-top: 2rem;
    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        li {
            text-align: center;
            padding: 0.75rem 1rem;
            background-color: var(--primary-200);
            border-radius: 12px;
            margin-bottom: 0.5rem;
            a {
                color: var(--accent-100);
                display: block;
                text-decoration: none;
            }
        }
    }
`;

export default function NavList() {
    const menuOn = useRecoilValue(isMenuOn);
    const titleArr = useRecoilValue(titleState);

    return (
        <ListWrapper style={{ display: menuOn ? 'block' : 'none' }}>
            <ul>
                {titleArr.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link to={`/habit/${item.id}`}>
                                {item.value === '' ? 'Empty' : item.value}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </ListWrapper>
    );
}
