import React, {useRef, useCallback, useState } from 'react';

const Test = () => {

 const [testa, setTesta] = useState([{soto_daging: "enak"}]);

  const testur = useRef([]);

console.log('hasil state' + testa[0]);
console.log('hasil testur' + testur.current[0]);

const telolet = (wd) => {
      let newtesta = [...testa];
           newtesta.length = 0;
           newtesta.push(wd);
           testur.current.push(wd);

           setTesta(newtesta);

} 

 
const resizeObserver = React.useRef(new ResizeObserver((entries) => {
 entries.forEach(entry => {
           
    console.log('width', entry.contentRect.width);
    console.log('height', entry.contentRect.height);
    telolet(entry.contentRect.width);
  });
}));

const resizedContainerRef = React.useCallback((container) => {
    if (container !== null) {
        resizeObserver.current.observe(container);
      console.log('masuk container');
    }
    // When element is unmounted, ref callback is called with a null argument
    // => best time to cleanup the observer
    else {
        if (resizeObserver.current)
            resizeObserver.current.disconnect();
    }
}, [resizeObserver.current]);

return( <div ref={resizedContainerRef}   style={{
          margin: '50px',
          width: '70%',
          height: '70%',
          border: '1px solid black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          resize: 'both',
          overflow: 'auto',
        }} >

    // Your component content here
</div>
)
}

export default Test;

