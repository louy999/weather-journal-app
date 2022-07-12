/* Global Variables */
const server = "http://127.0.0.1:8000";
const key = document.querySelector("input#key");
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener("click", () => {
  document.querySelector(".myInput").value = "";
  document.querySelector("#date").innerHTML = "";
  document.querySelector("#temp").innerHTML = "";
  document.querySelector("#content").innerHTML = "";
  // Personal API Key for OpenWeatherMap API
  const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
  const apiKey = `,&appid=${key.value}&units=imperial`;
  const zip = document.querySelector("#zip").value;
  if (key.value == "") {
    alert("please index own key");
  }
  // alert when input zip empty
  if (zip == "") {
    alert("please index zip code");
  }

  const feeling = document.querySelector("#feelings").value;
  /* Function to GET Web API Data*/
  const getDataWeather = async (zip) => {
    try {
      const res = await fetch(baseURL + zip + apiKey);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };
  // Function to POST data
  getDataWeather(zip).then((data) => {
    if (data) {
      const {
        main: { temp },
        weather: [{ description }],
      } = data;
      const sendData = {
        newDate,
        temp,
        description,
        feeling,
      };
      postData(server + "/add", sendData).then(() => getData());
      // Function to GET Project Data
    }
  });
});
/* Function to POST data */
const postData = async (url = "", sendData = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
const getData = async () => {
  const res = await fetch(server + "/all");
  try {
    const data = await res.json();
    document.querySelector("#date").innerHTML = data.newDate;
    document.querySelector("#temp").innerHTML = data.temp;
    document.querySelector("#content").innerHTML = data.feeling;
  } catch (error) {
    console.log("error", error);
  }
};
