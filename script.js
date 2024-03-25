
function showMain() {
  tampilMenu("main");
}

function showIncome() {
  tampilMenu("income");
}

function showOutcome() {
  tampilMenu("outcome");
}

function showAbout() {
  tampilMenu("about");
}

function showSection(sectionId) {
    var sectionbaru = document.querySelectorAll("section");
    sectionbaru.forEach(function(section) {
        section.style.display = (section.id === sectionId) ? "block" : "none";
    });
}

function login() {
  var username = document.getElementById("username").value;
  localStorage.setItem("username", username);
  window.location.href = "menu.html";
}
  
window.onload = function() {
  var username = localStorage.getItem("username");
  if (username) {
    var userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = "<span>Hello, " + username + "</span>";
    var titleIncome = document.getElementById("titleIncome")
    titleIncome.innerHTML = "<span>" + username + "'s income</span>"
    var titleOutcome = document.getElementById("titleOutcome")
    titleOutcome.innerHTML = "<span>" + username + "'s outcome</span>"
  } else {
  }
}

function toggleMenu() {
  var navMenu = document.querySelector('nav ul');
  navMenu.classList.toggle('show');
}

document.addEventListener("DOMContentLoaded", function() {
  var userInfoElement = document.getElementById("userInfo");
  var username = localStorage.getItem("username");

  if (username) {
      userInfoElement.textContent = "Hello, " + username;
  } else {
      userInfoElement.textContent = "Hello, Guest";
  }
});


function updateTime() {
  var hariIni = new Date();
  var jam = hariIni.getHours();
  var menit = hariIni.getMinutes();
  var hari = hariIni.getDate();
  var bulan = hariIni.getMonth() + 1;
  var tahun = hariIni.getFullYear();
  var tanggalHariIni = hari.toString().padStart(2, '0') + '/' + bulan.toString().padStart(2, '0') + '/' + tahun;
  var waktuHariIni = jam.toString().padStart(2, '0') + ':' + menit.toString().padStart(2, '0');
  document.getElementById('current-time').textContent = tanggalHariIni + ' ' + waktuHariIni;
}

setInterval(updateTime, 60000);
updateTime();

function submitIncome(){
  var namaTransaksiIncome = document.getElementById("transactionNameIncome").value;
  var nominalTransaksiIncome = document.getElementById("transactionNominalIncome").value;
  var tipeTransaksiIncome = document.getElementById("transactionTypeIncome").value;

  if (namaTransaksiIncome && nominalTransaksiIncome && tipeTransaksiIncome){
      localStorage.setItem("namaTransaksiIncome", namaTransaksiIncome);
      localStorage.setItem("nominalTransaksiIncome", nominalTransaksiIncome);
      localStorage.setItem("tipeTransaksiIncome", tipeTransaksiIncome);
      alert("Transaksi sukses!");

      var totalTransaction = document.getElementById("totalTransaction");
      totalTransaction.innerHTML += "<div class='incomeTransaction'>" + namaTransaksiIncome + "<br>" + tipeTransaksiIncome + "<br>" + nominalTransaksiIncome+ "</div>";
      totalTransaction.innerHTML += "<br>";

      showSection("main");
  } else {
      alert("Transaksi belum selesai, silakan lengkapi formulir!");
  }
}

function submitOutcome(){
  var namaTransaksiOutcome = document.getElementById("transactionNameOutcome").value;
  var nominalTransaksiOutcome = document.getElementById("transactionNominalOutcome").value;
  var tipeTransaksiOutcome = document.getElementById("transactionTypeOutcome").value;

  if (namaTransaksiOutcome && nominalTransaksiOutcome && tipeTransaksiOutcome){
      localStorage.setItem("namaTransaksiOutcome", namaTransaksiOutcome);
      localStorage.setItem("nominalTransaksiOutcome", nominalTransaksiOutcome);
      localStorage.setItem("tipeTransaksiOutcome", tipeTransaksiOutcome);
      alert("Transaksi sukses!");

      var totalTransaction = document.getElementById("totalTransaction");
      totalTransaction.innerHTML += "<div class='outcomeTransaction'>" + namaTransaksiOutcome + "<br>" + tipeTransaksiOutcome + "<br>" + nominalTransaksiOutcome+ "</div>";
      totalTransaction.innerHTML += "<br>";

      showSection("main");
  } else {
      alert("Transaksi belum selesai, silakan lengkapi formulir!");
  }
}

function addIncome(){
  var namaTransaksiIncome = localStorage.getItem("namaTransaksiIncome");
  var nominalTransaksiIncome = parseFloat(localStorage.getItem("nominalTransaksiIncome")) || 0;
  var tipeTransaksiIncome = localStorage.getItem("tipeTransaksiIncome");

  incomeTransaction.push({name: namaTransaksiIncome, amount: nominalTransaksiIncome});
  updateBalance();
  
  var totalTransaction = document.getElementById("totalTransaction");
  totalTransaction.innerHTML += "<div>" + namaTransaksiIncome + "<br>" + tipeTransaksiIncome + "</div>"
  totalTransaction.innerHTML += "<div>" + nominalTransaksiIncome + "</div>";
}

function addOutcome(){
  var namaTransaksiOutcome = localStorage.getItem("namaTransaksiOutcome");
  var nominalTransaksiOutcome = parseFloat(localStorage.getItem("nominalTransaksiOutcome")) || 0;
  var tipeTransaksiOutcome = localStorage.getItem("tipeTransaksiOutcome");

  outcomeTransactions.push({name: namaTransaksiOutcome, amount: nominalTransaksiOutcome});
  updateBalance();

  var totalTransaction = document.getElementById("totalTransaction");
  totalTransaction.innerHTML += "<div>" + namaTransaksiOutcome + "<br>" + tipeTransaksiOutcome + "</div>"
  totalTransaction.innerHTML += "<div>" + nominalTransaksiOutcome + "</div>";
}

function updateBalance() {
  var totalIncome = incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  var totalOutcome = outcomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);

  var totalBalance = totalIncome - totalOutcome;
  var totalElement = document.getElementById("total");
  totalElement.textContent = totalBalance.toFixed(2);
}

function hitungTotal(){
  var nominalTransaksiIncome = parseInt(localStorage.getItem("nominalTransaksiIncome")) || 0;
  var nominalTransaksiOutcome = parseInt(localStorage.getItem("nominalTransaksiOutcome")) || 0;

  var total = nominalTransaksiIncome - nominalTransaksiOutcome;
  return total;
}

function total() {
  var totalBalance = hitungTotal();
  var totalElement = document.getElementById("total");
  totalElement.textContent = totalBalance;
}

const menuItems = document.querySelectorAll('.nav-link');
function showSection(sectionName) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionName).style.display = 'block';
      menuItems.forEach(item => {
    item.classList.remove('active');
  });
  const activeMenuItem = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
  activeMenuItem.classList.add('active');
}
window.onload = function() {
  showSection('main');
};


let remindersData = [
  {
    id: 1,
    type: 'payment',
    description: 'Pembayaran Tagihan Listrik',
    amount: '400.000',
    date: '2024-03-27',
    status: 'pending'
  },
  {
    id:2,
    type: 'payment',
    description: 'Pembayaran Uang Kuliah',
    amount: '17.000.000',
    date: '2024-04-01',
    status: 'pending'
  }
];

function displayReminders() {
  let remindersSection = document.getElementById('reminders');
  let remindersContent = '';

  remindersContent += '<h2>Notifications and Reminders</h2>';
  remindersContent += '<ul>';

  remindersData.forEach(function(reminder) {
    remindersContent += '<li>';
    remindersContent += '<strong>' + reminder.description + '</strong>';
    if (reminder.amount) {
      remindersContent += '<br>Nominal : ' + reminder.amount;
    }
    remindersContent += '<br>Tanggal: ' + reminder.date;
    remindersContent += '<br>Status: ';
    remindersContent += '<select id="status-' + reminder.id + '" onchange="changeReminderStatus(' + reminder.id + ', this.value)">';
    remindersContent += '<option value="pending"' + (reminder.status === 'pending' ? ' selected' : '') + '>Pending</option>';
    remindersContent += '<option value="done"' + (reminder.status === 'done' ? ' selected' : '') + '>Done</option>';
    remindersContent += '</select>';
    remindersContent += '</li>';
  });

  remindersContent += '</ul>';

  remindersSection.innerHTML = remindersContent;
}

function changeReminderStatus(id, newStatus) {
  let reminder = remindersData.find(reminder => reminder.id === id);
  if (reminder) {
    reminder.status = newStatus;
  }
  displayReminders();
}

  
document.addEventListener('DOMContentLoaded', function() {
  displayReminders();
});

  
document.getElementById('addReminderForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  let description = document.getElementById('reminderDescription').value;
  let amount = document.getElementById('reminderAmount').value;
  let date = document.getElementById('reminderDate').value;


  let newReminder = {
    id: remindersData.length + 1, 
    type: 'payment',
    description: description,
    amount: amount,
    date: date,
    status: 'pending'
  };

  remindersData.push(newReminder);
  displayReminders();

  document.getElementById('addReminderForm').reset();
  alert('Data successfully added');
});

document.getElementById('showAddReminderFormButton').addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('addReminderSection').style.display = 'block';
  document.getElementById('reminders').style.display = 'none'; 
});

document.getElementById('addReminderForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

});