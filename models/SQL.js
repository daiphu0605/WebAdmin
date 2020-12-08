module.exports = class SQL{
    constructor(){
        this.select = "";
        this.from = "";
        this.where = "";
        this.limit = "";
        this.offset = "";
    }
    Select(select) {
        this.select = "SELECT " + select + " ";
    }
    From(from) {
        this.from = "FROM " + from + " ";
    }
    Where(where) {
        this.where = "WHERE "+ where + " ";
    }
    Limit(limit){
        this.limit = "LIMIT " + limit + " ";
    }
    Offset(offset){
        this.offset = "OFFSET " + offset + " ";
    }
    Query()
    {
        return this.select + this.from + this.where + this.limit + this.offset; 
    }
}