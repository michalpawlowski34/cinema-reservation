let vidNames=document.getElementsByClassName('vidName')
for(let i=0;i<vidNames.length;i++){
    vidNames[i].addEventListener('click',()=>{
        let videoDiv=vidNames[i].parentElement
        vidNameClick(videoDiv)
    })
}

function vidNameClick(videoDiv){
    if(videoDiv.children.length>1){
        deleteElements()
    }
    else{
        deleteElements()
        createSeatTable(videoDiv)
    }
}

function deleteElements(){
    let screen=document.getElementById('screen')
    if(screen!=null){
        screen.remove()
    }
    let seatTableTab=document.querySelectorAll('table')
    for(let i=0;i<seatTableTab.length;i++){
        seatTableTab[i].remove()
    }
    let formWrapper=document.getElementById('formWrapper')
    if(formWrapper!=null){
        formWrapper.remove()
    }
}
function createSeatTable(videoDiv){
    fetch("http://localhost/projektkino/data.php")
    .then(response => response.json())
    .then(data=>{
        let videoDivName=videoDiv.getAttribute('id')
        console.log(data[videoDivName])
        let screen=document.createElement('div')
        screen.setAttribute('id','screen')
        screen.innerHTML="EKRAN"
        videoDiv.appendChild(screen)
        let table=document.createElement('table')
        videoDiv.appendChild(table)
        for(let i=0;i<15;i++){
            let tr=document.createElement('tr')
            table.appendChild(tr)
            for(let j=0;j<20;j++){
                let seatNumber=(j+1)+(20*i)
                let isReserved=false
                for(let x=0;x<data[videoDivName].length;x++){
                    // if(parseInt(data[videoDivName][x].nr_miejsca)==seatNumber){
                    if(data[videoDivName][x].nr_miejsca==seatNumber){
                        isReserved=true
                    }
                }
                let td=document.createElement('td')
                td.innerHTML=`${seatNumber}`
                td.setAttribute('id',seatNumber)
                if(isReserved){
                    td.classList.add('reserved')
                }
                else{
                    td.addEventListener('click',()=>seatClick(td))
                }
                tr.appendChild(td)
            }
        }
        createForm(videoDiv)
    })
    .catch(error => console.log("Błąd: ", error));
    
}
function createForm(videoDiv){
    let formWrapper=document.createElement('div')
    formWrapper.setAttribute('id','formWrapper')
    videoDiv.appendChild(formWrapper)
    let videoDivName=videoDiv.getAttribute('id')
    formWrapper.innerHTML=`
    <form method="post" action="index.php">  
    <label for="fname">Imię:</label><br>
    <input type="text" id="fname" name="fname"><br>
    <label for="phone">Nr kontaktowy:</label><br>
    <input type="tel" id="phone" name="phone" pattern="[0-9]{9}" placeholder="123456789">
    <input type="submit" id="submit" onClick="return checkValues()" value="Rezerwuj">
    <input type="hidden" id="inputNazwa" name="inputNazwa" value=${videoDivName}>
    <input type="hidden" id="seatsChosen" name="seatsChosen" value="">
    </form>
    `
}
function checkValues(){
    let fname=document.getElementById('fname')
    let phone=document.getElementById('phone')
    let seatsChosenHTML=document.getElementsByClassName('clicked')
    if(fname.value==""||phone.value==""){
        alert('Proszę uzupełnić wszystkie pola!')
        return false
    }
    else if(seatsChosenHTML.length==0){
        alert('Proszę wybrać miejsca!')
        return false
    }
    else{
        let seatsChosenArray=[]
        for(let i=0;i<seatsChosenHTML.length;i++){
            seatsChosenArray.push(seatsChosenHTML[i].getAttribute('id'))
        }
        let seatsChosenInput=document.getElementById('seatsChosen')
        seatsChosenInput.value=JSON.stringify(seatsChosenArray)
        console.log(seatsChosenInput.value)
        return true
    }
}
function seatClick(seat){
    if(seat.classList.contains('clicked')){
        seat.classList.remove('clicked')
    }
    else{
        seat.classList.add('clicked')
    }
}