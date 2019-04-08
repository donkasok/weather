const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
messageOne.textContent = 'Loading....'
messageTwo.textContent = ''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchTerm.value;
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageTwo.textContent = data.error
            }else{
                messageOne.textContent = 'Location : ' + data.location
                messageTwo.textContent = data.summary + ' .with a temparature of ' + data.temp + ' wind speed of ' + data.wind + ' and probability of rain ' + data.rain
            }
        })
    })
})
