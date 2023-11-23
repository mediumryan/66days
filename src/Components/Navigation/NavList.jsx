import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
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
            border-radius: 12px;
            margin-bottom: 0.5rem;
            a {
                color: var(--accent-100);
                display: block;
                text-decoration: none;
            }
            &:nth-child(odd) {
                background-color: var(--primary-200);
            }
            &:nth-child(even) {
                background-color: var(--primary-100);
            }
        }
    }
`;

export default function NavList() {
    const [menuOn, setMenuOn] = useRecoilState(isMenuOn);
    const title = useRecoilValue(titleState);

    return (
        <ListWrapper style={{ display: menuOn ? 'block' : 'none' }}>
            <ul>
                <li>
                    <Link
                        to={`/habit/${title[0].id}`}
                        onClick={() => {
                            setMenuOn(false);
                        }}
                    >
                        {title[0].value === '' ? 'Empty' : title[0].value}
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/habit/${title[1].id}`}
                        onClick={() => {
                            setMenuOn(false);
                        }}
                    >
                        {title[1].value === '' ? 'Empty' : title[1].value}
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/habit/${title[2].id}`}
                        onClick={() => {
                            setMenuOn(false);
                        }}
                    >
                        {title[2].value === '' ? 'Empty' : title[2].value}
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/habit/${title[3].id}`}
                        onClick={() => {
                            setMenuOn(false);
                        }}
                    >
                        {title[3].value === '' ? 'Empty' : title[3].value}
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/habit/${title[4].id}`}
                        onClick={() => {
                            setMenuOn(false);
                        }}
                    >
                        {title[4].value === '' ? 'Empty' : title[4].value}
                    </Link>
                </li>
            </ul>
        </ListWrapper>
    );
}
