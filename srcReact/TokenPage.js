import React, {useRef, useState} from 'react';
import './TokenPage.css';

const TokenPage = (props) => {

const chain = useRef();
const dex = useRef();
const pricein = useRef();

const hours = useRef();
const minutes = useRef();
const seconds = useRef();

const tokenname1 = useRef();     
const tokenaddress1 = useRef();
const digittoken1 = useRef();

const tokenname2 = useRef();
const tokenaddress2 = useRef();
const digittoken2 = useRef();

const handleCancel = (event) => {
       event.preventDefault();
console.log(props.id);

props.numberlist(props.id);
}

const handleSubmit = (event) => {
     event.preventDefault();

if(pricein.current.value && tokenname1.current.value && 
tokenaddress1.current.value && digittoken1.current.value &&
tokenname2.current.value && 
tokenaddress2.current.value && digittoken2.current.value)
{

let milisecondshours = "";
let milisecondsminutes = "";
let milisecondsseconds ="";

if(hours.current.value !== 0){
    milisecondshours = hours.current.value * 60 * 60 * 1000;
}
if(minutes.current.value !== 0){
    milisecondsminutes = minutes.current.value * 60 * 1000;
}
if(hours.current.value !== 0){
    milisecondsseconds = seconds.current.value * 1000;
}

const totalmiliseconds = 
milisecondshours + milisecondsminutes + milisecondsseconds;

const currenttimestamp = Date.now();

     let dataToken = {
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
props.eachtoken(dataToken);
props.numberlist(props.id);

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
<input type="text" size="20" ref={pricein} />
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
<input type="text" size="20" ref={tokenname1} />
</div>
<div className="tokenaddress1span">
<span className="spaning">Tokenaddress1:</span>
</div>
<div className="tokenaddress1input">
<input type="text" size="40" ref={tokenaddress1} />
</div>
<div className="digittoken1span">
<span className="spaning">Digittoken1:</span>
</div>
<div className="digittoken1input">
<input type="text" size="3" ref={digittoken1} />
</div>
</div>
<div className="divrow4">
<div className="tokenname2span">
<span className="spaning">Tokenname2:</span>
</div>
<div className="tokenname2input">
<input type="text" size="20" ref={tokenname2} />
</div>
<div className="tokenaddress2span">
<span className="spaning">Tokenaddress2:</span>
</div>
<div className="tokenaddress2input">
<input type="text" size="40" ref={tokenaddress2} />
</div>
<div className="digittoken2span">
<span className="spaning">Digittoken2:</span>
</div>
<div className="digittoken2input">
<input type="text" size="3" ref={digittoken2} />
</div>
</div>
<div className="divrow5">
<div className="buttoncanceldiv">
<button className="buttoncancel" size="10" 
onClick={(e) => handleCancel(e)}>Cancel</button>
</div>
<div className="buttonsubmitdiv">
<button className="buttonsubmit" size="10" 
onClick={(e) => handleSubmit(e)}>Submit</button>
</div>
</div>
</div>
)
}

export default TokenPage;
