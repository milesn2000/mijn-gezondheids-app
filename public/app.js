const form = document.querySelector('form');
if (form) 
{
    form.addEventListener('submit', function(event)
    {
        event.preventDefault()
        const opgeslagen = localStorage.getItem('workouts');
        const workouts = opgeslagen ? JSON.parse(opgeslagen) : []
        const datum = document.getElementById('datum').value;
        const categorie = document.getElementById('categorie').value;
        const oefening = document.getElementById('oefening').value;
        const sets = document.getElementById('sets').value;
        const reps = document.getElementById('reps').value;
        const gewicht = document.getElementById('gewicht').value;
        const duur = document.getElementById('duur').value;
        const workout = 
        {
            datum: datum,
            categorie: categorie,
            oefening: oefening,
            sets: sets,
            reps: reps,
            gewicht: gewicht,
            duur: duur
        }
        workouts.push(workout)
        localStorage.setItem('workouts', JSON.stringify(workouts))
    })
}

const lijst = document.querySelector('#workout-lijst')

if(lijst)
{
    
}