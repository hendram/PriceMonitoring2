  
var eventFire = (MyElement, ElementType) => {
    var MyEvent = document.createEvent("MouseEvents");
    MyEvent.initMouseEvent
 (ElementType, true, true, window, 0, 0, 0, 0, 0, false, 
false, false, false, 0, null);
    MyElement.dispatchEvent(MyEvent);
 
};
  

function myFunc(price)
{
  
    messageBox = document.querySelectorAll("[contenteditable='true']")[1];
  
    message = price; // Replace My Message with your message use  
// to add space$
  
    counter = 2; // Replace 5 with the number of times you want 
// to send your me$
  
    for (i = 0; i < counter; i++) {
        event = document.createEvent("UIEvents");
        messageBox.innerHTML = message // .replace(/ /gm, ' ');  test it
        event.initUIEvent("input", true, true, window, 1);
        messageBox.dispatchEvent(event);
  
        eventFire(document.querySelector('span[data-icon="send"]'), 'click');
    }
}

let laindah="mama"

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   if(request.messagemasuk){
console.log(request.messagemasuk);       

     myFunc(request.messagemasuk);
}
});


