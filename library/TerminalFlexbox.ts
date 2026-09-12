export type FlexDirection='row'|'column';
export type JustifyContent='start'|'center'|'end'|'space-between'|'space-around';

export interface FlexOptions{
  direction?:FlexDirection;
  justifyContent?:JustifyContent;
  width?:number
};

export class FlexBox{
  private direction:FlexDirection;
  private justifyContent:JustifyContent;
  private totalWidth:number;
  private items:string[]=[];
  constructor(options:FlexOptions={}){
    this.direction=options.direction||'row';
    this.justifyContent=options.justifyContent||'start';
    this.totalWidth=options.width||process.stdout.columns||80;
  }
  private compileColumn():string{
    return this.items.map(item=>{
      const sisaSpasi=this.totalWidth - item.length;
      if(sisaSpasi<=0) return item;
      switch(this.justifyContent){
        case "center":
          return ' '.repeat(Math.floor(sisaSpasi/2))+item;
        case "end":
          return ' '.repeat(sisaSpasi)+item;
        default:
          return item;
      }
    }).join('\n');
  }
  private compileRow():string{
    const totalItemWidth=this.items.reduce((sum,item)=>sum+item.length,0);
    const sisaSpasi=this.totalWidth - totalItemWidth;
    if(sisaSpasi<=0){
      return this.items.join(' ');
    }
    const itemCount=this.items.length;
    
    switch(this.justifyContent){
      case 'center':{
        const spasiSamping=' '.repeat(Math.floor(sisaSpasi/2));
        return spasiSamping+this.items.join(' ')+spasiSamping;
      }
      case 'space-between':{
        if(itemCount===1) return this.items[0];
        const jmlCelah=itemCount-1;
        const sizeCelah=Math.floor(sisaSpasi/jmlCelah);
        const sisaModulus=sisaSpasi%jmlCelah;
        let baris='';
        this.items.forEach((item,index)=>{
          baris+=item;
          if(index<jmlCelah){
            const extraSpasi=index<sisaModulus?1:0;
            baris+=' '.repeat(sizeCelah+extraSpasi);
          }
        });
        return baris;
      }
      case 'end':{
        return ' '.repeat(sisaSpasi)+this.items.join(' ');
      }
      case 'space-around':{
        const jmlCelah=itemCount*2;
        const sizeCelah=Math.floor(sisaSpasi/jmlCelah);
        const spasiCelah=' '.repeat(sizeCelah);
        return this.items.map(item=>spasiCelah+item+spasiCelah).join('');
      }
      default:{
        return this.items.join(' ');
      }
    }
  }
  addItem(item:string):this{
    this.items.push(item);
    return this;
  }
  compile():string{
    if (this.items.length===0) return '';
    if (this.direction==='column') {
      return this.compileColumn();
    }
    return this.compileRow();
  }
  render():void{
    console.log(this.compile());
  }
}
