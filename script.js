$(function () {
  const today = dayjs();

  // Save Button click event handler
  $(".saveBtn").on("click", function () {
    const timeBlock = $(this).closest(".time-block");
    const timeBlockId = timeBlock.attr("id");
    const description = timeBlock.find("textarea").val();
    // Save it to local storage
    localStorage.setItem(timeBlockId, description);
  });

  // Get the required elements
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id");
    const currentHour = parseInt(today.format("H"), 10);
    const blockHour = getTimeFromId(timeBlockId);

    // Check if the block hour is less than the current hour and add the class
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
  // Add code to load the user input from local storage into the block
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id");
    const description = localStorage.getItem(timeBlockId);
    if (description) {
      $(this).find("textarea").val(description);
    }
  });
  //
  // Add code to display the current date in the header of the page.
  $("#currentDay").text(`Today is ${today.format("dddd, MMMM D YYYY")}`);

  function getTimeFromId(id) {
    return parseInt(id.split("-")[1], 10);
  }
});
