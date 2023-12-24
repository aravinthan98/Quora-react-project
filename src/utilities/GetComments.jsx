export const GetComments=(id,token)=>{
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    
      redirect: 'follow'
    };
    
    return fetch(`https://academics.newtonschool.co/api/v1/quora/post/${id}/comments`, requestOptions)
      .then((response) => response.json())
      .then((result) =>{
        
        return result;
      })
      .catch(error => console.log('error', error));   
}