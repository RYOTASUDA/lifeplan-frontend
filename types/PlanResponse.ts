import { Category } from './Category';

export type PlanResponse = {
  readonly id: number;
  readonly title: string;
  readonly deadline: string;
  readonly detail: string;
  readonly periodType: 'life' | 'year' | 'month' | 'week' | 'day';
  readonly category: Category;
};
