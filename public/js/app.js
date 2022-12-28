
// console.log("Javascript file")




const formHandler = document.querySelector('form')
const inputHandler = document.querySelector('input')



formHandler.addEventListener('submit', (e)=>{
    e.preventDefault()

    const message1 = document.querySelector('#message-1')
    const message2 = document.querySelector('#message-2')

    message1.textContent = 'Loading...'


    const location = inputHandler.value

    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response)=>{
    response.json().then((data)=>{

        if(data.error)
        {
            message1.textContent = data.error
            console.log(data)
            
        }
        else
        {
            message1.textContent = 'In '+data.address+', '+ data.result
            console.log(data)
        }
    })
})
    
})