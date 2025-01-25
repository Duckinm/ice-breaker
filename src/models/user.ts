import { delay } from '@/lib/utils';
import { createModel } from 'ice';

interface User {
  name: string;
  id: string;
}

export default createModel({
  state: {
    name: '',
    id: '',
  } as User,
  reducers: {
    update(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    async getUserInfo() {
      await delay(1000);
      this.update({
        name: 'taobao',
        id: '123',
      });
    },
  }),
});
