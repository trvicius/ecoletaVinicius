function populateUFs() {
    const ufselect = document
    .querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() )
    .then ( states => {

        for( const state of states){
            ufselect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }

        
    } )
}

populateUFs()


function getcities(event) {
    const cityselect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufvalue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    cityselect.innerHTML = "<option value>Selecione a Cidade</option>"
    cityselect.disabled = true


    fetch(url)
    .then( res =>  res.json() )
    .then ( cities => {
        

        for( const city of cities){
            cityselect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
        }

        cityselect.disabled = false
    } )
}


    document
    .querySelector("select[name=uf]")
    .addEventListener("change", getcities)



//itens de coleta
// Pegar todos os Li's

const itemstocollect = document.querySelectorAll(".items-grid li")
for (const item of itemstocollect) {
    item.addEventListener("click", handleselecteditem)
}



const collecteditems = document.querySelector("input[name=items]")

let selecteditems = []




function handleselecteditem(event) {
    const itemli = event.target


    //adicionar ou remover uma classe com javascript
    itemli.classList.toggle("selected")


    const itemid = event.target.dataset.id
    // console.log ('ITEM ID: ', event)
    
    
    //verificar se existem items selecionados, se sim pegar os items selecionados.
    const alreadyselected = selecteditems.findIndex( item => {
        const itemfound = item == itemid //isso sera true ou false
        return itemfound
    })

    // se ja estiver selecionado, tirar da seleção
    if(alreadyselected >= 0) {
        const filtereditems = selecteditems.filter( item => {
            const itemisdifferent = item != itemid
            return itemisdifferent
        })

        selecteditems = filtereditems
    } else{
//Se n estiver selecionado, add a seleção
        selecteditems.push(itemid)
    }

    // console.log ('selecteditems: ', selecteditems)
    
    //Atualizar o campo escondido com os items selecionados
   collecteditems.value = selecteditems

}