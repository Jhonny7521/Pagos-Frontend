
export function getUserData(){
  let userdata = localStorage.getItem('usuario')
  let userObj = JSON.parse(userdata)
  return userObj;
}

export function getObjectSelected(id, arrayObjects){
  const objSelected = arrayObjects.find( (obj) => obj.id === Number(id) )

  if (objSelected){
    return objSelected
  }

  return "Objeto no existente"
}