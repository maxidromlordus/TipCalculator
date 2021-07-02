(function () {
  // Selectors
  let feedBackDiv = document.querySelector(".feedback");
  const sbmBtn = document.querySelector(".submitBtn");
  const inputBill = document.getElementById("input-bill");
  const inputUsers = document.getElementById("input-users");
  const inputService = document.getElementById("input-service");
  // Messages for feedback in form
  const billFeedback = "Bill cannot by emty or negative value " + "\n";
  const peopleFeedback = "People field cannot by emty or negative" + "\n";
  const serviceFeedback = "You need to choose one vaule";

  //Function that controls feedback form
  const feedBack = function (bill, people, service) {
    let feedBackText = false;
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

  const displayBill = function (data) {
    const tipAmountSpan = document.querySelector("#tip-amount");
    const totalAmountSpan = document.querySelector("#total-amount");
    const personAmountSpan = document.querySelector("#person-amount");
    const resultsDiv = document.querySelector(".results");
    console.log(resultsDiv);

    tipAmountSpan.innerText = tipAmountSpan.innerText + data[0].toFixed(2);
    totalAmountSpan.innerText = totalAmountSpan.innerText + data[1];
    personAmountSpan.innerText = personAmountSpan.innerText + data[2];

    //resultsDiv.classList.remove("results");
    resultsDiv.classList.add("showItem");
    setTimeout(function () {
      resultsDiv.classList.remove("showItem");
    }, 5000);
  };

  sbmBtn.addEventListener("click", (e) => {
    const loader = document.querySelector(".loader");
    e.preventDefault();
    let inputBillValue = inputBill.value;
    let inputUsersValue = inputUsers.value;
    let inputServiceValue = inputService.value;

    const needFeedback = feedBack(
      inputBillValue,
      inputUsersValue,
      inputServiceValue
    );

    if (needFeedback) {
      const feedBackDiv = document.querySelector(".alert");
      feedBackDiv.innerText = needFeedback;

      setTimeout(function () {
        feedBackDiv.classList.remove("showItem");
        feedBackDiv.classList.add("feedback");
      }, 2000);
    }

    if (!needFeedback) {
      const calculatedData = calculateBill(
        inputBillValue,
        inputUsersValue,
        inputServiceValue
      );

      console.log(calculatedData);
      const loaderDone = function () {
        loader.classList.add("showItem");
        setTimeout(function () {
          loader.classList.remove("showItem");
          displayBill(calculatedData);
        }, 2000);
      };
      loaderDone();
    }
  });

  // Add options service
  const services = [
    {
      value: 1,
      title: "great - 20%",
    },
    {
      value: 2,
      title: "good - 10%",
    },
    {
      value: 3,
      title: "bad - 2%",
    },
  ];
  // Add services options
  services.forEach(function (service) {
    // Create option
    const option = document.createElement("option");
    option.textContent = service.title;
    option.value = service.value;
    inputService.appendChild(option);
  });

  //calculations
  const calculateBill = function (bill, people, service) {
    let percentTip = "";
    if (service === "1") {
      percentTip = 0.2;
    } else if (service === "2") {
      percentTip = 0.1;
    } else {
      percentTip = 0.02;
    }

    const tipAmount = +bill * percentTip;
    const totalAmount = +bill + +tipAmount;
    const eachPerson = Math.round(+totalAmount / +people);

    return [tipAmount, totalAmount, eachPerson];
  };
})();
