export const AddComment=(id,replyComment,token)=>{
    var myHeaders = new Headers();
myHeaders.append("projectID", "f104bi07c490");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

var raw = JSON.stringify({
  "content": `${replyComment}`
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`https://academics.newtonschool.co/api/v1/quora/comment/${id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    
    console.log(result)})
  .catch(error => console.log('error', error));

}