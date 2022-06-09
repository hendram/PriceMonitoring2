const url = 'wss://localhost:443';

const watabid = [];

function wanow(tabidnya, messagemasuk){
if(messagemasuk !== null){
chrome.tabs.sendMessage(tabidnya,{messagemasuk});

     };
}

ws = new WebSocket(url);
   ws.onopen = () => {
             const message = { messagenya: "fromext" }
             ws.send(JSON.stringify(message));
            }

  ws.onmessage = (e) => {
  
            console.log(JSON.parse(e.data));  

           if(JSON.parse(e.data).messagenya){
           let message = JSON.parse(e.data).messagenya;
           console.log(message);

chrome.tabs.query({currentWindow: true}, function(tabs) {


  for(x=0; x < tabs.length; x++) {
      if(tabs[x].url.match("https://web.whatsapp.com")){
  watabid.push(tabs[x].id);  
  chrome.scripting.executeScript( {
    target: {tabId: tabs[x].id},
    files: ['wadispatch.js'],
    function: wanow(tabs[x].id, message) 


  });
}}
});
}
}



