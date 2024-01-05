export const FetchVote=(id,token,method)=>{
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions = {
      method: `${method}`,
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`https://academics.newtonschool.co/api/v1/quora/like/${id}`, requestOptions)
      .then(response => response.json())
      .then((result) => {
        })
      .catch(error => console.log('error', error));

     
} 