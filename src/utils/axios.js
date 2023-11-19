import axios from "axios";

export const Slack = axios.create({
    baseURL: "http://206.189.91.54/api/v1",
    headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem("token") || '',
        'uid': localStorage.getItem("uid") || '',
        'expiry': localStorage.getItem("expiry") || '',
        'client': localStorage.getItem("client") || '',
    }
})




// const res = await Slack.post('/auth/sign_in', payload)
    
    // const token = res.headers.get('access-token');
    // const uid = res.headers.get('uid');
    // const expiry = res.headers.get('expiry');
    // const client = res.headers.get('client');

    // Slack.defaults.headers['access-token'] = token;
    // Slack.defaults.headers['uid'] = uid;
    // Slack.defaults.headers['expiry'] = expiry;
    // Slack.defaults.headers['client'] = client;

    // localStorage.setItem('token', token)
    // localStorage.setItem('uid', uid)
    // localStorage.setItem('expiry', expiry)
    // localStorage.setItem('client', client)