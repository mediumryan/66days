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
        },
    ],
    effects_UNSTABLE: [persistAtom],
});

export const completeSubmitted = atom({
    key: 'complete_submitted',
    default: [false],
    effects_UNSTABLE: [persistAtom],
});

export const completeState = atom({
    key: 'complete_state',
    default: [''],
    effects_UNSTABLE: [persistAtom],
});

export const completeCountState = atom({
    key: 'complete_count',
    default: [0],
    effects_UNSTABLE: [persistAtom],
});

export const completePercentState = selector({
    key: 'complete_percent',
    get: ({ get }) => {
        const complete_count = get(completeCountState);
        return [Math.floor((complete_count / 66) * 100)];
    },
});

export const failSubmitted = atom({
    key: 'fail_submitted',
    default: [false],
    effects_UNSTABLE: [persistAtom],
});

export const failState = atom({
    key: 'fail_state',
    default: [''],
    effects_UNSTABLE: [persistAtom],
});

export const failCountState = atom({
    key: 'fail_count',
    default: [0],
    effects_UNSTABLE: [persistAtom],
});

// Date

export const dateSubmitted = atom({
    key: 'date_submitted',
    default: [false],
    effects_UNSTABLE: [persistAtom],
});

export const startDateState = atom({
    key: 'start_date',
    default: [''],
    effects_UNSTABLE: [persistAtom],
});

export const endDateState = selector({
    key: 'end_date',
    get: ({ get }) => {
        const start_date = get(startDateState);
        if (start_date !== '') {
            const inputDate = new Date(start_date);
            // 입력된 날짜에 일수를 더한 새로운 Date 객체 생성
            const newDate = new Date(inputDate);
            newDate.setDate(inputDate.getDate() + 66);
            // 새로운 날짜를 원하는 형식으로 포맷
            const year = newDate.getFullYear();
            const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷
            const day = newDate.getDate().toString().padStart(2, '0'); // 일도 2자리로 포맷

            const resultDateStr = `${year}-${month}-${day}`;
            return [resultDateStr];
        }
        return;
    },
});

// list
export const listState = atom({
    key: 'list_item',
    default: [
        Array.from({ length: 66 }, (_, index) => ({
            id: index,
            value: index + 1 + '일차',
        })),
    ],
    effects_UNSTABLE: [persistAtom],
});
// reset
export const resetState = atom({
    key: 'reset_state',
    default: false,
});
