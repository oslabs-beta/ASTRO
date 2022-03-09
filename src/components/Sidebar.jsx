import React from 'react';
import { Link } from 'react-router-dom';

const sideBar = () =>{
  const result = [];


fetch('http://localhost:1111/aws/getLambdaFunctions', {
     method: "POST",
     headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        region: "us-east-1",
        credentials: {
            accessKeyId: "AKIA5TZBMT7EJNT2IGMU",
            secretAccessKey: "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"
        }
      })
 })
 .then((response) => response.json())
 .then(data => {
  // const result = [];
   for (let i = 0; i < data.length; i++) {
     const el = data[i];
    //  console.log('for loop', el)
     result.push(el)
   }
   console.log(result.length)
 })
 .catch((err) => console.log(err))

 
//  .then((data) => console.log('data', data.json()))
//  .catch((err) => console.log(err))
// console.log('The response is right here', funcNames)
// }
 //console.log('this is func list', funcList);
//  funcNames();
// console.log('this is result', result)
// const buttons = [];

// for(let i = 0; i < result.length; i++){
//   console.log('func', i)
//     buttons.push(<div>{result[i]}</div>);
// }

return(
    <div>
      {/* {buttons} */}
       <h1>Sidebar</h1>
    </div>
    )

}

export default sideBar;
