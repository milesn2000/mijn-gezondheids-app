if('serviceWorker' in navigator)
{
    navigator.serviceWorker.register('sw.js')
}

const form = document.querySelector('form');
if (form) 
{
    form.addEventListener('submit', function(event)
    {
        event.preventDefault()
        const opgeslagen = localStorage.getItem('workouts');
        const workouts = opgeslagen ? JSON.parse(opgeslagen) : []
        const categorie = document.getElementById('categorie').value;
        const oefening = document.getElementById('oefening').value;
        const datum = document.getElementById('datum').value;
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value;
        const gewicht = document.getElementById('gewicht').value;
        const duur = document.getElementById('duur').value;
        const workout = { datum, categorie, oefening, sets, reps, gewicht, duur }
        workouts.push(workout)
        localStorage.setItem('workouts', JSON.stringify(workouts))
    })
}

const lijst = document.querySelector('#workout-lijst')
if(lijst)
{
    function renderworkouts(filter)
    {
        lijst.innerHTML = ''
        const workouts = JSON.parse(localStorage.getItem('workouts')) || []
        let gefilterd = workouts
        const vandaag = new Date().toISOString().split('T')[0]

        if(filter === 'dag')
        {
            gefilterd = workouts.filter(w => w.datum === vandaag)
        }
        else if(filter === 'week')
        {
            gefilterd = workouts.filter(w => {
                const diff = (new Date(vandaag) - new Date(w.datum)) / (1000 * 60 * 60 * 24)
                return diff <= 7
            })
        }
        else if(filter === 'maand')
        {
            gefilterd = workouts.filter(w => {
                const diff = (new Date(vandaag) - new Date(w.datum)) / (1000 * 60 * 60 * 24)
                return diff <= 30
            })
        }

        gefilterd.forEach((workout, index) => 
        {
            const li = document.createElement('li')
            li.innerHTML = '<strong>' + workout.datum + '</strong><br>' +
            workout.categorie + '<br>' +
            workout.oefening + '<br>' +
            workout.sets + ' sets<br>' +
            workout.reps + ' reps<br>' +
            workout.gewicht + ' kg<br>' +
            workout.duur + ' min' +
            '<br><button data-index="' + index + '">Verwijderen</button>'
            lijst.appendChild(li)
        })
    }

    lijst.addEventListener('click', function(event)
    {
        if(event.target.tagName === 'BUTTON')
        {
            const index = event.target.dataset.index
            const workouts = JSON.parse(localStorage.getItem('workouts'))
            workouts.splice(index, 1)
            localStorage.setItem('workouts', JSON.stringify(workouts))
            renderworkouts()
        }  
    })

    renderworkouts()
}

const dagBtn = document.getElementById('dag')
const weekBtn = document.getElementById('week')
const maandBtn = document.getElementById('maand')

if(dagBtn)
{
    dagBtn.addEventListener('click', function()
    {
        renderworkouts('dag')
    })
}
if(weekBtn)
{
    weekBtn.addEventListener('click', function()
    {
        renderworkouts('week')
    })
}
if(maandBtn)
{
    maandBtn.addEventListener('click', function()
    {
        renderworkouts('maand')
    })
}

const taalswitch = document.getElementById('taalswitch')
let taal = 'nl'

if(taalswitch)
{
    taalswitch.addEventListener('click', function()
    {
        taal = taal === 'nl' ? 'en' : 'nl'
        taalswitch.textContent = taal === 'nl' ? 'EN' : 'NL'

        document.querySelectorAll('[data-nl]').forEach(function(element)
        {
            element.textContent = element.dataset[taal]
        })
    })
}