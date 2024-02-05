import { styled } from 'styled-components';
import Swal from 'sweetalert2';

const TestWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
        font-size: 2rem;
        border: 2px solid black;
        padding: 1rem 2rem;
        border-radius: 20px;
    }
`;

export default function Test() {
    const handleTest = () => {
        Swal.fire({
            title: 'Select departure date',
            input: 'date',
            didOpen: () => {
                const today = new Date().toISOString();
                Swal.getInput().min = today.split('T')[0];
            },
        }).then((result) => {
            if (result.value) {
                Swal.fire('Departure date', result.value);
            }
        });
    };

    return (
        <TestWrapper>
            <button onClick={handleTest}>Click Me</button>
        </TestWrapper>
    );
}
