"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    //회원 가입 및 로그인
    async login() {
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);

        if (user) {
            if (user.id === client.id && user.psword === client.psword) {
                return { success: true };
            }
            return { success: false, msg: "비밀번호가 틀렸습니다." };
        }
        return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch (err) {
            return { success: false, err };
        }
    }

    // async register() {
    //     const client = this.body;
    //     try {
    //         const response = await UserStorage.save(client);
    //         return response;
    //     } catch (err) {
    //         return { success: false, msg: "이미 존재하는 아이디입니다."};
    //     }
    // }

    async idCheck() {
        const client = this.body;
        const response = await UserStorage.getIdCheck(client.data);
        return response;
        
    }

    async nickCheck() {
        const client = this.body;
        const response = await UserStorage.getNickCheck(client.data);
        return response;
        
    }

    async idnickCheck() {
        const client = this.body;
        const response = await UserStorage.getIdNickCheck(client.data1, client.data4);
        return response;
        
    }

    async mailphoneCheck() {
        const client = this.body;
        const response = await UserStorage.getMailPhoneCheck(client.data1, client.data2);
        return response;
        
    }

    async register() {
        const client = this.body;
        const response = await UserStorage.saveMember(client);
        return response;
    }

    async login() {
        const client = this.body;
        const response = await UserStorage.loginMember(client.data1);
        return response;
    }
}

module.exports = User;