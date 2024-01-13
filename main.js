console.log("Hello world lol");

var ten = 10;

console.log(ten);

printTime();


function printTime() {
    const date = new Date();
    var calendarDay = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();

    var currTime = date.getHours() + ':' + date.getMinutes() +':' + date.getSeconds();
    console.log(calendarDay);
    console.log("Time website opened: "+currTime);

    // Update the button text with the current time
    document.querySelector('button').innerText = "Current time is: " + currTime;
}