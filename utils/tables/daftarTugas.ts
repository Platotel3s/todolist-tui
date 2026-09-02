import chalk from "chalk";
import { Task, TaskStatus } from "../../task";

export function warnaStatus(status:TaskStatus,lebar:number){
  const teks=String(status).padEnd(lebar);
  switch (status) {
    case TaskStatus.Done:
      return chalk.green(teks);
    case TaskStatus.InProgress:
      return chalk.yellow(teks);
    case TaskStatus.Todo:
    default:
      return chalk.gray(teks);
  }
}

export function warnaNomorTugas(no:number,lebarNo:number){
  const teksNomor=String(no).padEnd(lebarNo);
  return chalk.yellow(teksNomor);
}
export function warnaTitle(teks:string,lebTil:number){
  const teksTitle=String(teks).padEnd(lebTil);
  return chalk.yellowBright(teksTitle);
}
export function warnaDesc(teks:string,lebDesc:number){
  const teksDesc=String(teks).padEnd(lebDesc);
  return chalk.cyanBright(teksDesc);
}
export function warnaHeaderNo(no:string,lebarHN:number){
  const teksNo=String(no).padEnd(lebarHN);
  return chalk.yellow(teksNo);
}
export function warnaHeaderTitle(teks:string,lebarHT:number){
  const teksTit=String(teks).padEnd(lebarHT);
  return chalk.yellowBright(teksTit);
}
export function warnaHeaderDesc(desc:string,lebarHD:number){
  const teksDesc=String(desc).padEnd(lebarHD);
  return chalk.cyanBright(teksDesc);
}
export function daftus(data:Task[]):void{
  const lebarId=Math.max(2,...data.map((b)=>String(b.id).length));
  const lebarTitle=Math.max(3,...data.map((c)=>String(c.title).length));
  const lebarDesc=Math.max(5,...data.map((d)=>String(d.desc).length));
  const lebarStatus=Math.max(3,...data.map((e)=>String(e.status).length));

  const garis=`+-${"-".repeat(lebarId)}-+-${"-".repeat(lebarTitle)}-+-${"-".repeat(lebarDesc)}-+-${"-".repeat(lebarStatus)}-+`;
  console.log(garis);
  console.log(`| ${warnaHeaderNo("No",lebarId)} | ${warnaHeaderTitle("Judul",lebarTitle)} | ${warnaHeaderDesc("Description",lebarDesc)} | ${"Status".padEnd(lebarStatus)}|`);
  console.log(garis);
  data.forEach((dataz)=>{
    console.log(`| ${warnaNomorTugas(dataz.id,lebarId)} | ${warnaTitle(dataz.title,lebarTitle)} | ${warnaDesc(dataz.desc,lebarDesc)} | ${warnaStatus(dataz.status,lebarStatus)} |`);
  });
  console.log(garis);
}

