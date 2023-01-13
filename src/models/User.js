import { DataTypes } from "sequelize";

import sequelize from "../db/config.js";
import { createPassword } from "../utils/helper.util.js";

const userSchema = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    noms: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
    },
};

const User = sequelize.define("user", userSchema, { timestamps: true });

// util functions on User model
export const findUsers = User.findAll();

export const findUserByUsername = (username) =>
    User.findOne({ where: { username } });

export const saveUser = async (userData) => {
    const hashPassword = await createPassword(userData.password);
    const user = {
        noms: userData.noms,
        email: userData.email,
        username: userData.username,
        password: hashPassword,
        userId: userData.id,
        role: userData.role,
    };

    return new User(user).save();
};

export default User;
