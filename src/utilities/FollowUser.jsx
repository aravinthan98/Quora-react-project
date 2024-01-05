export const FollowUser=(id,token)=>{
    var myHeaders = new Headers();
    myHeaders.append("projectID", "f104bi07c490");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`https://academics.newtonschool.co/api/v1/quora/follow/${id}`, requestOptions)
    .then(response => response.json())
    .then((result)=>{
    })
    .catch(error => console.log('error', error));
}