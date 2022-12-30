
export function getUserData(){
  let userdata = localStorage.getItem('usuario')
  let userObj = JSON.parse(userdata)
  return userObj;
}