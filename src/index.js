import * as XLSX from "xlsx";
import * as _ from 'underscore';
let data, data_group;
export default class ExportExcel {
    constructor(params){
        // if(params.data) {
        //     throw Error("missing params");
        // }
        data = require("../data.json");
        data_group = require("../datagroup.json");
        this.writeXLSX(this.groupDataConvertToAoa(data_group));
    }
    export() {
        const ws = XLSX.utils.json_to_sheet(data, {skipHeader: true});
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "sheet1");
        XLSX.writeFile(wb, "sheetjs.xlsx");
    }
    groupDataConvertToAoa(groupData) {
        let ws_data =[];
        let values = _.values(groupData);
        let value = values[0][0];
        let header = Object.keys(value);
        ws_data.push(header);  
        _.each(groupData, (values, key)=>{
            ws_data.push([[key]]);
            _.each(values, value=>{
                ws_data.push(Object.values(value));
            });
        });
        let ws = XLSX.utils.aoa_to_sheet(ws_data); 
        let maxLength = _.size(header);
        let r=1;
        let merges=[];
        _.each(groupData, (values, key)=>{
             merges.push({s: {r: r, c: 0}, e: {r: r, c: maxLength-1}});
             r+=_.size(values)+1;
        });
        ws["!merges"] = merges;
        return ws;
    }
    
    writeXLSX(ws) {
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "sheet1");
        XLSX.writeFile(wb, "sheetjs.xlsx");
    }
    
    
}