"use strict";

(function () {
  // Selectors
  var feedBackDiv = document.querySelector(".feedback");
  var sbmBtn = document.querySelector(".submitBtn");
  var inputBill = document.getElementById("input-bill");
  var inputUsers = document.getElementById("input-users");
  var inputService = document.getElementById("input-service"); // Messages for feedback in form

  var billFeedback = "Bill cannot by emty or negative value " + "\n";
  var peopleFeedback = "People field cannot by emty or negative" + "\n";
  var serviceFeedback = "You need to choose one vaule"; //Function that controls feedback form

  var feedBack = function feedBack(bill, people, service) {
    var feedBackText = false;

    if (!bill || bill < 0) {
      feedBackText += billFeedback;
    }

    if (!people || people < 0) {
      feedBackText += peopleFeedback;
    }

    if (!service || service < 1) {
      feedBackText += serviceFeedback;
    }

    if (feedBackText) {
      feedBackDiv.classList.remove("feedback");
      feedBackDiv.classList.add("showItem");
      feedBackDiv.classList.add("red-color");
      return feedBackText;
    }

    return feedBackText;
  };

  var displayBill = function displayBill(data) {
    var tipAmountSpan = document.querySelector("#tip-amount");
    var totalAmountSpan = document.querySelector("#total-amount");
    var personAmountSpan = document.querySelector("#person-amount");
    var resultsDiv = document.querySelector(".results");
    console.log(resultsDiv);
    tipAmountSpan.innerText = tipAmountSpan.innerText + data[0].toFixed(2);
    totalAmountSpan.innerText = totalAmountSpan.innerText + data[1];
    personAmountSpan.innerText = personAmountSpan.innerText + data[2]; //resultsDiv.classList.remove("results");

    resultsDiv.classList.add("showItem");
    setTimeout(function () {
      resultsDiv.classList.remove("showItem");
    }, 5000);
  };

  sbmBtn.addEventListener("click", function (e) {
    var loader = document.querySelector(".loader");
    e.preventDefault();
    var inputBillValue = inputBill.value;
    var inputUsersValue = inputUsers.value;
    var inputServiceValue = inputService.value;
    var needFeedback = feedBack(inputBillValue, inputUsersValue, inputServiceValue);

    if (needFeedback) {
      var _feedBackDiv = document.querySelector(".alert");

      _feedBackDiv.innerText = needFeedback;
      setTimeout(function () {
        _feedBackDiv.classList.remove("showItem");

        _feedBackDiv.classList.add("feedback");
      }, 2000);
    }

    if (!needFeedback) {
      var calculatedData = calculateBill(inputBillValue, inputUsersValue, inputServiceValue);
      console.log(calculatedData);

      var loaderDone = function loaderDone() {
        loader.classList.add("showItem");
        setTimeout(function () {
          loader.classList.remove("showItem");
          displayBill(calculatedData);
        }, 2000);
      };

      loaderDone();
    }
  }); // Add options service

  var services = [{
    value: 1,
    title: "great - 20%"
  }, {
    value: 2,
    title: "good - 10%"
  }, {
    value: 3,
    title: "bad - 2%"
  }]; // Add services options

  services.forEach(function (service) {
    // Create option
    var option = document.createElement("option");
    option.textContent = service.title;
    option.value = service.value;
    inputService.appendChild(option);
  }); //calculations

  var calculateBill = function calculateBill(bill, people, service) {
    var percentTip = "";

    if (service === "1") {
      percentTip = 0.2;
    } else if (service === "2") {
      percentTip = 0.1;
    } else {
      percentTip = 0.02;
    }

    var tipAmount = +bill * percentTip;
    var totalAmount = +bill + +tipAmount;
    var eachPerson = Math.round(+totalAmount / +people);
    return [tipAmount, totalAmount, eachPerson];
  };
})();