export type PlanRequest = {
  readonly id: number;
  readonly title: string;
  readonly deadline: Date;
  readonly detail: string;
  readonly periodType: 'life' | 'year' | 'month' | 'week' | 'day';
  readonly categoryId: number;
};
