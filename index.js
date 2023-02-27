const loadSearch=()=>{
  search(10);
}

const search=(datalimit)=>{
  toggleSpinner(true);
  const inputValue=document.getElementById("input-text").value;
  if(inputValue===""){
    alert("please enter valid phone models");
    toggleSpinner(false);
    return;
}
  const url=`https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayPhones(data.data,datalimit))
  .catch(error=>console.log(erorr));
}

const displayPhones=(phones,datalimit)=>{
   const noDatacontainer=document.getElementById("no-data");
    const container=document.getElementById("card-container");
    const showAllbtn=document.getElementById("show-all");
    container.innerHTML="";
    // toggle no Data found
    if(datalimit && phones.length===0){
     noDatacontainer.classList.remove("hidden");
    }
    else{
      noDatacontainer.classList.add("hidden");
    }

    // show all btn found
    if(datalimit && phones.length>10){
      showAllbtn.classList.remove("hidden");
      phones=phones.slice(0,9);
    }
    else{
      showAllbtn.classList.add("hidden");
    }

   
    phones.forEach(phone => {
    //  console.log(phone.phone_name);
    //  console.log(phone.slug);
    const div=document.createElement("div");
    div.innerHTML=`
    <div class="card p-8 card-compact w-full h-[400px] bg-base-100 shadow-lg">
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
     
      <div class="card-actions justify-end">
        <label class="btn btn-primary" for="my-modal-3" onclick="showDetails('${phone.slug}')">Details</label>
      </div>
    </div>
  </div>
    `;
  container.appendChild(div);

});
toggleSpinner(false);
}

// toggle no data found
const toggleSpinner=(isLoading)=>{
  const noDatacontainer=document.getElementById("spinner");
  if(isLoading){
    noDatacontainer.classList.remove("hidden");
  }
  else{
    noDatacontainer.classList.add("hidden");
  }
}

// show details
const showDetails=(phoneId)=>{
 const url=` https://openapi.programming-hero.com/api/phone/${phoneId}`;
 console.log(url);
 fetch(url)
 .then(res=>res.json())
 .then(data=>displayshowDetails(data.data))
}

const displayshowDetails=(phone)=>{
 console.log(phone.mainFeatures.storage);
 console.log(phone.mainFeatures.sensors[0]);
 console.log(phone.mainFeatures.memory);
 const modalContainer=document.getElementById("modal-container");
 modalContainer.innerHTML=`
 <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
 <p class="text-lg font-bold">Storage:${phone.mainFeatures.storage}<p>
 <p class="py-4">Memory:${phone.mainFeatures.memory}</p>
 <p class="py-4">Sesnor:${phone.mainFeatures.sensors[0]}</p>
 `;
}

// search on enter press
document.getElementById("input-text").addEventListener("keypress",function(e){
  console.log(e.key);
  if(e.key==="Enter"){
    search(10);
  }
})


//show all
const showAll=()=>{
  search();
}