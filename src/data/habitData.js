import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// about habit

export const titleState = atom({
    key: 'title_state',
    default: [
        {
            id: 0,
            value: '',
            isActive: true,
            submitted: false,
        },
        {
            id: 1,
            value: '',
            isActive: false,
            submitted: false,
        },
        {
            id: 2,
            value: '',
            isActive: false,
            submitted: false,
        },
        {
            id: 3,
            value: '',
            isActive: false,
            submitted: false,
        },
        {
            id: 4,
            value: '',
            isActive: false,
            submitted: false,
        },
    ],
    effects_UNSTABLE: [persistAtom],
});

export const completeState = atom({
    key: 'complete_state',
    default: [
        {
            id: 0,
            value: '',
            submitted: false,
            count: 0,
        },
        {
            id: 1,
            value: '',
            submitted: false,
            count: 0,
        },
        {
            id: 2,
            value: '',
            submitted: false,
            count: 0,
        },
        {
            id: 3,
            value: '',
            submitted: false,
            count: 0,
        },
        {
            id: 4,
            value: '',
            isActive: false,
            count: 0,
        },
    ],
    effects_UNSTABLE: [persistAtom],
});

export const completePercentState = selector({
    key: 'complete_percent',
    get: ({ get }) => {
        const complete = get(completeState);
        const percentArr = complete.map((item) => {
            return Math.floor((item.count / 66) * 100);
        });
        return percentArr;
    },
    effects_UNSTABLE: [persistAtom],
});

export const failState = atom({
    key: 'fail_state',
    default: [
        {
            id: 0,
            value: '',
            submitted: false,
            count: 0,
        },
        {
            id: 1,
            value: '',
            submitted: false,
            count: 0,
        },
        {
            id: 2,
            value: '',
            submitted: false,
            count: 0,
        },
        {
            id: 3,
            value: '',
            submitted: false,
            count: 0,
        },
        {
            id: 4,
            value: '',
            isActive: false,
            count: 0,
        },
    ],
    effects_UNSTABLE: [persistAtom],
});

// list
export const listState = atom({
    key: 'list_item',
    default: [
        Array.from({ length: 66 }, (_, index) => ({
            id: index,
            value: index + 1 + '일차',
        })),

        Array.from({ length: 66 }, (_, index) => ({
            id: index,
            value: index + 1 + '일차',
        })),

        Array.from({ length: 66 }, (_, index) => ({
            id: index,
            value: index + 1 + '일차',
        })),

        Array.from({ length: 66 }, (_, index) => ({
            id: index,
            value: index + 1 + '일차',
        })),

        Array.from({ length: 66 }, (_, index) => ({
            id: index,
            value: index + 1 + '일차',
        })),
    ],
    effects_UNSTABLE: [persistAtom],
});

// Date
export const dateState = atom({
    key: 'date_state',
    default: [
        {
            id: 0,
            start: '',
            submitted: false,
        },
        {
            id: 1,
            start: '',
            submitted: false,
        },
        {
            id: 2,
            start: '',
            submitted: false,
        },
        {
            id: 3,
            start: '',
            submitted: false,
        },
        {
            id: 4,
            start: '',
            isActive: false,
        },
    ],
    effects_UNSTABLE: [persistAtom],
});

// export const endDateState = selector({
//     key: 'end_date',
//     get: ({ get }) => {
//         const start_date = get(startDateState);
//         if (start_date !== '') {
//             const inputDate = new Date(start_date);
//             // 입력된 날짜에 일수를 더한 새로운 Date 객체 생성
//             const newDate = new Date(inputDate);
//             newDate.setDate(inputDate.getDate() + 66);
//             // 새로운 날짜를 원하는 형식으로 포맷
//             const year = newDate.getFullYear();
//             const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷
//             const day = newDate.getDate().toString().padStart(2, '0'); // 일도 2자리로 포맷

//             const resultDateStr = `${year}-${month}-${day}`;
//             return [resultDateStr];
//         }
//         return;
//     },
// });

// reset
export const resetState = atom({
    key: 'reset_state',
    default: false,
});
