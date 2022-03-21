export const getCreds = async () => {
  
  try {
    const data = await fetch('http://localhost:1111/aws/getCreds');
    const formattedResponse = await data.json();
    
    return formattedResponse;
  }
  catch (e) { console.log(e) }
}
