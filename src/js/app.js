(function () {
  // Selectors
  let feedBackDiv = document.querySelector(".feedback");
  const sbmBtn = document.querySelector(".submitBtn");
  const inputBill = document.getElementById("input-bill");
  const inputUsers = document.getElementById("input-users");
  const inputService = document.getElementById("input-service");
  // Messages for feedback in form
  const billFeedback = "Bill cannot by emty or negative value <br />";
  const peopleFeedback = "People field cannot by emty or negative <br />";
  const serviceFeedback = "You need to choose one vaule";

  //Function that controls feedback form
  const feedBack = function (bill, people, service) {
    let feedBackText = "";
    if (!bill || bill < 0) {
      feedBackText += billFeedback;
    }
    if (!people || people < 0) {
      feedBackText += peopleFeedback;
    }
    if (!service || service < 0) {
      feedBackText += serviceFeedback;
    }

    if (feedBackText) {
      feedBackDiv.classList.remove("feedback");
      feedBackDiv.classList.add("showItem");
    }
  };

  sbmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let inputBillValue = inputBill.value;
    let inputUsersValue = inputUsers.value;
    let inputServiceValue = inputService.value;
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

  services.forEach(function (service) {
    // Create option
    const option = document.createElement("option");
    option.textContent = service.title;
    option.value = service.value;
    inputService.appendChild(option);
  });
})();
