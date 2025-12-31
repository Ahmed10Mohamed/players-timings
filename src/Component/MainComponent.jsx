import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Player from './Player';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import "moment/dist/locale/ar-dz";
moment.locale("ar");
export default function MainComponent() {
  // USE STATE
  const [nextPrayerIndex,setNextPrayerIndex] = useState(0);
   const [timings,setTimings] = useState({
            "Fajr": "",
            "Dhuhr": "",
            "Asr": "",
            "Maghrib": "",
            "Isha": "",
    })
    const prayersArray = [
      {key:"Fajr",displayName:"الفجر"},
      {key:"Dhuhr",displayName:"الظهر"},
      {key:"Asr",displayName:"العصر"},
      {key:"Maghrib",displayName:"الغرب"},
      {key:"Isha",displayName:"العشاء"},

    ]
    const [selectedCity,setSelectedCity] = useState({
      displayName:"القاهرة",
      apiName:"Cairo"
    });
    const [today,setToday] = useState();
    const [remaingTimePrayer, setRemaingTimePrayer] = useState("");
    // HANDLE FUNCTIONS
    const getTimings = async()=>{
       const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=Egp&city=${selectedCity.apiName}`)
         setTimings(response.data.data.timings);
    }
    const cleanTime = (timeStr) => {
      // خذ أول خمس حروف "HH:mm"
      return timeStr.substring(0,5);
    };

     const setUpCounterDownUp = () => {
        if (!timings['Fajr'] || !timings['Dhuhr'] || !timings['Asr'] || !timings['Maghrib'] || !timings['Isha']) {
            console.log("timings not loaded yet");
            return;
        }
        let prayerIndex = 0;
        const timeNow = moment();
        const Fajr = moment(cleanTime(timings['Fajr']), "HH:mm");
        const Dhuhr = moment(cleanTime(timings['Dhuhr']), "HH:mm");
        const Asr = moment(cleanTime(timings['Asr']), "HH:mm");
        const Maghrib = moment(cleanTime(timings['Maghrib']), "HH:mm");
        const Isha = moment(cleanTime(timings['Isha']), "HH:mm");

        if (timeNow.isAfter(Fajr) && timeNow.isBefore(Dhuhr)) {
           prayerIndex = 1
        } else if (timeNow.isAfter(Dhuhr) && timeNow.isBefore(Asr)) {
            prayerIndex = 2
        } else if (timeNow.isAfter(Asr) && timeNow.isBefore(Maghrib)) {
            prayerIndex = 3
        } else if (timeNow.isAfter(Maghrib) && timeNow.isBefore(Isha)) {
           prayerIndex = 4
        } else {
           prayerIndex = 0
        }
        setNextPrayerIndex(prayerIndex);
        // now after knowing what the next prayer is, we can setup the countdown timer by gettting the prayer's time
        const nextPrayerObjext = prayersArray[prayerIndex];
        const nextPrayerTimer  = timings[nextPrayerObjext.key];
        const nextPrayerTimerMomment = moment(cleanTime(nextPrayerTimer), "HH:mm");
        let remaingTime      = moment(cleanTime(nextPrayerTimer), "HH:mm").diff(timeNow); //طرح الوقت اللاحق من الوقت الحالى حتى نحصل ع المتبقى
        if(remaingTime < 0){
           const midNightDiff = moment("23:59:59","HH:mm:ss").diff(timeNow);
           const fajrToMidNightDiff = nextPrayerTimerMomment.diff(moment("00:00:00","HH:mm:ss"));
           const totalDifferance  = midNightDiff + fajrToMidNightDiff;
           remaingTime = totalDifferance;
        }
        const durationRemaingTime = moment.duration(remaingTime);
        setRemaingTimePrayer(`${durationRemaingTime.seconds()} : ${durationRemaingTime.minutes()} : ${durationRemaingTime.hours()}`);
        // console.log('durationRemaingTime is ',durationRemaingTime.hours(),durationRemaingTime.minutes(),durationRemaingTime.seconds());
    };


    const aviableCities = 
    [
        { 
          displayName:"القاهرة",
          apiName:"Cairo"
        },
        { 
          displayName:"اسكندريا",
          apiName:"Alexandria"
        },
        { 
          displayName:"بنى سويف",
          apiName:"Banī Suwayf"
        },
        { 
          displayName:"اسوان",
          apiName:"Aswan"
        }
    ]
    // USE EFFECT
    useEffect(()=>{
          getTimings();
    },[selectedCity])

   useEffect(() =>{
   if (
       timings['Fajr'] && timings['Dhuhr'] && timings['Asr'] &&
       timings['Maghrib'] && timings['Isha']
   ) {
       const interval = setInterval(() => {
           setUpCounterDownUp();
           setToday(moment().format("MMM Do YYYY | h:mm"));
       }, 1000);

       return () => clearInterval(interval);
   }
}, [timings])

   
   const handleChangeCity = (event) =>{
    const cityObject = aviableCities
    .find((city) =>{
      return city.apiName === event.target.value
    })
       setSelectedCity(cityObject);
   }
   
 
  return (
    <>
      {/* TOP ROW */}
        <Grid container spacing={2} >
        <Grid size={6}>
              <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <h2>متبقى حتى صلاه {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remaingTimePrayer}</h1>
          </div>
        </Grid>
       
      </Grid>
            {/*== TOP ROW ==*/}
        <Divider sx={{ opacity:"0.1",borderColor:"white" }} />
        {/* PLAYERS CARD */}
          <Stack direction="row" justifyContent={"space-around"} sx={{ marginTop:"50px" }} >
            <Player name="الفجر" time={timings.Fajr} imgLink="https://winstore.s3.eu-west-1.amazonaws.com/uploads/public/5f6/e83/0ed/thumb_88915_700_400_0_0_exact.jpg"/> 
            <Player name="الظهر" time={timings.Dhuhr} imgLink="https://www.alsbbora.info/UploadCache/libfiles/25/2/600x338o/266.jpg"/> 
            <Player name="العصر" time={timings.Asr} imgLink="https://www.elfagr.org/Upload/libfiles/574/0/904.png"/> 
            <Player name="المغرب" time={timings.Maghrib} imgLink="https://www.elmogaz.com/UploadCache/libfiles/79/6/800x450o/883.jpg"/> 
            <Player name="العشاء" time={timings.Isha} imgLink="https://www.m-ismail.net/wp-content/uploads/2022/06/1000290379_LTT.jpg"/> 


          </Stack>
        {/*== PLAYERS CARD ==*/}
        {/* SELECT CITY */}
             <Stack direction="row" justifyContent="center" sx={{ marginTop:"50px", color:"white" }}>
               <FormControl sx={{ width:"20%" }}>
        <InputLabel id="demo-simple-select-label">
          <span sx={{ color:"white !important" }} >المدينة</span>
        </InputLabel>
        <Select
          value={selectedCity.apiName}
        style={{ color:"white" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="city"
          onChange={handleChangeCity}
        >
        {aviableCities.map((city)=>{
          return(
            <MenuItem value={city.apiName} key={city.apiName}>
              {city.displayName}
            </MenuItem>

          );
        })}

       

        </Select>
        
      </FormControl>
             </Stack>

        {/*== SELECT CITY ==*/}


       
    </>
  )
}
