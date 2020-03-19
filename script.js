let data
let proxy = "https://cors-anywhere.herokuapp.com/"
let city = "New York"
let input = document.querySelector("input")
let button = document.querySelector("button")
let temperature = document.querySelector(".temperature")
let winds = document.querySelector(".winds")
let description = document.querySelector(".description")
let clouds = document.querySelector(".clouds")
let humidity = document.querySelector(".humidity")
let name = document.querySelector(".name")
let img = document.querySelector(".img")
let display_Container = document.querySelector(".display_Container")
let local_time = document.querySelector(".local_time")
let xml = new XMLHttpRequest()
let a
let b

let time = new Date().getHours()



const getData = ()=>{
 xml.onreadystatechange = ()=>{
   if(xml.status===200 && xml.readyState===4){
      data = JSON.parse(xml.responseText)
      temperature.innerHTML = `Temperature ${(data.main.temp - 273.15).toFixed(1)}°C<br>Feel: ${(data.main.feels_like - 273.15).toFixed(1)}°C`
      winds.innerHTML = `Winds: ${data.wind.speed} Meter/Sec`
      description.innerHTML = `${data.weather[0].main} - ${data.weather[0].description}`
      clouds.innerHTML = `Clouds: ${data.clouds.all}%`
      name.innerHTML = `City: ${data.name} (${data.sys.country})`
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`
      let current = time + (data.timezone/3600)
      if(current>23){
         current = current - 24
      }
       
      a = setInterval(()=>{
      let min = new Date().getMinutes()
      if(min<10){
         local_time.innerHTML = `Local Time - ${current} : 0${min}`
      }else{
         local_time.innerHTML = `Local Time - ${current} : ${min}`
      }
},1000)
      
      
 
      
if(data.weather[0].main==="Clear" && (current>5 && current<19)){
   img.src = "images/Sunny-icon.png"
}else if(data.weather[0].main==="Clear" && (current<5 || current>=19)){
   img.src = "images/icon-circle-png-3.png"
}else if(data.weather[0].main==="Rain" && (current>5 && current<19)){
   img.src = "images/15_heavy_rain-512.png"
}else if(data.weather[0].main==="Rain" && (current<5 || current>=19)){
   img.src = "images/night-rain-cloud-cloudy-moon-weather-38944.png"
}else if(data.weather[0].main==="Snow" && (current>5 && current<19)){
   img.src = "images/unnamed(1).png"
}else if (data.weather[0].main==="Snow" && (current<5 || current>=19)){
   img.src = "images/images.png"
}else if(data.weather[0].main==="Clouds" && (current>5 && current<19)){
   img.src = "images/unnamed.png"
}else if(data.weather[0].main==="Clouds" && (current<5 || current>=19)){
   img.src = "images/moon-and-clouds-png-7.png"
}
         display_Container.classList.add("active")
         img.classList.remove("large")
      setTimeout(()=>{
         display_Container.classList.remove("active")
         img.classList.add("large")
      },2000)  
   }
}
 xml.open("GET",`${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&appid=36dd9a41718de9537a5c1eb8cbf26226`,true)
 xml.send()
}
getData()

const changeLocation = ()=>{
   clearInterval(b)
   clearInterval(a)
   city=input.value
   fetch(`${proxy}api.openweathermap.org/data/2.5/weather?q=${city}&appid=36dd9a41718de9537a5c1eb8cbf26226`).then(a=>a.json()).then(a=>data=a)
   setTimeout(()=>{
      temperature.innerHTML = `Temperature ${(data.main.temp - 273.15).toFixed(1)}°C<br>Feel: ${(data.main.feels_like - 273.15).toFixed(1)}°C`
      winds.innerHTML = `Winds: ${data.wind.speed} Meter/Sec`
      description.innerHTML = `${data.weather[0].main} - ${data.weather[0].description}`
      clouds.innerHTML = `Clouds: ${data.clouds.all}%`
      name.innerHTML = `City: ${data.name} (${data.sys.country})`
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`
      let current = time + (data.timezone/3600)
      if(current>23){
         current = current - 24
      }
           b = setInterval(()=>{
      let min = new Date().getMinutes()
      if(min<10){
         local_time.innerHTML = `Local Time - ${current} : 0${min}`
      }else{
         local_time.innerHTML = `Local Time - ${current} : ${min}`
      }
},1000)

      
if(data.weather[0].main==="Clear" && (current>5 && current<19)){
   img.src = "images/Sunny-icon.png"
}else if(data.weather[0].main==="Clear" && (current<5 || current>=19)){
   img.src = "images/icon-circle-png-3.png"
}else if(data.weather[0].main==="Rain" && (current>5 && current<19)){
   img.src = "images/15_heavy_rain-512.png"
}else if(data.weather[0].main==="Rain" && (current<5 || current>=19)){
   img.src = "images/night-rain-cloud-cloudy-moon-weather-38944.png"
}else if(data.weather[0].main==="Snow" && (current>5 && current<19)){
   img.src = "images/unnamed(1).png"
}else if (data.weather[0].main==="Snow" && (current<5 || current>=19)){
   img.src = "images/images.png"
}else if(data.weather[0].main==="Clouds" && (current>5 && current<19)){
   img.src = "images/unnamed.png"
}else if(data.weather[0].main==="Clouds" && (current<5 || current>=19)){
   img.src = "images/moon-and-clouds-png-7.png"
}
         display_Container.classList.add("active")
         img.classList.remove("large")
      setTimeout(()=>{
         display_Container.classList.remove("active")
         img.classList.add("large")
      },1000)     
      
      
   },2000)
   
}
button.addEventListener("click",changeLocation)
