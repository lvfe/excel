interface Params {
    data:any[],
    sort?:boolean,
    masterDetail?:boolean,
    masterCols?:string[]
}

export class ExcelExport {
    constructor(params: Params);
    export():void;
}