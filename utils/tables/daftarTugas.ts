import chalk from "chalk";
import { Task, TaskStatus } from "../../task";
import { ConsoleTable } from "./ConsoleTable";

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

function warnaValue(headerKolom:string,value:string|number,lebarValue:number){
  const normalizeHK=headerKolom.toLowerCase();
  if(normalizeHK==="no"){
    const fixColorize=String(value).padEnd(lebarValue);
    return chalk.whiteBright(fixColorize);
  }else if(normalizeHK==="judul"){
    const fixColorize=String(value).padEnd(lebarValue);
    return chalk.yellowBright(fixColorize);
  }else if(normalizeHK==="keterangan"){
    const fixColorize=String(value).padEnd(lebarValue);
    return chalk.cyanBright(fixColorize);
  }else{
    return normalizeHK;
  }
}

function warnaHeader(label:string,ukuran:number){
  const teks=String(label).padEnd(ukuran);
  return chalk.whiteBright(teks);
}

export function daftus(data:Task[]):void{
  const lebarId=Math.max(2,...data.map((b)=>String(b.id).length));
  const lebarTitle=Math.max(3,...data.map((c)=>String(c.title).length));
  const lebarDesc=Math.max(5,...data.map((d)=>String(d.desc).length));
  const lebarStatus=Math.max(6,...data.map((e)=>String(e.status).length));

  const garis=`+-${"-".repeat(lebarId)}-+-${"-".repeat(lebarTitle)}-+-${"-".repeat(lebarDesc)}-+-${"-".repeat(lebarStatus)}-+`;
  console.log(garis);
  console.log(`| ${warnaHeader("No",lebarId)} | ${warnaHeader("Judul",lebarTitle)} | ${warnaHeader("Keterangan",lebarDesc)} | ${warnaHeader("Status",lebarStatus)} |`);
  console.log(garis);
  data.forEach((dataz)=>{
    console.log(`| ${warnaValue("No",dataz.id,lebarId)} | ${warnaValue("Judul",dataz.title,lebarTitle)} | ${warnaValue("Keterangan",dataz.desc,lebarDesc)} | ${warnaStatus(dataz.status,lebarStatus)} |`);
  });
  console.log(garis);
}

// export function daftus(data:Task[]):void{
//   const table=new ConsoleTable<Task>([
//     {heading:"No",getValue:(n)=>n.id,color:chalk.whiteBright,minWidth:2},
//     {heading:"Title",getValue:(t)=>t.title,color:chalk.yellowBright,minWidth:3},
//     {heading:"Description",getValue:(d)=>d.desc,color:chalk.cyanBright,minWidth:5},
//     {heading:"Status",getValue:(s)=>s.status,color:(text)=>warnaStatus(data.find(d=>d.status===text.trim() as TaskStatus)?.status??TaskStatus.Todo)(text),minWidth:6}
//   ]);
//   table.print(data);
// }
