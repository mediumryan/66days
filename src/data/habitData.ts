import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export type UserType = {
  name: string;
  submitted: boolean;
};

export type HabitType = {
  id: string;
  title: string;
  start: string;
  end: string;
  completeCnt: number;
  fileCnt: number;
  isDone: boolean;
};

export type HabitListType = {
  id: string;
  list: ListType[];
};

export type ListType = {
  id: string;
  value: number;
};

// user name
export const userNameState = atom<UserType>({
  key: 'user_name',
  default: {
    name: '',
    submitted: false,
  },
  effects_UNSTABLE: [persistAtom],
});

// habits

export const habitState = atom<HabitType[]>({
  key: 'habit_state',
  default: [
    {
      id: 'test',
      title: '',
      start: '',
      end: '',
      completeCnt: 0,
      fileCnt: 0,
      isDone: false,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

// 동적으로 리스트 생성
const createDefaultHabitList = (prefix: string): HabitListType[] => [
  {
    id: prefix,
    list: Array.from({ length: 66 }, (_, index) => ({
      id: `${prefix}-${index}`,
      value: index,
    })),
  },
];

// 리스트 상태값
export const listState = atom<HabitListType[]>({
  key: 'list_item',
  default: createDefaultHabitList('test'),

  effects_UNSTABLE: [persistAtom],
});

// fail modal title
export const failTitleState = atom({
  key: 'fail_title_state',
  default: '',
});

// fail modal open / close
export const failModalState = atom({
  key: 'fail_modal_state',
  default: false,
});
