import axios from "axios";
import config from "../config";


export const registration = async (email, name, password) => {
    const response = await axios.post(config.url + '/auth/register', {
        email: email,
        name: name,
        password: password,
    }, {
        headers: {
            'Content-Type': 'application/vnd.api+json'
        }
    })
    return response
}

export const authorization = async (email, password) => {

    const formData = new FormData();
    formData.set('username', email);
    formData.set('password', password);

    const response = await axios.post(
        config.url + '/auth/jwt/login',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
    localStorage.setItem('access', response.data.access_token)
    return response
}

export const getUser = async () => {
    try {
        const response = await axios.get(
            config.url + '/users/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Content-Type': 'application/json'
            },
        })
        return response
    }
    catch {
        localStorage.removeItem('access')
    }
}

export const sendDocs = async (article) => {
    const response = await axios.post(
        config.url + '/articles/add_article',
        article,
        {headers: {
            'Content-Type': 'application/json'
        },
    })
    return response
}

export const getAllArticles = async () => {
    const response = await axios.get(
        config.url + '/articles/all', {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response
}

export default registration