export const DeleteChannel=(id,token)=>{
var myHeaders = new Headers();
myHeaders.append("projectID", "f104bi07c490");
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`https://academics.newtonschool.co/api/v1/quora/channel/${id}/`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}