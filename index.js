let loc = document.getElementById("location");
let lat = document.getElementById("latitude");
let long = document.getElementById("longitude");

let ltime = document.getElementById("localtime");

let temp = document.getElementById("temperature");

let cond = document.getElementById("condition");
let cond_img = document.getElementById("condition_img");

let wind_sp = document.getElementById("windspeed");
let wind_dir = document.getElementById("winddirection");

let pre = document.getElementById("precipitation");
let humid = document.getElementById("humidity");

function GetLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(ShowPosition);
    }
}

function ShowPosition(position)
{
    lat.value = position.coords.latitude;
    long.value = position.coords.longitude;
}

function Submit()
{
    var xhr = new XMLHttpRequest(); 

    xhr.onload = (res)=>
    { 
        if(res.target.status == 200)
        { 

            let json = JSON.parse(res.target.responseText);

            loc.value = json["location"]["name"] + ", " + json["location"]["region"] + ", " + json["location"]["country"];

            ltime.value = json["location"]["localtime"];

            temp.value = json["current"]["temp_c"];

            cond.value = json["current"]["condition"]["text"];
            cond_img.style.backgroundImage = "url('https:" + json["current"]["condition"]["icon"] + "')";

            wind_sp.value = json["current"]["wind_mph"];
            wind_dir.value = json["current"]["wind_dir"];

            pre.value = json["current"]["precip_mm"];
            humid.value = json["current"]["humidity"];

        } 

        else
        {
            alert("Error Encountered! Enter correct latitude/longitude!");

            location.reload();
        }
    } 
        
    xhr.open("GET","http://api.weatherapi.com/v1/current.json?key=440478b19adb4eebbb4203355240809&q="+lat.value+","+long.value, true); 
    xhr.send();
}

function Reset()
{
    location.reload();
}

