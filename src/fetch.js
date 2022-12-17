const url = "https://cdn.crediwatch.com/assets/json/ews_score.json";

fetch(url)
  .then((response) => response.json())
  .then((json) => console.log(json));
