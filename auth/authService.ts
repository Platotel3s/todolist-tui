import chalk from "chalk";
import inquirer from "inquirer";
import { bacaUser, hashPassword, simpanUser } from "./authHelper";
import { User } from "./user";

export async function prosesRegister():Promise<void>{
  console.log(chalk.greenBright("================|| Buat Akun ||================"));
  const input=await inquirer.prompt(
    [
      {type:"input",name:"username",message:"Masukkan username : "},
      {type:"password",name:"password",message:"Masukkan password : ",mask:"*"},
    ]
  );
  const users=await bacaUser();
  const userExist=users.find(u=>u.username.toLowerCase()===input.username.toLowerCase());
  if (userExist) {
    console.log("Username sudah dipakai");
    return;
  }
  const newUser:User={
    username:input.username,
    password:hashPassword(input.password)
  };
  users.push(newUser);
  await simpanUser(users);
  console.log(chalk.greenBright("✅ Berhasil membuat akun, silahkan login"));
}

export async function prosesLogin():Promise<string|null>{
  console.clear();
  console.log(chalk.blueBright("================|| Masuk ||================"));
  const input=await inquirer.prompt(
    [
      {type:"input",name:"username",message:"Username : "},
      {type:"password",name:"password",message:"Password : ",mask:"*"}
    ]
  );
  const users=await bacaUser();
  const targetHash=hashPassword(input.password);
  const userValid=users.find(u=>u.username.toLowerCase()===input.username && u.password===targetHash);
  if (userValid) {
    console.clear();
    console.log(chalk.greenBright(`🎉 Halo ${userValid.username}`));
    return userValid.username;
  }else{
    console.log(chalk.redBright("❌ Login Gagal"));
    return null;
  }
}

