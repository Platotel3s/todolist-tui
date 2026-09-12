import chalk from "chalk";
import { FlexBox } from "../library/TerminalFlexbox";

export function cetakHeader(owner:String){
  //console.log("=".repeat(process.stdout.columns||80));
  const navbar=new FlexBox(
    {justifyContent:'space-around'}
  );
  navbar.addItem(chalk.blueBright("Ipung Todolist")).addItem(chalk.yellowBright(`Welcome, ${owner}`));
  navbar.render();
  //console.log("=".repeat(process.stdout.columns||80));
}
