import React, {useRef, useState, ReactElement} from 'react';
import './TokenPage.css';


type props = {
id: number;
numberlist: Function;
eachtoken: Function;
counterset: number;
}


const TokenPage: React.FC<props> = ({id, numberlist, eachtoken, 
counterset}: props): ReactElement => {
//rerendertp use to rerender tokenpage in case user fill in pricein not right and make counterset up
const [rerendertp, setRerendertp] = useState(counterset);

const chain = useRef<HTMLSelectElement>(null);
const dex = useRef<HTMLSelectElement>(null);
const pricein = useRef<HTMLInputElement>(null);

const hours = useRef<HTMLSelectElement>(null);
const minutes = useRef<HTMLSelectElement>(null);
const seconds = useRef<HTMLSelectElement>(null);

const tokenname1 = useRef<HTMLInputElement>(null);     
const tokenaddress1 = useRef<HTMLInputElement>(null);
const digittoken1 = useRef<HTMLInputElement>(null);

const tokenname2 = useRef<HTMLInputElement>(null);
const tokenaddress2 = useRef<HTMLInputElement>(null);
const digittoken2 = useRef<HTMLInputElement>(null);

if(counterset !== 0){
    let newrerendertp = rerendertp;
       newrerendertp = counterset;
      setRerendertp(newrerendertp);
}


const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
       event.preventDefault();
console.log(id);

numberlist(id);
}

const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.preventDefault();

if((chain.current !== null) && (dex.current !== null) && 
(pricein.current !== null ) && (tokenname1.current !== null) && 
(tokenaddress1.current !== null) && (digittoken1.current !== null)
&& (tokenname2.current !== null) && (
tokenaddress2.current !== null) && (digittoken2.current !== null) 
&& (hours.current !== null) && (minutes.current !== null) &&
(seconds.current !== null))
{

let milisecondshours: number | undefined;
let milisecondsminutes: number | undefined;
let milisecondsseconds: number | undefined;
let totalmiliseconds: number | undefined;

if(hours.current !== null) {
   milisecondshours  = Number(hours.current.value) * 60 * 60 * 1000;
}
if(minutes.current !== null) {
    milisecondsminutes = Number(minutes.current.value) * 60 * 1000;
}
if(seconds.current !== null) {
    milisecondsseconds = Number(seconds.current.value) * 1000;
}

if(milisecondshours !== undefined && milisecondsminutes !== undefined &&
milisecondsseconds !== undefined){
totalmiliseconds = 
milisecondshours + milisecondsminutes + milisecondsseconds;
}

const currenttimestamp = Date.now();

     let dataToken = {
id: id,
chain: chain.current.value, 
dex: dex.current.value,
pricein: pricein.current.value, 
tokenname1: tokenname1.current.value.toUpperCase(),
tokenaddress1: tokenaddress1.current.value, 
digittoken1: digittoken1.current.value,
tokenname2: tokenname2.current.value.toUpperCase(),
tokenaddress2: tokenaddress2.current.value, 
digittoken2: digittoken2.current.value,
milisecondselapse: totalmiliseconds,
currentts: currenttimestamp,
ntimes: 1
}

console.log("dataToken" + dataToken);
eachtoken(dataToken);
}
}


return(
<div className="divTokenpage">
<div className="divrow1" >
<div className="chainspan" >
<span className="spaning">Chain:</span>
</div>
<div className="chainselect">
<select ref={chain} >
<option>Polygon</option>
<option>Bsc</option>
</select>
</div>
<div className="dexspan">
<span className="spaning">Dex:</span>
</div>
<div className="dexselect">
<select ref={dex} >
<option>Quickswap</option>
<option>Pancakeswap</option>
</select>
</div>
</div>
<div className="divrow2">
<div className="priceinspan">
<span className="spaning">Pricein:</span>
</div>
<div className="priceininput">
<input type="text" ref={pricein} maxLength={50} className="priceininputtext"/>
</div>
<div className="intervalspan">
<span className="spaning">Interval:</span>
</div>
<div className="hoursselect">
<select ref={hours} >
<option>0</option>
<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
<option>7</option>
<option>8</option>
<option>9</option>
<option>10</option>
<option>11</option>
<option>12</option>
<option>13</option>
<option>14</option>
<option>15</option>
<option>16</option>
<option>17</option>
<option>18</option>
<option>19</option>
<option>20</option>
<option>21</option>
<option>22</option>
<option>23</option>
</select>
</div>
<div className="hoursspan">
<span className="spaning">Hours</span>
</div>
<div className="minutesselect">
<select ref={minutes} >
<option>0</option>
<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>
<option>6</option>
<option>7</option>
<option>8</option>
<option>9</option>
<option>10</option>
<option>11</option>
<option>12</option>
<option>13</option>
<option>14</option>
<option>15</option>
<option>16</option>
<option>17</option>
<option>18</option>
<option>19</option>
<option>20</option>
<option>21</option>
<option>22</option>
<option>23</option>
<option>24</option>
<option>25</option>
<option>26</option>
<option>27</option>
<option>28</option>
<option>29</option>
<option>30</option>
<option>31</option>
<option>31</option>
<option>33</option>
<option>34</option>
<option>35</option>
<option>36</option>
<option>37</option>
<option>38</option>
<option>39</option>
<option>40</option>
<option>41</option>
<option>42</option>
<option>43</option>
<option>44</option>
<option>45</option>
<option>46</option>
<option>47</option>
<option>48</option>
<option>49</option>
<option>50</option>
<option>51</option>
<option>52</option>
<option>53</option>
<option>54</option>
<option>55</option>
<option>56</option>
<option>57</option>
<option>58</option>
<option>59</option>
</select>
</div>
<div className="minutesspan">
<span className="spaning">Minutes</span>
</div>
<div className="secondsselect">
<select ref={seconds} >
<option>5</option>
<option>6</option>
<option>7</option>
<option>8</option>
<option>9</option>
<option>10</option>
<option>11</option>
<option>12</option>
<option>13</option>
<option>14</option>
<option>15</option>
<option>16</option>
<option>17</option>
<option>18</option>
<option>19</option>
<option>20</option>
<option>21</option>
<option>22</option>
<option>23</option>
<option>24</option>
<option>25</option>
<option>26</option>
<option>27</option>
<option>28</option>
<option>29</option>
<option>30</option>
<option>31</option>
<option>31</option>
<option>33</option>
<option>34</option>
<option>35</option>
<option>36</option>
<option>37</option>
<option>38</option>
<option>39</option>
<option>40</option>
<option>41</option>
<option>42</option>
<option>43</option>
<option>44</option>
<option>45</option>
<option>46</option>
<option>47</option>
<option>48</option>
<option>49</option>
<option>50</option>
<option>51</option>
<option>52</option>
<option>53</option>
<option>54</option>
<option>55</option>
<option>56</option>
<option>57</option>
<option>58</option>
<option>59</option>
</select>
</div>
<div className="secondsspan">
<span className="spaning">Seconds</span>
</div>
</div>
<div className="divrow3">
<div className="tokenname1span">
<span className="spaning">Tokenname1:</span>
</div>
<div className="tokenname1input">
<input type="text" ref={tokenname1} maxLength={20} 
className="tokenname1inputtext"/>
</div>
<div className="tokenaddress1span">
<span className="spaning">Tokenaddress1:</span>
</div>
<div className="tokenaddress1input">
<input type="text" ref={tokenaddress1} maxLength={50}
className="tokenaddress1inputtext" />
</div>
<div className="digittoken1span">
<span className="spaning">Digittoken1:</span>
</div>
<div className="digittoken1input">
<input type="text" ref={digittoken1} maxLength={5}
className="digittoken1inputtext"/>
</div>
</div>
<div className="divrow4">
<div className="tokenname2span">
<span className="spaning">Tokenname2:</span>
</div>
<div className="tokenname2input">
<input type="text" ref={tokenname2} maxLength={20}
className="tokenname2inputtext"/>
</div>
<div className="tokenaddress2span">
<span className="spaning">Tokenaddress2:</span>
</div>
<div className="tokenaddress2input">
<input type="text" ref={tokenaddress2} maxLength={50}
className="tokenaddress2inputtext"/>
</div>
<div className="digittoken2span">
<span className="spaning">Digittoken2:</span>
</div>
<div className="digittoken2input">
<input type="text" ref={digittoken2} maxLength={5}
className="digittoken2inputtext"/>
</div>
</div>
<div className="divrow5">
<div className="buttoncanceldiv">
<button className="buttoncancel"  
onClick={(e) => handleCancel(e)}>Cancel</button>
</div>
<div className="buttonsubmitdiv">
<button className="buttonsubmit"  
onClick={(e) => handleSubmit(e)}>Submit</button>
</div>
</div>
</div>
)
}

export default TokenPage;
