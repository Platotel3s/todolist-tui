// //authService.ts
// import chalk from "chalk";
// import inquirer from "inquirer";
// import { bacaUser, hashPassword, simpanUser } from "./authHelper";
//
// export async function prosesRegister():Promise<void>{
//   console.log(chalk.greenBright("================|| Buat Akun ||================"));
//   const input=await inquirer.prompt(
//     [
//       {type:"input",name:"username",message:"Masukkan username : "},
//       {type:"input",name:"password",message:"Masukkan password : ",mask:"*"},
//     ]
//   );
//   const users=await bacaUser();
//   const userExist=users.find(u=>u.username.toLowerCase()===input.username);
//   if (userExist) {
//     console.log("Username sudah dipakaii");
//     return;
//   }
//   const newUser:User={
//     username:input.username,
//     password:hashPassword(input.password)
//   };
//   users.push(newUser);
//   await simpanUser(users);
//   console.log(chalk.greenBright("✅ Berhasil membuat akun, silahkan login"));
//
// }
//
// export async function prosesLogin():Promise<boolean>{
//   console.log(chalk.blueBright("================|| Masuk ||================"));
//   const input=await inquirer.prompt(
//     [
//       {type:"input",name:"username",message:"Username : "},
//       {type:"password",name:"password",message:"Password : ",mask:"*"}
//     ]
//   );
//   const users=await bacaUser();
//   const targetHash=hashPassword(input.password);
//   const userValid=users.find(u=>u.username===input.username && u.password===targetHash);
//   if (userValid) {
//     console.log("🎉 Selamat Datang Kembali");
//     return true;
//   }else{
//     console.log("❌ Login Gagal");
//     return false;
//   }
// }
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

export async function prosesLogin():Promise<boolean>{
  console.log(chalk.blueBright("================|| Masuk ||================"));
  const input=await inquirer.prompt(
    [
      {type:"input",name:"username",message:"Username : "},
      {type:"password",name:"password",message:"Password : ",mask:"*"}
    ]
  );
  const users=await bacaUser();
  const targetHash=hashPassword(input.password);
  const userValid=users.find(u=>u.username===input.username && u.password===targetHash);
  if (userValid) {
    console.log("🎉 Selamat Datang Kembali");
    return true;
  }else{
    console.log("❌ Login Gagal");
    return false;
  }
}

