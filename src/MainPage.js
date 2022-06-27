import React, {useState, useEffect} from 'react';
import TokeninPage from './TokeninPage';
import LineGPage from './LineGPage';

const MainPage = () => {

    

const [dataarr, setDataarr] = useState([]);

const providedata = (arg) => {
    let arrreplace = [...dataarr];
    arrreplace = arg;
    setDataarr(arg);
}

const [pageview, setPageview] = useState(<TokeninPage
 provdatprop={providedata} addprop={"no"} /> );
// const [linegview, setLinegview] = useState("");

console.log("dataarr" + dataarr.length);


const emptydataarr = () => {
  if(dataarr.length !== 0){
     let dataarrnew = [...dataarr];
     dataarrnew.length = 0;
     setDataarr(dataarrnew);
   
     
}
}


const checkdataarr = () => {
/*if(dataarr.length !== 0 && linegview === ""){
          let lineview = linegview;
              lineview = >;
         
       setLinegview(lineview);
} */
if(dataarr.length !== 0){
        let pageviewnew = pageview;
           pageviewnew = "";
          setPageview(pageviewnew);
}
}

    console.log("arg " + dataarr.length);


useEffect(() => {
   checkdataarr();
}, [dataarr[0]]);


const addg = () => {
    let pageviewnew = pageview;
     pageviewnew = <TokeninPage  provdatprop={providedata} 
addprop={"yes"}  />;
     setPageview(pageviewnew);
}


return(
  <>
<div>
<p onClick={(e) => addg(e)}>Add Graph</p>
</div>
<div>
   {pageview}
   <LineGPage datalinegpage={dataarr} 
emptydata={emptydataarr}/>
</div>
</>
)

}

export default MainPage;
