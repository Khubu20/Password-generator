const inputSlider=document.querySelector("#lengthSlider");
const lengthDisplay= document.querySelector("[data-lengthNumber]");

const passwordDisplay=document.querySelector("[data-passwordDisplay]"); //used to fetch the elements
const cpyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numberscheck=document.querySelector("#numbers");
const symbolscheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generateButton");
const allCheckbox= document.querySelectorAll("input[type=checkbox]");

const symbols= '+_-^@#$?";%():={&}[*]|/<.>!,';  //string 

let password="";
let passwordLength=10;
let checkcount=1;
handleSlider();
//set strength circle color to grey


//set PasswordLength
function handleSlider(){
    inputSlider.value=passwordLength;   //initially slider and length be 10
    lengthDisplay.innerText=passwordLength;
}
function setIndicator(color){
    indicator.style.backgroundColor = color;  //give input color
    //shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;


}
setIndicator("#ccc"); 
 

function getRndInteger(min,max){
 return Math.floor(  Math.random()*(max-min))+min;  //random number b/w min & max
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getRndInteger(97,123));   //a->z  //string.fr...convert int character
}

function generateUpperCase(){
    return  String.fromCharCode(getRndInteger(65,91));    //A to Z 

}

function generatesymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);

}

function calcStrength(){
    let hasUpper=false;
    let hasLower= false;
    let hasNum =false;
    let hasSym=false;

    if(uppercasecheck.checked) hasUpper=true;
    if(lowercasecheck.checked) hasLower=true;
    if(numberscheck.checked) hasNum=true;
    if(symbolscheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    }
    else if( (hasLower || hasUpper )&& (hasNum||hasSym) && passwordLength>=6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");

    }
}


 async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);   //copy password to clipboARD // await use for resolve
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    //to make copy vala span visible
    copyMsg.classList.add("active");   //use in css

    //remove aftr 2 sec
    setTimeout(() => {
        copyMsg.classList.remove("active");

    },2000);

     

}    


    //Fisher yates method
    function shufflePassword(passwordArray) {
        // Fisher-Yates Shuffle Algorithm
        for (let i = passwordArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
        }
        return passwordArray.join("");
    }
    


function handlecheckBoxChange(){
    checkcount=0;
    allCheckbox.forEach(checkbox=>{
    
        if(checkbox.checked){
            checkcount++;
        }
        })
        //special condition
        if(passwordLength<checkcount){
            passwordLength=checkcount
            handleSlider();
        }
}
 allCheckbox.forEach((checkbox) => {
 checkbox.addEventListener('change',handlecheckBoxChange);
 });
//Event listner on slider
 inputSlider.addEventListener('input',(e)=> {
    passwordLength=e.target.value;
    handleSlider();
 });

 cpyBtn.addEventListener('click',() =>{
    if(passwordDisplay.value){
        copyContent();
    }
 });

 //add event listener on generate password
generatebtn.addEventListener('click',() =>{
// none of the Checkbox are selected
 if(checkcount<=0){  
    alert("Please select at least one checkbox.");
    return;}

 if(passwordLength<checkcount){
    passwordLength=checkcount;
    handleSlider();
 }
 console.log("starting the journey");
 //let's start the journey to find new password


 //remove old password
 password="";

 //lets's put all the stuff mentioned by checkbox
//  if(uppercasecheck.checked){
//     password += generateUpperCase();
//  }
//  if(lowercasecheck.checked){
//     password += generateLowercase();
//  }
//  if(numberscheck.checked){
//     password += generateRandomNumber();
//  }
//  if(symbolscheck.checked){
//     password += generatesymbol();
//  }
let funcArr=[];
if(uppercasecheck.checked)
    funcArr.push(generateUpperCase);
if(lowercasecheck.checked)
    funcArr.push(generateLowercase);
if(numberscheck.checked)
    funcArr.push(generateRandomNumber);
if( symbolscheck.checked)
    funcArr.push(generatesymbol);

//compulsory addition   ticked checks
for(let i=0;i<funcArr.length;i++){
    password +=funcArr[i]();
}
console.log("compulsory addition done");

//remaining addition
for(let i=0;i<passwordLength-funcArr.length;i++){
    let randIndex=getRndInteger(0,funcArr.length);
    password+= funcArr[randIndex]();
}
console.log("remaining addition done");

//shuffle the password
password= shufflePassword(Array.from(password));
console.log("shuffling done");

//show in UI
passwordDisplay.value=password;
console.log("UI addition done");

//calcstrength
calcStrength();


 


});




