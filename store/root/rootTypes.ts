import exampleReducer from '@/store/reducer/example/exampleReducer';
import { AppReducerStateType } from '@/store/types';

export interface RootState {
    version: number;
    example: AppReducerStateType<typeof exampleReducer>;
}
