import { apiconfig } from "../APIS/apiconfig.js";

export function login(data) {
  return new Promise((resolve, reject) => {
    let postData = {
      ...data
    };
    let url = apiconfig.basePath + apiconfig.login;
    console.log(postData);
    fetch(url, {
      body: JSON.stringify(postData),
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      mode: "cors"
    })
      .then(response => response.json())
      .then(res => {
        if (res.userName) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function signup(data) {
  return new Promise((resolve, reject) => {
    let postData = {
      ...data
    };
    let url = apiconfig.basePath + apiconfig.signup;
    console.log(postData);
    fetch(url, {
      body: JSON.stringify(postData),
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      mode: "cors"
    })
      .then(response => response.json())
      .then(res => {
        if (res == 200) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}
