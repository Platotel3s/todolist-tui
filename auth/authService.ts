import chalk from "chalk";
import inquirer from "inquirer";
import { bacaUser, hashPassword, simpanUser, verifyPasswordDenganMigrasi } from "./authHelper";
import { User } from "./user";
import { catatBerhasil, catatGagal, cekTerkunci } from "./rateLimiter";

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
    password:await hashPassword(input.password)
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
  const waktuTerkunci=await cekTerkunci(input.username);
  if(waktuTerkunci){
    const sisaDetik=Math.ceil((waktuTerkunci - Date.now())/1000);
    console.log(chalk.redBright(`🔒 Akun terkunci sementara karena terlalu banyak percobaan gagal. Coba lagi dalam ${sisaDetik} detik`));
    return null;
  }
  const users=await bacaUser();
  const userValid=users.find(u=>u.username.toLowerCase()===input.username.toLowerCase());
  if (userValid && await verifyPasswordDenganMigrasi(input.password,userValid,users)) {
    await catatBerhasil(userValid.username);
    console.clear();
    return userValid.username;
  }else{
    await catatGagal(input.username);
    console.log(chalk.redBright("❌ Login Gagal"));
    return null;
  }
}

