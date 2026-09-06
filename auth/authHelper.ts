import { readFile, writeFile } from "node:fs/promises";
import { User } from "./user";
import bcrypt from "bcrypt";
import { createHash } from "node:crypto";

const saltRounds=12;
const FILE_PATH="user.json";

export async function hashPassword(password:string):Promise<string>{
  return bcrypt.hash(password,saltRounds);
}

export async function verifyPassword(password:string,hash:string):Promise<boolean>{
  return bcrypt.compare(password,hash);
}

export async function bacaUser():Promise<User[]>{
  try{
    const data=await readFile(FILE_PATH,"utf8");
    return JSON.parse(data) as User[];
  }catch(error){
    return[];
  }
}

export async function simpanUser(users:User[]):Promise<void>{
  await writeFile(FILE_PATH,JSON.stringify(users,null,2),"utf8");
}

function isBcryptHash(hash:string):boolean{
  return /^\$2[aby]\$\d{2}\$/.test(hash);
}

function hashPasswordLegacy(password:string):string{
  return createHash("sha256").update(password).digest("hex");
}

export async function verifyPasswordDenganMigrasi(password:string,user:User,users:User[]):Promise<boolean>{
  if(isBcryptHash(user.password)){
    return bcrypt.compare(password,user.password);
  }
  const cocok=hashPasswordLegacy(password)===user.password;
  if(cocok){
    user.password=await hashPassword(password);
    await simpanUser(users);
  }
  return cocok;
}
