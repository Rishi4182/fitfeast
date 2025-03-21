import { useContext ,useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { userContextObj } from '../../Contexts/UserContext'
import { useForm} from "react-hook-form";

function plans() {
    const {currentUser , setCurrentUser}=useContext(userContextObj)
    const [status, setStatus] = useState(0);
    const [chng, setchng] = useState(0);
    const navigate = useNavigate();
    const [fl, setfl] = useState(0);
    console.log(currentUser)
    let bmr=0,cal1=0,fat=0,cal2=0,final=0;
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
      const [dur, setDuration] = useState("");
      const [activity, setActivity] = useState("");
      function handleDuration(event){
         setDuration(event.target.value)
      }
      function handleActivity(event){
        setActivity(event.target.value)
     }
      function duration(newDur)
      {
        if(dur!="" && activity!="")
        setStatus(1)
    if(currentUser.gender==="Male")
    {
        bmr=(10*currentUser.weight)+(6.25*currentUser.height)-(5*currentUser.age)+5;
        if(activity==="Sedentary")
            cal1=Math.round(bmr*1.2);
        else if(activity==="Lightly Active")
            cal1=Math.round(bmr*1.375);
        else if(activity==="Moderately Active")
            cal1=Math.round(bmr*1.55);
        else if(activity==="Very Active")
            cal1=Math.round(bmr*1.725);
    console.log(cal1)
if(currentUser.desiredweight>currentUser.weight)
    {
        fat=currentUser.desiredweight-currentUser.weight
        fat=fat*7700
        if(dur==="1 week")
        {
            cal2=Math.round(fat/7);
        }
        else if(dur==="2 weeks")
        {
            cal2=Math.round(fat/14);
        }
        else if(dur==="1 month")
        {
            cal2=Math.round(fat/4);
            cal2=Math.round(cal2/7);
        }
        else if(dur==="2 months")
        {
            cal2=Math.round(fat/8);
            cal2=Math.round(cal2/7);
        }
        else if(dur==="3 months")
        {
            cal2=Math.round(fat/12);
            cal2=Math.round(cal2/7);
        }
        console.log(cal2)
        final=cal1+cal2
    console.log(final)
    }
    else
    {
        fat=currentUser.weight-currentUser.desiredweight
        fat=fat*7700
        if(dur==="1 week")
        {
            cal2=Math.round(fat/7);
        }
        else if(dur==="2 weeks")
        {
            cal2=Math.round(fat/14);
        }
        else if(dur==="1 month")
        {
            cal2=Math.round(fat/4);
            cal2=Math.round(cal2/7);
        }
        else if(dur==="2 months")
        {
            cal2=Math.round(fat/8);
            cal2=Math.round(cal2/7);
        }
        else if(dur==="3 months")
        {
            cal2=Math.round(fat/12);
            cal2=Math.round(cal2/7);
        }
        console.log(cal2)
        final=cal1-cal2
    console.log(final)
    }
    }
    else if(currentUser.gender==="Female")
    {
        bmr=(10*currentUser.weight)+(6.25*currentUser.height)-(5*currentUser.age)-161;
        if(activity==="Sedentary")
            cal1=Math.round(bmr*1.2);
        else if(activity==="Lightly Active")
            cal1=Math.round(bmr*1.375);
        else if(activity==="Moderately Active")
            cal1=Math.round(bmr*1.55);
        else if(activity==="Very Active")
            cal1=Math.round(bmr*1.725);
if(currentUser.desiredweight>currentUser.weight)
    {
        fat=currentUser.desiredweight-currentUser.weight
        fat=fat*7700
        if(dur==="1 week")
        {
            cal2=Math.round(fat/7);
        }
        else if(dur==="2 weeks")
        {
            cal2=Math.round(fat/14);
        }
        else if(dur==="1 month")
        {
            cal2=Math.round(fat/4);
            cal2=Math.round(cal2/7);
        }
        else if(dur==="2 months")
        {
            cal2=Math.round(fat/8);
            cal2=Math.round(cal2/7);
        }
        else if(dur==="3 months")
        {
            cal2=Math.round(fat/12);
            cal2=Math.round(cal2/7);
        }
        console.log(cal2)
        final=cal1+cal2
    console.log(final)
    }
    else
    {
        fat=currentUser.weight-currentUser.desiredweight
        fat=fat*7700
        if(dur==="1 week")
        {
            cal2=Math.round(fat/7);
        }
        else if(dur==="2 weeks")
        {
            cal2=Math.round(fat/14);
        }
        else if(dur==="1 month")
        {
            cal2=Math.round(fat/4);
            cal2=Math.round(cal2/7);
        }
        else if(dur==="2 months")
        {
            cal2=Math.round(fat/8);
            cal2=Math.round(cal2/7);
        }
        else if(dur==="3 months")
        {
            cal2=Math.round(fat/12);
            cal2=Math.round(cal2/7);
        }
        console.log(cal2)
        final=cal1-cal2
    console.log(final)
    }
    }
    setchng(cal2)
    setfl(final)     
}
     
      function showValues(chng,fl)
      {
        if((fl-chng)>3000)
        {
            return(
                <div>
                    <p>It is not recommended for you to gain weight.</p>
                </div>);
        }
        else if(currentUser.desiredweight>currentUser.weight)
        {
            if(fl>3500)
            {
                return(
                    <div>
                        <p>It is dangerous to gain too much weight in short periods of time.We suggest you not to gain so much weight in a short period of time.</p>
                    </div>
                    ); 
            }
            else{
            return(
                <div>
                    <table className="table">
  <thead>
    <tr>
    <th scope="col"></th>
      <th scope="col">Activity</th>
      <th scope="col">Time Period</th>
      <th scope="col">Calories Surplus</th>
      <th scope="col">Calories Per Day</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>{activity}</td>
      <td>{dur}</td>
      <td>{chng}</td>
      <td>{fl}</td>
    </tr>
  </tbody>
</table>
                </div>
            );
        }}
        else
        {
            if((fl+chng)<1900)
            {
                return(
                    <div>
                        <p>It is not recommended for you to loose weight.</p>
                    </div>);
            }
            else if(chng>1000 || fl<1500)
            {
                return(
            <div>
                <p>It is dangerous to loose too much weight in short periods of time.We suggest you not to loose so much weight in a short period of time.</p>
            </div>);
            }
            else{
                return(
                    <div>
                        <table className="table">
  <thead>
    <tr>
    <th scope="col"></th>
      <th scope="col">Activity</th>
      <th scope="col">Time Period</th>
      <th scope="col">Calories Defeict</th>
      <th scope="col">Calories Per Day</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>{activity}</td>
      <td>{dur}</td>
      <td>{chng}</td>
      <td>{fl}</td>
    </tr>
  </tbody>
</table>
                    </div>
                );
            }
        }
      }
    
  return (
    currentUser.age === 0 || currentUser.height === 0 || currentUser.weight === 0 || currentUser.gender === "" || currentUser.desiredweight === 0? (<div>
        <h1>Edit Your Profile</h1>
        <p>Please add your age, height, gender, and weight to proceed with the plans form.</p>
        <button className='btn btn-secondary text-white mt-auto' onClick={() => navigate(`/user-profile/${currentUser.email}`)}>
      Edit Profile
    </button>
    </div>) : (<div>
    <div className="form">
        <form onSubmit={handleSubmit(duration)}>
            <div className='activity'>
                <label>
                    Activity:
                    <select onChange={handleActivity}>
                        <option value="">Select Activity</option>
                        <option value="Sedentary">Sedentary</option>
                        <option value="Lightly Active">Lightly Active</option>
                        <option value="Moderately Active">Moderately Active</option>
                        <option value="Very active">Very active</option>
                    </select>
                </label>
            </div>
            <div className='duration mt-5 mb-2'>
                <label>
                    Duration:
                    <select onChange={handleDuration}>
                        <option value="">Select Duration</option>
                        <option value="1 week">1 week</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="2 months">2 months</option>
                        <option value="3 months">3 months</option>
                    </select>
                </label>
            </div>
            <button type="submit" className="btn btn-success">
                DONE
            </button>
        </form>
        {
            status === 1 ? <div>
                {showValues(chng, fl)}
            </div> : <div></div>

        }
    </div>
</div>)
  )

}

export default plans