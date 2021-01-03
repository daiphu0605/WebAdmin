module.exports = class SQL {
  constructor() {
    this.select = "";
    this.from = "";
    this.where = "";
    this.limit = "";
    this.offset = "";
    this.update = "";
    this.set = "";
  }
  Select(select) {
    this.select = "SELECT " + select + " ";
  }
  From(from) {
    this.from = "FROM " + from + " ";
  }
  Update(update) {
    this.update = "UPDATE " + update + " ";
  }
  Set(set) {
    this.set = "SET " + set + " ";
  }
  Where(where) {
    this.where = "WHERE " + where + " ";
  }
  In(list) {
    var this_list = "IN (";
    list.forEach((element) => {
      this_list += "'" + element + "',";
    });
    this_list = this_list.slice(0, -1);
    this_list += ") ";
    console.log(this_list);
    return this_list;
  }
  Limit(limit) {
    this.limit = "LIMIT " + limit + " ";
  }
  Offset(offset) {
    this.offset = "OFFSET " + offset + " ";
  }
  Query() {
    return this.update + this.set + this.select + this.from + this.where + this.limit + this.offset;
  }
  static  async  queryAsync(sql){
    return new Promise((resolve,reject)=>{
        connection.query(sql,(error,results)=>{
            if (error){
                reject(error);
                return;
            }
            resolve(results);
            return;

        });

    })


}
};
