import { FoundPersonData } from './entities';

export interface State {
  foundPersonData: FoundPersonData | object;
  countOfPersons: number;
}
