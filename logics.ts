import { readFile, writeFile } from "fs/promises";
import { inputan } from "./inputan";
import { Rules, Task, TaskStatus } from "./task";
import { daftus } from "./utils/tables/daftarTugas";
import chalk from "chalk";
import { tableAturan } from "./utils/tables/rulesTable";

export async function bacaSemuaTugas():Promise<Task[]>{
  try{
    const datas=await readFile("dataTask.json","utf-8");
    return JSON.parse(datas);
  }catch{
    return [];
  }
}

export async function simpanTugas(tugasUser:Task[],owner:string):Promise<void>{
  const semua=await bacaSemuaTugas();
  const tugasUserLain=semua.filter(t=>t.owner!==owner);
  await writeFile("dataTask.json",JSON.stringify([...tugasUserLain,...tugasUser],null,2),"utf-8");
}

export async function bacaTugas(owner:string):Promise<Task[]>{
  const semua=await bacaSemuaTugas();
  return semua.filter(t=>t.owner===owner);
}

export async function caraInputUSer():Promise<Rules[]>{
  try {
    const rules=await readFile("aturanPenulisan.json","utf-8");
    return JSON.parse(rules);
  } catch{
    return [];
  }
}

export async function tambahTugas(userAktif:string,aturanInputan:Rules[],daftarTugas:Task[]):Promise<void>{
  while (true) {
    console.log("----- CARA PENULISAN -----");
    tableAturan(aturanInputan);
    console.log(chalk.yellow("────────────────────────────────────"));
    console.log(chalk.yellow("|| AYO PERBANYAK KEGIATAN POSITIF ||"));
    console.log(chalk.yellow("────────────────────────────────────"));
    const judul=await inputan("Judul : ",(val)=>val);
    if (judul.toLowerCase()==='end') {
      break;
    }
    const deskripsi=await inputan('Deskripsi : ',(val)=>val);
    const nextId=daftarTugas.length===0?1:Math.max(...daftarTugas.map(t=>t.id))+1;
    daftarTugas.push({
      id:nextId,
      title:judul,
      desc:deskripsi,
      status:TaskStatus.Todo,
      owner:userAktif
    });
    await simpanTugas(daftarTugas,userAktif);
  }
  console.log("===================================");
  daftus(daftarTugas);
}

export function isiTugas(daftarTugas:Task[]){
  console.log("\n=================== DAFTAR TUGAS ===================");
  if(daftarTugas.length===0){
    console.log("Belum Ada Tugas Yang Masuk");
  }else{
    daftus(daftarTugas);
  }
}

export async function caraInput():Promise<void>{
  const tampilkanAturan=await caraInputUSer();
  if(tampilkanAturan.length===0){
    console.log("Ga ada aturan");
    return;
  }
  console.log("========== CARA MENULIS INPUT ==========");
  tampilkanAturan.forEach((rules)=>{
    console.log(`${rules.no} : ${rules.bunyi}`);
  });
}


// update tugas
export async function updateTugas(daftarTugas:Task[],owner:string):Promise<void>{
  const tampilkanTugas=await bacaTugas(owner);
  if(tampilkanTugas.length===0){
    console.log("Belum ada tugas yang terdaftar");
    return;
  }
  console.log("\n=================== UPDATE TUGAS ===================");
  daftus(tampilkanTugas);
  const ambilInput=await inputan("Masukkan nomor/judul Tugas : ",(val)=>val.trim());
  let pilihTugas:Task|undefined;
  const ubahKeNumber=Number(ambilInput);
  const apakahAngka=!isNaN(ubahKeNumber)&&ambilInput!=="";
  if(apakahAngka){
    pilihTugas=daftarTugas.find((k)=>k.id===ubahKeNumber);
    if(!pilihTugas){
      console.log(chalk.redBright.bold("Nomor Tugas Tidak Ada!"));
      return
    }
    const judulBaru=await inputan("Judul Baru : ",(val)=>val);
    const deskripsiBaru=await inputan("Deskripsi Baru : ",(val)=>val);
    pilihTugas.title=judulBaru;
    pilihTugas.desc=deskripsiBaru;
    await simpanTugas(daftarTugas,owner);
    console.log(chalk.bold.greenBright("Berhasil Update Tugas"));
  }else{
    pilihTugas=daftarTugas.find((l)=>l.title.toLowerCase()===ambilInput.toLowerCase());
    if (!pilihTugas) {
      console.log(chalk.bold.redBright("Judul Tugas Tidak Ada"));
      return;
    }
    const judulBaru=await inputan("Judul Baru : ",(val)=>val);
    const deskripsiBaru=await inputan("Deskripsi Baru : ",(val)=>val);
    pilihTugas.title=judulBaru;
    pilihTugas.desc=deskripsiBaru;
    await simpanTugas(daftarTugas,owner);
    console.log(chalk.bold.greenBright("Berhasil Update Tugas"));
  }
  
}

// hapus tugas
export async function hapusTugas(daftarTugas:Task[],owner:string):Promise<void>{
  if (daftarTugas.length===0) {
    console.log(chalk.red("Belum ada Tugas Yang Masuk"));
    return;
  }
  daftus(daftarTugas);
  const choose=await inputan("Masukkan nomor/judul tugas : ",(val)=>val.trim());
  let pilihTugas:Task|undefined;
  const ubahKeNumber=Number(choose);
  const apakahAngka=!isNaN(ubahKeNumber)&&choose!=="";
  if(apakahAngka){
    pilihTugas=daftarTugas.find((i)=>i.id===ubahKeNumber);
    if (!pilihTugas) {
      console.log(chalk.redBright("Nomor Tugas Tidak Ada"));
      return;
    }
    const ygMauDihapus=daftarTugas.indexOf(pilihTugas!);
    daftarTugas.splice(ygMauDihapus,1);
  }else{
    pilihTugas=daftarTugas.find((j)=>j.title.toLowerCase()===choose.toLowerCase());
    if (!pilihTugas) {
      console.log(chalk.redBright("Judul Tugas Tidak ada"));
      return;
    }
    const ygMauDihapus=daftarTugas.indexOf(pilihTugas!);
    daftarTugas.splice(ygMauDihapus,1);
  }
  await simpanTugas(daftarTugas,owner);
  console.log(chalk.green("Tugas Berhasil dihapus"));
}


/* update status */
export async function updateStatus(daftarTugas:Task[],owner:string):Promise<void>{
  const tampilkanTugas=await bacaTugas(owner);
  if (tampilkanTugas.length===0) {
    console.log("Belum Ada Tugas");
    return;
  }
  console.log("\n=================== UPDATE STATUS ===================");
  daftus(tampilkanTugas);
  const choose=await inputan("Masukkan nomor/judul tugas : ",(val)=>val.trim());
  let pilihTugas:Task|undefined;
  const ubahKeNumber=Number(choose);
  const apakahAngka=!isNaN(ubahKeNumber)&&choose!=="";
  if(apakahAngka){
    pilihTugas=daftarTugas.find((task)=>task.id===ubahKeNumber);
    if(!pilihTugas){
      console.log(chalk.redBright("Nomor Tugas Tidak ada !"));
      return;
    }
  }else{
    pilihTugas=daftarTugas.find((task)=>task.title.toLowerCase()===choose.toLowerCase());
    if(!pilihTugas){
        console.log(chalk.redBright("Terjadi error dalam input !"));
        return;
      }
  }
  console.log("----- Daftar Status -----");
  console.log("1. Akan dilakukan");
  console.log("2. Sedang dilakukan");
  console.log("3. Selesai");
  const statChoice:string=await inputan("Pilih status tugasnya (boleh ketik nomornya dan keterangannya): ", (val) => val);
  const newStat=statChoice.toLowerCase().trim();
  switch (newStat){
  case '1':
  case 'akan dilakukan':
      pilihTugas.status=TaskStatus.Todo;
      break;
    case '2':
    case 'sedang dilakukan':
      pilihTugas.status=TaskStatus.InProgress;
      break;
    case '3':
    case 'selesai':
      pilihTugas.status=TaskStatus.Done;
      break;
    default:
      console.log("Pilihan Tidak Ada");
      return;
  }
  await simpanTugas(daftarTugas, owner);
  console.log(chalk.green(`Status ${pilihTugas.title} Sudah diperbarui`));
}

