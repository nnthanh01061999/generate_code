// import { Modify } from '@/interfaces';

// export type ITreeNode<T> = Modify<
//     T,
//     {
//         children: ITreeNode<T>[];
//     }
// >;

export interface ITreeNode<T> {
    children: T[];
}

export type TTreeNode<T> = T & ITreeNode<T>;
