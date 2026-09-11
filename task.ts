export enum TaskStatus{
  Todo="TO_DO",
  InProgress="IN_PROGRESS",
  Done="DONE"
}
export interface Task{
  id:number;
  title:string;
  desc:string;
  status:TaskStatus;
  owner:string;
}
export interface Rules{
  no:number;
  bunyi:string;
}
export interface ColumnDef<T> {
  header: string;
  getValue: (row: T) => string | number;
  color?: (text: string) => string;
  minWidth?: number;
}
