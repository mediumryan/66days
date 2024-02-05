import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// user name
export const userNameState = atom({
    key: 'user_name',
    default: {
        name: '',
        submitted: false,
    },
    effects_UNSTABLE: [persistAtom],
});

// title
export const titleState = atom({
    key: 'title_state',
    default: [
        {
            id: 0,
            value: '',
            submitted: false,
        },
        {
            id: 1,
            value: '',
            submitted: false,
        },
        {
            id: 2,
            value: '',
            submitted: false,
        },
        {
            id: 3,
            value: '',
            submitted: false,
        },
        {
            id: 4,
            value: '',
            submitted: false,
        },
    ],
    effects_UNSTABLE: [persistAtom],
});

// complete
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

export const failTitleState = atom({
    key: 'fail_title_state',
    default: '',
});

// fail modal state

export const failModalState = atom({
    key: 'fail_modal_state',
    default: false,
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

export const listDateState = selector({
    key: 'list_date_state',
    get: ({ get }) => {
        const date = get(dateState);
        const copy = date.map((item) => {
            return { ...item };
        });

        const resultArray = [];

        for (const copyItem of copy) {
            if (copyItem.start !== '') {
                let startDate = new Date(copyItem.start);
                const newArr = Array.from({ length: 66 }, (_, index) => {
                    const newDate = new Date(startDate);
                    newDate.setDate(startDate.getDate() + index);
                    return newDate.toLocaleDateString('ko-KR');
                });
                resultArray.push(newArr);
            } else {
                resultArray.push(undefined);
            }
        }

        return resultArray;
    },
    effects_UNSTABLE: [persistAtom],
});

export const endDateState = selector({
    key: 'end_date_state',
    get: ({ get }) => {
        const date = get(dateState);
        const copy = date.map((item) => {
            return { ...item };
        });

        const resultArray = [];

        for (const copyItem of copy) {
            if (copyItem.start !== '') {
                let startDate = new Date(copyItem.start);
                const newDate = new Date(startDate);
                newDate.setDate(startDate.getDate() + 66);
                resultArray.push(newDate.toLocaleDateString('ko-KR'));
            } else {
                resultArray.push(undefined);
            }
        }

        return resultArray;
    },
    effects_UNSTABLE: [persistAtom],
});

// reset
export const resetState = atom({
    key: 'reset_state',
    default: false,
});
