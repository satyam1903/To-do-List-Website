module.exports.getDate=date;
function date(){
    var today=new Date();
    var options={
        year:'numeric',
        day:'numeric',
        month:'long'
    }
    return (today.toLocaleDateString("en-US", options));

}
module.exports.getDay=day
function day(){
    var today=new Date();
    var options={
       
        day:'numeric'
      
    }
    return (today.toLocaleDateString("en-US", options));

}