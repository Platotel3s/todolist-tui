import { Task } from "./task";
import { inputan, rdl } from "./inputan";
import { bacaTugas,hapusTugas, isiTugas, tambahTugas, updateStatus, updateTugas } from "./logics";
import { aturanInputan, tableAturan } from "./utils/tables/rulesTable";
import chalk from "chalk";
import { prosesLogin, prosesRegister } from "./auth/authService";

async function main(){
  console.clear();
  
  let userAktif:string|null=null;
  while(!userAktif){
    console.log(chalk.cyanBright("================|| Welcome ||==============="));
    console.log(chalk.cyanBright("1. Login"));
    console.log(chalk.cyanBright("2. Register"));
    console.log(chalk.cyanBright("3. Keluar"));
    console.log(chalk.cyanBright("============================================="));
    const menuAuth=await inputan(chalk.cyanBright("Pilih Menu (bisa ketik 1-3 atau menunya) : "));
    const finalMenuAuth=menuAuth.toLowerCase();
    
    if (finalMenuAuth==='1'||finalMenuAuth==='login') {
      userAktif=await prosesLogin();
    }else if(finalMenuAuth==='2'||finalMenuAuth==='register'){
      await prosesRegister();
    }else if(finalMenuAuth==='3'||finalMenuAuth==='keluar'){
      console.log("Sampai jumpa 👋");
      rdl.close();
      return;
    }else{
      console.log(chalk.redBright("Ga ada pilihan"));
    }
  }

  let daftarTugas:Task[]=await bacaTugas(userAktif);
  tableAturan(aturanInputan);
  while (true) {
    console.log(`Jumlah tugas saat ini ada ${daftarTugas.length}`);
    console.log("1. Tambah Tugas");
    console.log("2. Daftar Tugas");
    console.log("3. Update Tugas");
    console.log("4. Update Status");
    console.log("5. Hapus Tugas");
    console.log("6. Keluar");
    const pilihMenu=await inputan("Pilih nomor menu : ");

    const finalChoiceMenu=pilihMenu.toLowerCase();
    switch (finalChoiceMenu) {
      case '1':
      case 'tambah tugas':
        await tambahTugas(userAktif,aturanInputan,daftarTugas);
        break;
      case '2':
      case 'daftar tugas':
        isiTugas(daftarTugas);
        break;
      case '3':
      case 'update tugas':
        await updateTugas(daftarTugas,userAktif);
        break;
      case '4':
      case 'update status':
        await updateStatus(daftarTugas,userAktif);
        break;
      case '5':
      case 'hapus tugas':
        await hapusTugas(daftarTugas,userAktif);
        break;
      case '6':
      case 'keluar':
        rdl.close();
        return;
      default:
        console.log('Pilihan tidak ada');
        break;
    }
  }
}

main();

