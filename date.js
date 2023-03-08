
exports.getDate = function(){

    let day = "";
      let today = new Date();
      // let currentDay = today.getDay();
    
      let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
      };
    
      day = today.toLocaleDateString("en-US", options);
    
      return day;
    
    }


