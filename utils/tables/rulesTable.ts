import chalk from "chalk";
import { Rules } from "../../task";

export function warnaValue(no:string,lebarHN:number){
  const ambilValue=String(no).padEnd(lebarHN);
  return chalk.yellowBright(ambilValue);
}

export function tableAturan(data:Rules[]):void{
  const lebarId=Math.max(2,...data.map((d)=>String(d.no).length));
  const lebarBunyi=Math.max(5,...data.map((b)=>String(b.bunyi).length));
  const garis=`+-${"-".repeat(lebarId)}-+-${"-".repeat(lebarBunyi)}-+`;
  console.log(garis);
  console.log(`| ${warnaValue("No",lebarId)} | ${warnaValue("Keterangan",lebarBunyi)} |`);
  console.log(garis);
  data.forEach((nizom)=>{
    console.log(`| ${warnaValue(String(nizom.no),lebarId)} | ${warnaValue((nizom.bunyi),lebarBunyi)} |`);
  });
  console.log(garis);
}

export const aturanInputan:Rules[]=[
   {
    "no":1,
    "bunyi":"Ketik 'end' jika sudah selesai setelah menulis deskripsi"
  },
  {
    "no":2,
    "bunyi":"Ketik angka 0 untuk kembali ke halaman utama"
  },
  {
    "no":3,
    "bunyi":"Kalau mau keluar dari menu yang sudah terpilih, bisa tekan 0 atau ketik 'end'"
  }
];

