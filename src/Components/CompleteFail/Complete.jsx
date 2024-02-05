import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
// import state data
import { completeState } from '../../data/habitData';
// import icons
import { SlNote } from 'react-icons/sl';
// import components
import { AddToItem, ItemContent, ItemSectionWrapper } from '../Title/Title';

export default function Complete({ habitNumber }) {
    const [complete, setComplete] = useRecoilState(completeState);

    const handleComplete = () => {
        Swal.fire({
            title: 'Reward',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setComplete((prev) => {
                    const newComplete = prev.map((item) => {
                        return { ...item };
                    });
                    newComplete[habitNumber].value = result.value;
                    newComplete[habitNumber].submitted = true;
                    return newComplete;
                });
            }
        });
    };

    return (
        <ItemSectionWrapper>
            {complete[habitNumber].submitted ? (
                <ItemContent>
                    <p>{complete[habitNumber].value}</p>
                    <SlNote onClick={handleComplete} />
                </ItemContent>
            ) : (
                <AddToItem onClick={handleComplete}>Add to reward</AddToItem>
            )}
        </ItemSectionWrapper>
    );
}
