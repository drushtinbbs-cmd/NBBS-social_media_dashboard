let allData = [];

fetch("https://script.google.com/macros/s/AKfycbwuhRCZOhSpG4w_xgSbTKHX-CK7fl0ZJsraB2DukoOcfTx7AO66-Dwi6tthlz9NXq6xyw/exec")

.then(res => res.json())

.then(data => {

allData = data;

updateCards(allData);

const upcoming = allData.filter(post => {

return (post.Status || "").toLowerCase() !== "posted";

});

renderTable(upcoming);

});

function renderTable(data){

const table = document.getElementById("contentTable");

table.innerHTML = "";

data.forEach(post => {

table.innerHTML += `

<tr>

<td>${formatDate(post.Date)}</td>

<td>
<span class="${platformClass(post.Platform)}">
${post.Platform}
</span>
</td>

<td>${post.Reel}</td>

<td>${post.Topic}</td>

<td>${formatTime(post.Time)}</td>

<td>
<span class="${statusClass(post.Status)}">
${post.Status}
</span>
</td>

</tr>

`;

});

}

function updateCards(data){

document.getElementById("totalPosts").innerText = data.length;

document.getElementById("scheduledPosts").innerText =
data.filter(p => (p.Status || "").toLowerCase() === "scheduled").length;

document.getElementById("pendingPosts").innerText =
data.filter(p => (p.Status || "").toLowerCase() === "pending").length;

}

function formatDate(date){

if(!date) return "";

return new Date(date).toLocaleDateString("en-IN", {

day:"2-digit",
month:"short",
year:"numeric"

});

}

function formatTime(time){

if(!time) return "";

return new Date(time).toLocaleTimeString("en-IN", {

hour:"2-digit",
minute:"2-digit",
hour12:true

});

}

function platformClass(platform){

switch(platform){

case "WhatsApp":
return "whatsapp";

case "YouTube":
return "youtube";

case "Instagram":
return "instagram";

case "LinkedIn":
return "linkedin";

default:
return "facebook";

}

}

function statusClass(status){

switch(status){

case "Pending":
return "red";

case "Scheduled":
return "yellow";

default:
return "green";

}

}