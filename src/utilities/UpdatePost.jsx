export const UpdatePost=(title,content,token,id)=>{
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var formdata = new FormData();
    formdata.append("title", `${title}`);
    formdata.append("content", `${content}`);
    
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`https://academics.newtonschool.co/api/v1/quora/post/${id}`, requestOptions)
      .then(response => response.text())
      .then((result) =>{

      })
      .catch(error => console.log('error', error));
}
