
const today = moment();
var hour = today._d.getHours();

const savedText = JSON.parse(localStorage.getItem("savedText")) || [];

function buildDay() {
    $("#currentDay").text(today.format('LLLL'))
    var displayHour = 8;

    for (var i = 0; i < 13; i++) {
        var rowEl = $("<div class='row'>");

        //sets the hour element 
        var hourEle = $("<div class='hour'>");
        //determines if the hour is am or pm
        if (i < 4) {
            hourEle.text(displayHour + " AM");
        }
        else if (i > 4) {
            hourEle.text(displayHour - 12 + " PM");
        }
        else {
            hourEle.text(displayHour + " PM");
        }
        //builds the text input
        var textEl = $("<div>");
        textEl.attr("data-block", i);
        //adds the saved text if available
        if (savedText[i]){
            textEl.html("<textarea maxlength='250'>"+savedText[i]+"</textarea>");
        }
        else{
            textEl.html("<textarea maxlength='250'>")
        }

        //sets it to the correct color
        if (displayHour < hour) {
            textEl.addClass("past");
        }
        else if (displayHour > hour) {
            textEl.addClass("future");
        }
        else {
            textEl.addClass("present");
        }

        //adds save button
        var saveEle = $("<div class='saveBtn'><span>Edit</span></div>");

        rowEl.append(hourEle, textEl, saveEle);
        $(".container").append(rowEl);
        displayHour++;
    }
}


buildDay();

$(".saveBtn").click(function () {
    slot = this.parentElement.children[1].dataset.block;
    data = this.parentElement.children[1].children[0].value;
    savedText[slot] = data;
    localStorage.setItem("savedText", JSON.stringify(savedText))
    alert("click");
})
