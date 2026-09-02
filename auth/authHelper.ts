// authHelper.ts
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { User } from "./user";

const FILE_PATH="../user.json";

export function hashPassword(password:string){
  return createHash("sha256").update(password).digest("hex");
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
