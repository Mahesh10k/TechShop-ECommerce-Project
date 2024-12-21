//navbar closing function
searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');

} 
document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}



let Home=document.querySelector("section") //Home section
let productsDiv=document.getElementById("productsDiv")  //Products displaying
let cardView=document.getElementById("cardView")

//home clicking function
function home() {
  Home.style.display = "block";
  productsDiv.innerHTML = "";
  cardView.innerHTML="";
}

const url1 = "https://ecommerce-api3.p.rapidapi.com/mobiles";
const options1 = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "f8172ac0b0msh50b38d66da7bc9dp1e6f12jsnf38548901b70",
    "x-rapidapi-host": "ecommerce-api3.p.rapidapi.com",
  },
};

const url2 = "https://ecommerce-api3.p.rapidapi.com/laptops";
const options2 = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "f8172ac0b0msh50b38d66da7bc9dp1e6f12jsnf38548901b70",
    "x-rapidapi-host": "ecommerce-api3.p.rapidapi.com",
  },
};

const url3 = "https://ecommerce-api3.p.rapidapi.com/watches";
const options3 = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "f8172ac0b0msh50b38d66da7bc9dp1e6f12jsnf38548901b70",
    "x-rapidapi-host": "ecommerce-api3.p.rapidapi.com",
  },
};




let allData=[]
let APIdata=JSON.parse(localStorage.getItem("API")) || []
async function mobiles() {
    let response=await fetch(url1,options1)
    let data=await response.json()
    data.forEach(element => {
        element.category="mobiles"
        allData.push(element)
    });
    localStorage.setItem("API",JSON.stringify(allData))
}
mobiles()

async function laptops() {
    let response=await fetch(url2,options2)
    let data=await response.json()
    data.forEach(element => {
        element.category="laptops"
        allData.push(element)
    });
    localStorage.setItem("API",JSON.stringify(allData))

}
laptops()

async function watches() {
    let response=await fetch(url3,options3)
    let data=await response.json()
    data.forEach(element => {
        element.category="watches"
        allData.push(element)
    });
    localStorage.setItem("API",JSON.stringify(allData)) 

}
watches()


// cards Display
function display(allData) {
  productsDiv.innerHTML=""
  cardView.innerHTML=""
  // console.log(allData)
  allData.forEach(x=>{
    let card=document.createElement("div")
    card.setAttribute("id","card")
    card.innerHTML=
    ` <img id="img" src="${x.Image}" >
      <p id="brand">${x.Brand}</p>
      <p id="description">${x.Description}</p>
      <p id="price"><b>Price: ${x.Price}</b></p>
      <button class="btn btn-success" id="addToCart">Add to Cart</button`
      productsDiv.appendChild(card);

      card.querySelector("#addToCart").addEventListener("click",()=>{
        addToCart(x) 
      })
      
      //single card view
      
      card.addEventListener("click",()=>{
        productsDiv.innerHTML=""
        cardView.innerHTML=
        `<button id="back">Back</button>
        <div class="cardView"> 
        <img src="${x.Image}">
        <div><p>${x.Brand}</p>
        <p>${x.Description}</p>
        <p>Rating : 4.2 / 5</p>
        <p><b>Price: ${x.Price}</b></p>
        <button class="btn btn-success" id="addCart">Add to Cart</button>
        <button class="btn btn-success" id="buy">Buy Now</button>
        </div>`
       
        document.getElementById("addCart") .addEventListener("click",()=>{
          addToCart(x)
        })
        document.getElementById("buy").addEventListener("click",()=>{
          if (confirm("Are you sure to want to Buy the Item")) {
               window.location.href = "payments.html"
          }
        })   
        
        let back=document.getElementById("back")
        back.addEventListener("click",()=>{
          cardView.innerHTML=""
          display(allData)
        })
      })
  })
}


let mobile=document.querySelectorAll("#getMobiles")
let laptop=document.querySelectorAll("#getLaptops")
let watch=document.querySelectorAll("#getWatches")

mobile.forEach(x=>x.addEventListener("click",(event)=>{
  event.preventDefault();
  if (localStorage.getItem("isLoggedIn") === "true") {
          Home.style.display = "none";
  let filteredMobiles=APIdata.filter(x=>x.category.includes("mobiles"))
  display(filteredMobiles)
  }else {
       alert("Please login to view products.");
       window.location.href="login.html"
      }
}))

laptop.forEach(x=>x.addEventListener("click",(event)=>{
  event.preventDefault();
  if (localStorage.getItem("isLoggedIn") === "true") {
    Home.style.display = "none";
    let filteredLaptops=APIdata.filter(x=>x.category.includes("laptops"))
    display(filteredLaptops)
  }else{
    alert("Please login to view products.");
    window.location.href="login.html"
  }
}))

watch.forEach(x=>x.addEventListener("click",(event)=>{
  event.preventDefault();
  if (localStorage.getItem("isLoggedIn") === "true") {
    Home.style.display = "none";
  let filteredWatch=APIdata.filter(x=>x.category.includes("watches"))
  display(filteredWatch)
  }else{
    alert("Please login to view products.");
    window.location.href="login.html"
  }
}))



//add to cart process
function addToCart(item) {
  let cartData = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage 
  let exists = cartData.find(x => x.Description === item.Description); 
  if(!exists){
    cartData.push(item);
    alert(`${item.Brand} has been added to your cart!`);
    localStorage.setItem("cart", JSON.stringify(cartData));   // Save cart to localStorage
  }
  else {
   alert(`${item.Brand} is already in your cart!`);
 }
}

// View cart process
function viewCart() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "cart.html"; // Redirect to cart page
  } else {
    alert("Please login to view your cart.");
    window.location.href="login.html"
  }
}

//searchFunction
let search=document.querySelector("#searchbtn")
search.addEventListener("click",(event)=>{
  event.preventDefault();
  if (localStorage.getItem("isLoggedIn") === "true") {
    let keyword = document.getElementById("search").value.toLowerCase().trim();
     Home.style.display = "none";
  if(keyword==""){
    productsDiv.innerHTML =`Please Enter the Valid Name to Search`
  }
    // Filter products of saerch keyword
    const filteredProducts = APIdata.filter((product) =>
        product.Brand.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.Description.toLowerCase().includes(keyword))
        console.log(filteredProducts)
    if (filteredProducts.length === 0) {
      productsDiv.innerHTML = `<p>No products found for "${keyword}".</p>`;
      return;
    }
      Home.style.display = "none";
      display(filteredProducts);
  } else {
    alert("Please login to view products.");
    return;
  }
}) 



//Logout Process
let userId=localStorage.getItem("Name")
let Login=document.querySelector("#login")
let loginSpan=document.getElementById("loginSpan")  
if(localStorage.getItem("isLoggedIn") === "true"){
  loginSpan.textContent=`${userId}`
  Login.id="logout"
  Login.title="Logout"
  Login.addEventListener("click",()=>{ 
    if(confirm("Do you want to Logout")){
      localStorage.setItem("isLoggedIn","false");
      alert("You are Logged Out seccesssfully")
      Login.id="Login"
      Login.title="Login"
    }
  })
}



