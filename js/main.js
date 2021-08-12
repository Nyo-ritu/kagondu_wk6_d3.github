//Grabbing form data from submit event

let form = document.querySelector('#f1_form')


//add event listener for submit button
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let query_season = document.querySelector('#season');
    let query_round = document.querySelector('#round');
    let season = event.path[0][0].value;
    let round = event.path[0][1].value;
    console.log(event)
    console.log(season, round)
    console.log(`Testing connection == ${query_season.value} ${query_round.value}`)
})
 

// Get F1 data from axios

const getData = async () => {
    let season_test = document.querySelector('.season').value
    let round_test = document.querySelector('.round').value
    let response = await axios.get(`https://ergast.com/api/f1/${season_test}/${round_test}/driverStandings.json`)
    console.log(response.data)
    return response.dataMRData.StandingsTable.StandingsLists.DriverStandings

};

//store my selectors in an object

const F1_elements = {
    f1_list: '.f1_list'
}

// refer to html to populate table with bootstrap list-items
const create_list = (position, givenName, nationality, constructorid, points) => {
    const html = `<a class="table table-bordered table-dark" id="${position}">"${givenName}">"${nationality}">"${constructorid}">"${points}">"${Name}"</a>`;
    document.querySelector(F1_elements.f1_list).insertAdjacentHTML('beforeend', html)
}

//function to load data and display list
const load_data = async () => {
    const race_result = await getData();
    //loop through array and create list items 
    race_result.forEach(car_race => create_list(car_race.position, car_race.givenName, car_race.nationality, car_race.constructorid, car_race.points))  
};

//I know load data is wrong and that I'm supposed to loop thru for the first 7 drivers, but it's already throwing errors I can't fix....