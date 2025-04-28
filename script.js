// core variables defining 
let contct_form_submit_button = document.getElementById("contact_form_submit");
let circles = [document.getElementById("st_circle"), document.getElementById("nd_circle"), document.getElementById("rd_circle"), document.getElementById("rth_circle")];
let booking_buttons = [
    Array.prototype.slice.call(document.querySelectorAll(`.clickables button[data-choice="size"]`)),
    Array.prototype.slice.call(document.querySelectorAll(`.clickables button[data-choice="syrup"]`)),
    Array.prototype.slice.call(document.querySelectorAll(`.clickables button[data-choice="decaf"]`)),
    Array.prototype.slice.call(document.querySelectorAll(`.clickables button[data-choice="tempreture"]`)),
    Array.prototype.slice.call(document.querySelectorAll(`.clickables button[data-choice="cream"]`))
]


// toggle funtions for the booking panel buttons 
function button_togle(element){ 
    if (element.dataset.togle == "false") {
        let similar_buttons = Array.prototype.slice.call(document.querySelectorAll(`.clickables button[data-choice="${element.dataset.choice}"]`))
        similar_buttons.forEach((similar) => {similar.style.backgroundColor = ""; similar.dataset.togle = "false"  })
        element.style.backgroundColor = element.dataset.activecolor;
        element.dataset.togle = "true";
    }else if (element.dataset.togle == "true"){
        element.style.backgroundColor = "";
        element.dataset.togle = "false";
    }

}

function seat_togle(filter, element){
    if (element.dataset.togle == "false") {
        element.style.filter = filter;
        element.dataset.togle = "true";
    }else if (element.dataset.togle == "true"){
        element.style.filter = "";
        element.dataset.togle = "false";
    }
}


// reseting the the buttons of the booking panel 
function reset_booking_buttons() {
    booking_buttons.forEach((buttons_category) => {buttons_category.forEach((button) => {
        button.style.backgroundColor = ""; button.dataset.togle = "false"})})  
} 

// autosetting the choice in the booking panel when menu item is clicked 
function chosing_menu_item (item) {
    reset_booking_buttons();
    let choices = item.dataset.choices.split(' ');
    
    for (let i = 0; i < (choices.length - 1) ; i++ ){
        booking_buttons[i][Number(choices[i])].style.backgroundColor = booking_buttons[i][Number(choices[i])].dataset.activecolor;
        booking_buttons[i][Number(choices[i])].dataset.togle = "true"
    }
    document.getElementById("booking_panel_image_preview").src = choices[5]
    

    // size, syrups, decaf, tempreture, whipped cream, name of the image

}


// coffee ordering amount changing buttons
function amount_change(action){
    let amount_indicator = document.getElementById("amount_indicator");
    if (action == "add") {
        amount_indicator.innerText = Number(amount_indicator.innerText) + 1 
    }else if (action == "remove" && Number(amount_indicator.innerText) != 0) {
        amount_indicator.innerText = Number(amount_indicator.innerText) - 1
    }
    
}


// quiz grading function
function quiz_check(distractions,group, public, consistency, quiz_score_field) { 
    let score = 0;
    let message;
    if (distractions == "1"){
        score += 2;
    }

    if (group == "1") {
        score += 2;
    }

    if (public <= 3) {
        score += 1;
    }else if (public <= 6) {
        score += 2;
    }else if (public <= 10) {
        score += 3;
    }

    if(consistency == "1"){
        score += 1;
    }
    else if(consistency == "3"){
        score += 3;
    }
    else if(consistency == "4"){
        score += 2;
    }

    if (score < 3 ){
        message = "Try us with 20% off!";
    }else if (score < 6){
        message = "We might suit some days!";
    }else if (score < 9) {
        message = "Almost perfect - come optimize!";
    }else if (score == 10 ) {
        message = "Your ideal study spot found!";
    }
    quiz_score_field.innerText = `Your suitability is: ${score}. ${message}`

}



// quiz progress bar
setInterval( () => {
    let self_correcting_quiz = document.forms['self_correcting_quiz'];
    let distractions = self_correcting_quiz["distractions"].value
    let group = self_correcting_quiz['group'].value;
    let public = self_correcting_quiz['public'].value;
    let consistency = self_correcting_quiz["consistency"].value
    let progress_bar = document.getElementById("quiz_progress");
    
    let progress = 0;
    console.log
    if (distractions != "") {
        progress += 25
    }
    if (group != ""){
        progress += 25
    }
    if (public != 0){
        progress += 25
    }
    if(consistency !=""){
        progress += 25
    }

    progress_bar.value = progress;

    if (progress == 100){
        quiz_check(distractions,group, public, consistency, document.getElementById("quiz_score"))
    }
},100)

setInterval( () => {
    document.getElementById("quiz_range_indicator").innerText = document.forms['self_correcting_quiz']['public'].value;
},100)



// contact form validation 
contct_form_submit_button.addEventListener("click", ()=>{
    let form = document.forms['contact_form'];
    let email = form['email'].value;
    let name = form['name'].value;
    let title = form['title'].value;
    let content = form['content'].value;
    let error = document.getElementById("contact_form_error");

    if (email == "" || title == ""|| content == "" || name == ""){
        error.innerText = "you should fill all the fields!";
    }else if ( email.split("@")[1] != "gmail.com" || email.split("@")[0] == ""){
        error.innerText = "The email format is invalid, use the following format example@gmail.com";
    }else if (content.length < 10){
        error.innerText = "Your message should be longer";
    }else{
        error.innerText = "";
    }
});

// scrolling circles behaviour
addEventListener("scroll", (event) => {
    currentY = window.scrollY;  
    full_height = document.body.scrollHeight - document.documentElement.clientHeight;

    if ( 0 <= currentY && currentY <= (full_height / 4)) {
        circles.forEach((circle) => circle.classList.remove("current_circle"));
        circles[0].classList.add("current_circle");
    }else if ((full_height / 4) <= currentY && currentY <= (full_height / 4) *2){
        circles.forEach((circle) => circle.classList.remove("current_circle"));
        circles[1].classList.add("current_circle");
    }else if ((full_height / 4) *2 <= currentY && currentY <= (full_height / 4) *3){
        circles.forEach((circle) => circle.classList.remove("current_circle"));
        circles[2].classList.add("current_circle");
    }else if ((full_height / 4) *3 <= currentY && currentY <= (full_height / 4) *4){
        circles.forEach((circle) => circle.classList.remove("current_circle"));
        circles[3].classList.add("current_circle");
    }
    else {
        circles.forEach((circle) => circle.classList.remove("current_circle"));
    }
});

