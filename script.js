function login(){
  let user=document.getElementById("username").value;
  let pass=document.getElementById("password").value;

  if(user==="kani" && pass==="1234"){
    localStorage.setItem("login","true");
    window.location.href="dashboard.html";
  }else{
    document.getElementById("error").innerText="Wrong login!";
  }
}

function logout(){
  localStorage.removeItem("login");
  window.location.href="index.html";
}

function analyze(){
  let time=document.getElementById("time").value;
  let energy=document.getElementById("energy").value;
  let products=document.getElementById("products").value;

  let ep=(energy/products).toFixed(2);
  let tp=(time/products).toFixed(2);
  let eff=(products/energy*100).toFixed(0);

  document.getElementById("ep").innerText=ep;
  document.getElementById("tp").innerText=tp;
  document.getElementById("eff").innerText=eff+"%";

  document.getElementById("barFill").style.width=eff+"%";

  let sug="";
  if(eff<50){
    sug="⚠ Improve efficiency";
  }else{
    sug="✅ System efficient";
  }

  document.getElementById("suggestion").innerText=sug;
}
function analyze(){

  let time = document.getElementById("time").value;
  let energy = document.getElementById("energy").value;
  let products = document.getElementById("products").value;

  let defect = document.getElementById("defect").value;
  let price = document.getElementById("price").value;
  let cost = document.getElementById("cost").value;

  let goodProducts = products - defect;

  let profit = (goodProducts * price) - (products * cost);

  let ep=(energy/products).toFixed(2);
  let tp=(time/products).toFixed(2);
  let eff=(products/energy*100).toFixed(0);

  document.getElementById("ep").innerText=ep;
  document.getElementById("tp").innerText=tp;
  document.getElementById("eff").innerText=eff+"%";

  document.getElementById("barFill").style.width=eff+"%";

  // SAVE DAILY DATA
  let record = {
    products: parseInt(products),
    defect: parseInt(defect),
    profit: profit
  };

  let data = JSON.parse(localStorage.getItem("factoryData")) || [];
  data.push(record);

  localStorage.setItem("factoryData", JSON.stringify(data));

  alert("Data Saved!");
}
function monthlyReport(){

  let data = JSON.parse(localStorage.getItem("factoryData")) || [];

  let totalDefect = 0;
  let totalProfit = 0;

  data.forEach(d => {
    totalDefect += d.defect;
    totalProfit += d.profit;
  });

  document.getElementById("report").innerHTML = 
    "Total Defects: " + totalDefect + "<br>" +
    "Total Profit: ₹" + totalProfit;
}
let reportChart;

function monthlyReport(){

  let data = JSON.parse(localStorage.getItem("factoryData")) || [];

  let totalDefect = 0;
  let totalProfit = 0;

  let defectArr = [];
  let profitArr = [];
  let labels = [];

  data.forEach((d, index) => {
    totalDefect += d.defect;
    totalProfit += d.profit;

    defectArr.push(d.defect);
    profitArr.push(d.profit);
    labels.push("Day " + (index+1));
  });

  document.getElementById("totalDef").innerText = totalDefect;
  document.getElementById("totalProfit").innerText = totalProfit;

  let ctx = document.getElementById("reportChart").getContext("2d");

  if(reportChart){
    reportChart.destroy();
  }

  reportChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Defects",
          data: defectArr
        },
        {
          label: "Profit",
          data: profitArr
        }
      ]
    }
  });
}
function clearData(){
  localStorage.removeItem("factoryData");
  alert("Data Cleared!");
}
function askAI() {
  let q = document.getElementById("question").value.toLowerCase();
  let ans = "";

  if (q.includes("energy")) {
    ans = "Reduce machine idle time and use efficient motors.";
  } else if (q.includes("efficiency")) {
    ans = "Optimize production and reduce waste.";
  } else {
    ans = "Analyze your factory data to get better insights.";
  }

  document.getElementById("answer").innerText = ans;
}
// Save history permanently
localStorage.setItem("factoryHistory", JSON.stringify(historyList));

// Load when page opens
window.onload = function () {
  let saved = JSON.parse(localStorage.getItem("factoryHistory")) || [];
  historyList = saved;

  let html = "";
  historyList.forEach(item => {
    html += `<li>${item}</li>`;
  });

  document.getElementById("history").innerHTML = html;
}
chart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Energy', 'Products'],
    datasets: [{
      data: [energy, products]
    }]
  }
});