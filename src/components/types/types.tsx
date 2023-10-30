export type Dictionary = {
  [key: string]: any;
};

export interface EventChange<T = HTMLInputElement>
  extends React.ChangeEvent<T> {}
