import axios from "axios";

const BASE_URL = 'https://mock-api.driven.com.br/api/v4/driven-plus';


function signUp(register) {
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, register);
    return promise;
}

function signIn(login) {
    const promise = axios.post(`${BASE_URL}/auth/login`, login);
    return promise;
}

function planList(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const promise = axios.get(`${BASE_URL}/subscriptions/memberships`, config);
    return promise;
}

function showPlan(PLAN_ID, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const promise = axios.get(`${BASE_URL}/subscriptions/memberships/${PLAN_ID}`, config);
    return promise;
}

function subscribePlan(SUB, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const promise = axios.post(`${BASE_URL}/subscriptions`, SUB, config);
    return promise;
}

function changePlan(PLAN, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const promise = axios.post(`${BASE_URL}/subscriptions`, PLAN, config);
    return promise;
}

function cancelPlan(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const promise = axios.delete(`${BASE_URL}/subscriptions`, config);
    return promise;
}

export { signUp, signIn, planList, showPlan, subscribePlan, changePlan, cancelPlan };