// models
import User from "../models/User.js";
import Student from "../models/Student.js";
import Presence from "../models/Presence.js";
import Cohorte from "../models/Cohorte.js";

export default async () => {
    // database relations
    User.hasMany(Student, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    });
    Student.belongsTo(User);

    Cohorte.hasMany(Student, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    });
    Student.belongsTo(Cohorte);

    Student.hasMany(Presence, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    });
    Presence.belongsTo(Student);
};
