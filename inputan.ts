import readline from "readline";
export function inputan<T>(pertanyaan:string,parsing:(input:string)=>T):Promise<T>{
  const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
  });
  return new Promise((resolve)=>{
    rl.question(pertanyaan,(jawaban)=>{
      rl.close();
      resolve(parsing(jawaban));
    });
  });
}

export const rdl={
  close:()=>{
    process.exit(0);
  }
};
