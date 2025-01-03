//updating flag

function updateFlag(element){
  let country = element.value;
  console.log(element)
  let countryCode = countryList[country];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img= element.parentElement.querySelector("img")
  img.src= newSrc

}
//done

//filling options in select
  let fromCurr = document.querySelector("#from")
let toCurr = document.querySelector("#to")
let arrCurr = [fromCurr, toCurr]
for (const country of arrCurr) {
  for (const code in countryList) {
    let option = document.createElement("option")
    option.value = code
    option.innerText = code
    if (country.name === "from" && code === "USD") {
      option.selected = "selected";
    } else if (country.name === "to" && code === "INR") {
      option.selected = "selected";
    }
    country.append(option)
  }
  country.addEventListener("change", (eve) => {
    console.log(eve)
    updateFlag(eve.target)
  })

}

//done
async function amount(){
   let input=document.querySelector("input")
   let amt=input.value
   let rate1= await convert(fromCurr.value)
   let num1=amt/rate1
   let rate2= await convert(toCurr.value)
   let num2= num1*rate2
   let para=document.createElement("p")
   para.className= "finalmsg"
   para.innerText=`${amt} ${fromCurr.value} - ${num2} ${toCurr.value}`
   document.querySelector(".msg").prepend(para)
   console.log(para[0])
}
async function convert(element){
     let conversion_rate= await getData();
     let from= conversion_rate[element]
     return from
}
convert()
// fetch API
async function getData() {
  let response = await fetch(`https://open.er-api.com/v6/latest/USD`)
  let data= await response.json()
  let rate= data.rates
  return rate
}
//done
let btn= document.querySelector("button")
btn.addEventListener("click",(evt)=>{
  evt.preventDefault()
  amount()
})
