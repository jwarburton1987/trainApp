$(document).ready(function(){

    var config = {
        apiKey: "AIzaSyC1GOga46VZed6DH2QqHPS7LAKPfXwjdpc",
        authDomain: "jjb-united.firebaseapp.com",
        databaseURL: "https://jjb-united.firebaseio.com",
        projectId: "jjb-united",
        storageBucket: "jjb-united.appspot.com",
        messagingSenderId: "737409695719"
      };

      firebase.initializeApp(config);
      
      var database = firebase.database();

      var count = 0;

      var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
      console.log(currentTime);
      $("#currentTime").html(currentTime);
     
       
      var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#datetime')
    update();
    setInterval(update, 1000);
});
      
      
      
      
      
      
      
      //function()setInterval(function(){ $("#currentTime").html(currentTime); }, 1000)
    

     

      $("#submit-btn").on("click", function (e){
        e.preventDefault();
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#train-time").val().trim();
        var frequencyMin = $("#frequency").val().trim();

        

        database.ref().push({
           trainName: trainName,
           destination: destination,
           firstTrainTime: firstTrainTime,
           frequencyMin: frequencyMin,

        });


      });

      // database.ref().on("child_added", function(snapshot){
      //   console.log(snapshot.val());
      //   $("table tbody").append("<tr><td>"+snapshot.val().trainName+"</td><td>"+snapshot.val().destination+"</td><td>"+snapshot.val().firstTrainTime+"</td><td>"+snapshot.val().frequencyMin+"</td></tr>");
      
      
      database.ref().on("child_added",function(snapshot){
        var firstTrainTime = snapshot.val().firstTrainTime;
        var frequencyMin = snapshot.val().frequencyMin;
       
         var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        
         //Difference between the times
         var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
       
         // Time apart (remainder)
         var tRemainder = diffTime % frequencyMin;
       
         // Minute Until Train
         var tMinutesTillTrain = frequencyMin - tRemainder;
       
         var nextTrain = moment().add(tMinutesTillTrain, "minutes");
         nextTrain=moment(nextTrain).format("hh:mm A");
       
         nextTrain = nextTrain.toString();
         tMinutesTillTrain = tMinutesTillTrain.toString();
       
         $("table").append("<tr><td>"+snapshot.val().trainName+"</td><td>"+snapshot.val().destination+"</td><td>"+snapshot.val().firstTrainTime+"</td><td>"+frequencyMin+"</td><td>"+nextTrain+"</td><td>"+tMinutesTillTrain+"</td></tr>");
      
      });





      // var randomDate = "02/23/1999";
      // var randomFormat = "MM/DD/YYYY";
      // var convertedDate = moment(randomDate, randomFormat);
  
      // // Using scripts from moment.js write code below to complete each of the following.
      // // Console.log to confirm the code changes you made worked.
  
      // // 1 ...to convert the randomDate into three other date formats
      // console.log(moment(convertedDate).format("MM/DD/YY"));
      // console.log(moment(convertedDate).format("MMM Do, YYYY hh:mm:ss"));
      // console.log(moment(convertedDate).format("X"));
      // console.log("----------------------------------------");
  
      // // 2 ...to determine the time in years, months, days between today and the randomDate
      // console.log(moment(convertedDate).toNow());
      // console.log(moment(convertedDate).diff(moment(), "years"));
      // console.log(moment(convertedDate).diff(moment(), "months"));
      // console.log(moment(convertedDate).diff(moment(), "days"));
      // console.log("----------------------------------------");
  
      // // 3 ...to determine the number of days between the randomDate and 02/14/2001
      // var newDate = moment("02/14/2001", randomFormat);
      // console.log(moment(convertedDate).diff(moment(newDate), "days"));
  
      // // 4 ...to convert the randomDate to unix time (be sure to look up what unix time even is!!!)
      // console.log(moment(convertedDate).format("X"));
      // console.log("----------------------------------------");
  
      // // 5 ...to determine what day of the week and what week of the year this randomDate falls on.
      // console.log(moment(convertedDate).format("DDD"));
      // console.log(moment(convertedDate).format("dddd"));
  









});




