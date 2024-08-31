export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
