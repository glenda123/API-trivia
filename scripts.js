// Open Trivia
// https://opentdb.com/api_config.php

// Instrucciones
// 1. Muestra al usuario las distintas categorias entre las cuáles puede elegir para
// las preguntas
// 2. Le das al usuario la opción de elegir entre preguntas de opción múltiple o preguntas de
// verdadero o falso
// 3. Mostramos 10 preguntas aplicando los filtros anteriores junto con las respuestas posibles



// 3.1 El usuario selecciona las respuestas 
// 4. Le indicas al usuario cuántos aciertos tuvo y cuántos errores tuvo

const questions= 'https://opentdb.com/api.php?amount=10'
const endpoint = 'https://opentdb.com/api.php?amount=10&category=32&type=multiple'

// Está función se ecargara de obtener todas las categorías disponibles
function getCategories() {
     const endpointCategories = 'https://opentdb.com/api_category.php'
    // const endpointCategories='https://opentdb.com/api.php?amount=10&category=13&type=boolean'
    fetch(endpointCategories)
        .then(response => response.json())
        .then(dataJson => {
            console.log(dataJson)
            printCategories(dataJson.trivia_categories)
            
            
        })
        .catch(error => {
            console.error(error)
        })

}
// 1. obtengo el elemento donde quiero imprimir las categorías
// 2. Genero el html
// 3. Imprimo las categorías
function printCategories(categories) {
    const selectCategories = document.getElementById('select-categories')
    // console.log(categories)

    let html = `<option value="">Selecciona aqui</option>`
    categories.forEach(category => {
        html += `<option value="${category.id}">${category.name}</option>`
    });

  
    selectCategories.innerHTML = html

}

function selectCategory() {
    const categoryID = document.getElementById('select-categories').value
    // alert(`Se seleccionó la categoría con el id ${categoryID}`)
}

getCategories()



function getQuestions() {
    // let endpointQuestions = 'https://opentdb.com/api.php?amount=10&category=23&type=boolean'
    const endpoint = selectTrueFalseMultiple()
   fetch(endpoint)
       .then(response => response.json())
       .then(dataJson => {
            printQuestions(dataJson.results)
       })
       .catch(error => {
           console.error(error)
       })

}

function printTypes() {
    
    const selectTypes = document.getElementById('type')

   let  html =`
   <option value="">Selecciona aqui</option>
   <option value="boolean">True/ False</option>
   <option value="multiple">Multiple choise</option>` 
   
    selectTypes.innerHTML = html


}

function selectTrueFalseMultiple(){
        
    let selectCategory=document.getElementById('select-categories').value
   
        let selectype = document.getElementById('type').value
        let  url =  `https://opentdb.com/api.php?amount=10&category=${selectCategory}&type=${selectype}`
        return url 

  }


  function printQuestions(preguntas){

        let Questions = document.getElementById('preguntas')
   
       let htmlQuestions = preguntas.map(function(pregunta, index) {
     
            if (pregunta.type==="boolean"){
    
                return `
                <div class="col-lg-3 col-sm-12">
                <div class="card mb-4">
                    <div class="card-body">
                       
                        <p class="card-text"><b>${index+1}. ${pregunta.question}</b></p><br>
                        <p class="card-text">
                        <label><input type="radio" value="true" name="questions${index}" />${pregunta.correct_answer} </label>
                         <br>
                        <label><input type="radio" value="false" name="questions${index}" />${pregunta.incorrect_answers}  </label>
                        <br>
                        <br>
                        </p>
                   </div>
                 </div>
                </div>
                `
            }
    
            else if(pregunta.type==="multiple"){
    
                return `
                <div class="col-3 col-sm-12">
                  <div class="card mb-4">
                     <div class="card-body">
                       <p class="card-text"><b>${index+1}. ${pregunta.question}</b></p><br>
                       <p class="card-text">
                            <label><input type="radio" name="questions${index}" value="true"  /> ${pregunta.correct_answer}</label>
                            <br>
                            <label><input type="radio" name="questions${index}" value="false"  /> ${pregunta.incorrect_answers[0]} </label>
                            <br>
                            <label><input type="radio" name="questions${index}" value="false"  /> ${pregunta.incorrect_answers[1]} </label>
                            <br>
                            <label><input type="radio" name="questions${index}" value="false"  /> ${pregunta.incorrect_answers[2]} </label>
                            <br>
                            <br>
                            <br>
                       </p>
                    </div>
                  </div>
                </div>
                
                `
            }
        })
        
        const htmlJoined=htmlQuestions.join("")
        Questions.innerHTML = htmlJoined
            

    }
  

    function mostrarResultado(){
    
        let resultado = document.getElementById('resultados')
        let incorrects=0;
        let radio =  document.querySelectorAll("input[name*='questions']");
        let points = 0
        radio.forEach(element => {
            if(element.checked) {
                if(element.value == 'true') {
                    points++
                }
                else{
                    incorrects++;
                }
            }
        })
        
          let result=`
         
         <h5>Usted tiene <b>${points} </b> respuestas correctas y <b> ${incorrects}</b> respuestas incorrectas</h5><br><br>
         `
         resultado.innerHTML=result;
        
    }
    // getQuestions()
    printTypes()
    //  printQuestions(preguntas)
    