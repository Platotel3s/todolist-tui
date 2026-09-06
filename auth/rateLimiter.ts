import { readFile, writeFile } from "node:fs/promises";
import { Attempts } from "./attempt";

const fileAttempt="loginAttempts.json";
const maxTry=5;
const durasiTerkunci=5*60*1000;

async function bacaAttempts():Promise<Attempts[]>{
  try{
    const data=await readFile(fileAttempt,"utf8");
    return JSON.parse(data) as Attempts[];
  }catch{
    return[];
  }
}

async function simpanAttempt(data:Attempts[]):Promise<void>{
  await writeFile(fileAttempt,JSON.stringify(data,null,2),"utf8");
}

export async function cekTerkunci(username:string):Promise<number|null>{
  const semua=await bacaAttempts();
  const target=semua.find((a)=>a.username.toLowerCase()===username.toLowerCase());
  if(!target||!target.quantLocked) return null;
  if(Date.now()<target.quantLocked){
    return target.quantLocked;
  }
  return null;
}

export async function catatGagal(username:string):Promise<void>{
  const semua=await bacaAttempts();
  let target=semua.find(a=>username.toLowerCase()===a.username.toLowerCase());
  if(!target){
    target={username,quantFailed:0,quantLocked:null};
    semua.push(target);
  }
  target.quantFailed+=1;
  if(target.quantFailed>=maxTry){
    target.quantLocked=Date.now()+durasiTerkunci;
    target.quantFailed=0;
  }
  await simpanAttempt(semua);
}

export async function catatBerhasil(username:string):Promise<void>{
  const semua=await bacaAttempts();
  const sisa=semua.filter(a=>a.username.toLowerCase()!==username.toLowerCase());
  await simpanAttempt(sisa);
}
