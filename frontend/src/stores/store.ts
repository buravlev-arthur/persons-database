import { defineStore } from 'pinia';
import type { State } from '../types/store';
import { getCountOfPersons } from 'src/api';
import { AxiosError } from 'axios';

export const useStore = defineStore('store', {
  state: (): State => ({
    foundPersonData: {},
    countOfPersons: 0,
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  actions: {
    async getCurrentCountOfPersons(): Promise<void | AxiosError> {
      this.countOfPersons = 0;
      try {
        const result = (await getCountOfPersons()) as number;
        this.countOfPersons = result;
      } catch (error) {
        throw error;
      }
    },
  },
});
