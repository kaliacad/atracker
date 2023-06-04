
import sequelize from "../db/config.js"

const StudentCohort = sequelize.define("Student_Cohort", {}, { timestamps: false }, { freezeTableName: true });

StudentCohort.removeAttribute('id')

export const findAllStudentCohort = StudentCohort.findAll()

export default StudentCohort
