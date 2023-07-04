const container = document.querySelector('.container');
const search = document.querySelector('.searchBox button');
const weatherBox = document.querySelector('.weatherBox');
const weatherDetails = document.querySelector('.weatherDetails');
const errorPage = document.querySelector('.notFound');

search.addEventListener('click', () => {

    const APIKEY = '3a59cd86ac0249d7b7161732230407';
    const city = document.querySelector('.searchBox input').value;

    if (city === '') {
        return;
    }
       
    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}`)
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                errorPage.style.display = 'block';
                errorPage.classList.add('fadeIn');
                errorPage.querySelector('p').textContent = 'Sorry, we cannot find that location. Please try again.';
                return;
            } 

            errorPage.style.display = 'none';
            errorPage.classList.remove('fadeIn');

            const temperature = document.querySelector('.weatherBox .temperature');
            const description = document.querySelector('.weatherBox .description');
            const humidity = document.querySelector('.weatherDetails .humidity span');
            const wind = document.querySelector('.weatherDetails .wind span');

            temperature.innerHTML = `${parseInt(json.current.temp_f)}<span>°F</span>`;
            description.innerHTML = `${json.current.condition.text}`;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${parseInt(json.current.wind_mph)} MPH`;

            container.style.height = 'auto';
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'block';
        })
        .catch(error => {
            console.log('Error:', error);
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            errorPage.style.display = 'block';
            errorPage.classList.add('fadeIn');
            errorPage.querySelector('p').textContent = 'An error occurred. Please try again later.';
        });

});
