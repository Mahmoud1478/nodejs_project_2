"use strict";
// export const SELECT_STATEMENT = (colums:string , table:string):string => `select ${colums} from ${table}`;
exports.__esModule = true;
exports["default"] = {
    arrangement: ["joins", "wheres"],
    select: function (table, colums) { return "SELECT ".concat(colums, " FROM ").concat(table); },
    update: function (table, colums) { return "UPDATE ".concat(table, " SET ").concat(colums); },
    "delete": function (table) { return "DELETE FROM ".concat(table); },
    where: function (conditions) { return " WHERE ".concat(conditions); },
    insert: function (table, colums, values) {
        return "INSERT INTO ".concat(table, " (").concat(colums, ") VALUES (").concat(values, ") RETURNING *");
    }
};
