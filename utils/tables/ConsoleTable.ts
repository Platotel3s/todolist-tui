import chalk from "chalk";

export interface ColumnDef<T>{
  heading:string;
  getValue:(row:T)=>string|number;
  color?:(text:string)=>string;
  minWidth?:number;
}

export class ConsoleTable<T>{
  private columns:ColumnDef<T>[];
  constructor(columns:ColumnDef<T>[]){
    this.columns=columns;
  }
  private computeWidths(data:T[]):number[]{
    return this.columns.map((col)=>{
      const min=col.minWidth??col.heading.length;
      const maxDataLen=Math.max(
        0,
        ...data.map((row)=>String(col.getValue(row)).length)
      );
      return Math.max(min,maxDataLen);
    });
  }
  private buatBorder(widths:number[]):string{
    return "+-"+widths.map((w)=>"-".repeat(w)).join("-+-")+"-+";
  }
  private formatSel(text:string,width:number,color?:(t:string)=>string):string{
    const padded=text.padEnd(width);
    return color?color(padded):padded;
  }
  print(data:T[]):void{
    const lebar=this.computeWidths(data);
    const garis=this.buatBorder(lebar);
    console.log(garis);
    console.log(
      "| "+
      this.columns
      .map((col,i)=>this.formatSel(col.heading,lebar[i],chalk.whiteBright))
      .join(" | ")+
      " | "
    );
    console.log(garis);
    data.forEach((row)=>{
      console.log(
        " | "+
        this.columns
        .map((col,i)=>{
          this.formatSel(String(col.getValue(row)),lebar[i],col.color)
        }).join(" | ")+" | "
      );
    });
    console.log(garis);
  }
}
