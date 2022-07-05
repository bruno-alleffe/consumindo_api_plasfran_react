import api from "./api"

export async function login(email, password) {
    return api.post("/Auth/entrar", {email, password, mobile:false})
}