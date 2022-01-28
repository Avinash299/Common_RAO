import XLSX from 'xlsx';

const onExport = () => {
    let doc: any = document.getElementById("matrix-tbl");
    var wb:any = XLSX.utils.table_to_book(doc,{cellStyles:true});
    XLSX.writeFile(wb, 'matrix.xlsx');
}

const printMatrix = () => {
   
}

const filterMatrixList=(arr:Array<any>,dept:string)=>{
    if(dept === 'All Departments'){
         return arr;
    }else{
        return arr.filter((row)=>{
             return row.department=== dept;
        });
    }
}
export { onExport,printMatrix ,filterMatrixList};