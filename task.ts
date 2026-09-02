export enum TaskStatus{
  Todo="TO_DO",
  InProgress="IN_PROGRESS",
  Done="DONE"
}
export interface Task{
  id:number,
  title:string,
  desc:string,
  status:TaskStatus
}
export interface Rules{
  no:number,
  bunyi:string
}
