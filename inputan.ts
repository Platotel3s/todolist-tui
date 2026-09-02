import readline from "readline";
// export const rdl=readline.createInterface({
//   input:process.stdin,
//   output:process.stdout
// });

export function inputan(pertanyaan:string):Promise<string>{
  const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
  });
  return new Promise((resolve)=>{
    rl.question(pertanyaan,(jawaban)=>{
      rl.close();
      resolve(jawaban);
    });
  });
}

export const rdl={
  close:()=>{
    process.exit(0);
  }
};
