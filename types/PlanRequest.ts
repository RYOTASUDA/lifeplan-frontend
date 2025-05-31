export type PlanRequest = {
  readonly id: number;
  readonly title: string;
  readonly deadline: Date;
  readonly detail: string;
  readonly periodType: 'life' | 'year' | 'month' | 'week' | 'day';
  readonly categoryId: number;
};

export type PlanForm = {
  readonly id: number | undefined;
  readonly title: string;
  readonly deadline: Date;
  readonly detail: string;
  readonly periodType: 'life' | 'year' | 'month' | 'week' | 'day';
  readonly categoryId: string;
};
