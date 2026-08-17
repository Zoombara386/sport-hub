export const saveCache = (key,data)=>{

localStorage.setItem(
key,
JSON.stringify(data)
);

};


export const getCache = (key)=>{

const data = localStorage.getItem(key);

return data ? JSON.parse(data) : null;

};