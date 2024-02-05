import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
// import state data
import { failState } from '../../data/habitData';
// import icons
import { SlNote } from 'react-icons/sl';
// import components
import { AddToItem, ItemContent, ItemSectionWrapper } from '../Title/Title';

export default function Fail({ habitNumber }) {
    const [fail, setFail] = useRecoilState(failState);

    const handleFail = () => {
        Swal.fire({
            title: 'Penalty',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setFail((prev) => {
                    const newFail = prev.map((item) => {
                        return { ...item };
                    });
                    newFail[habitNumber].value = result.value;
                    newFail[habitNumber].submitted = true;
                    return newFail;
                });
            }
        });
    };

    return (
        <ItemSectionWrapper>
            {fail[habitNumber].submitted ? (
                <ItemContent>
                    <p>{fail[habitNumber].value}</p>
                    <SlNote onClick={handleFail} />
                </ItemContent>
            ) : (
                <AddToItem onClick={handleFail}>Add to Penalty</AddToItem>
            )}
        </ItemSectionWrapper>
    );
}
