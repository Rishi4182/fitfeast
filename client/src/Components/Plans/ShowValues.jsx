// // import React, { useContext } from 'react'
// // import { userContextObj } from '../../Contexts/UserContext';
// // import SplitCalories from './SplitCalories';
// // import Filter from './Filter';
// // import MealPlanner from './MealPlanner';

// // function ShowValues(props) {
// //     const { currentUser, setCurrentUser } = useContext(userContextObj)


// //     // if ((props.fl - props.chng) > 3000) {
// //     //     return (
// //     //         <div>
// //     //             <p>It is not recommended for you to gain weight.</p>
// //     //         </div>);
// //     // }
// //     // else if (currentUser.desiredweight > currentUser.weight) {
// //     //     if (props.fl > 3500) {
// //     //         return (
// //     //             <div>
// //     //                 <p>It is dangerous to gain too much weight in short periods of time.We suggest you not to gain so much weight in a short period of time.</p>
// //     //             </div>
// //     //         );
// //     //     }
// //     //     else {
// //     //         return (
// //     //             <div>
// //     //                 <table className="table">
// //     //                     <thead>
// //     //                         <tr>
// //     //                             <th scope="col"></th>
// //     //                             <th scope="col">Activity</th>
// //     //                             <th scope="col">Time Period</th>
// //     //                             <th scope="col">Calories Surplus</th>
// //     //                             <th scope="col">Calories Per Day</th>
// //     //                         </tr>
// //     //                     </thead>
// //     //                     <tbody>
// //     //                         <tr>
// //     //                             <th scope="row"></th>
// //     //                             <td>{props.activity}</td>
// //     //                             <td>{props.dur}</td>
// //     //                             <td>{props.chng}</td>
// //     //                             <td>{props.fl}</td>
// //     //                         </tr>
// //     //                     </tbody>
// //     //                 </table>
// //     //                 <div>
// //     //                     <SplitCalories />
// //     //                     <Filter />
// //     //                     <MealPlanner />
// //     //                 </div>
// //     //             </div>
// //     //         );
// //     //     }
// //     // }
// //     // else {
// //     //     if ((props.fl + props.chng) < 1900) {
// //     //         return (
// //     //             <div>
// //     //                 <p>It is not recommended for you to loose weight.</p>
// //     //             </div>);
// //     //     }
// //     //     else if (props.chng > 1000 || props.fl < 1500) {
// //     //         return (
// //     //             <div>
// //     //                 <p>It is dangerous to loose too much weight in short periods of time.We suggest you not to loose so much weight in a short period of time.</p>
// //     //             </div>);
// //     //     }
// //     //     else {
// //     //         return (
// //     //             <div>
// //     //                 <table className="table">
// //     //                     <thead>
// //     //                         <tr>
// //     //                             <th scope="col"></th>
// //     //                             <th scope="col">Activity</th>
// //     //                             <th scope="col">Time Period</th>
// //     //                             <th scope="col">Calories Defeict</th>
// //     //                             <th scope="col">Calories Per Day</th>
// //     //                         </tr>
// //     //                     </thead>
// //     //                     <tbody>
// //     //                         <tr>
// //     //                             <th scope="row"></th>
// //     //                             <td>{props.activity}</td>
// //     //                             <td>{props.dur}</td>
// //     //                             <td>{props.chng}</td>
// //     //                             <td>{props.fl}</td>
// //     //                         </tr>
// //     //                     </tbody>
// //     //                 </table>
// //     //                 <div>
// //     //                     <SplitCalories />
// //     //                     <Filter />
// //     //                     <MealPlanner />
// //     //                 </div>
// //     //             </div>
// //     //         );
// //     //     }
// //     // }
// //     return (
// //         <div>
// //         {(props.fl - props.chng) > 3000 && <div><p>It is not recommended for you to gain weight.</p></div>}
        
// //         {(currentUser.desiredweight > currentUser.weight) && ((props.fl > 3500) ? <div>
// //             <p>It is dangerous to gain too much weight in short periods of time.We suggest you not to gain so much weight in a short period of time.</p>
// //         </div> : <div>
// //             <table className="table">
// //                 <thead>
// //                     <tr>
// //                         <th scope="col"></th>
// //                         <th scope="col">Activity</th>
// //                         <th scope="col">Time Period</th>
// //                         <th scope="col">Calories Surplus</th>
// //                         <th scope="col">Calories Per Day</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     <tr>
// //                         <th scope="row"></th>
// //                         <td>{props.activity}</td>
// //                         <td>{props.dur}</td>
// //                         <td>{props.chng}</td>
// //                         <td>{props.fl}</td>
// //                     </tr>
// //                 </tbody>
// //             </table>
// //             <div>
// //                 <SplitCalories />
// //                 <Filter />
// //                 <MealPlanner />
// //             </div>
// //         </div>)}
// //         </div>
// //     )

// // }

// // export default ShowValues

// import React, { useContext, useMemo } from 'react';
// import { userContextObj } from '../../Contexts/UserContext';
// import SplitCalories from './SplitCalories';
// import Filter from './Filter';
// import MealPlanner from './MealPlanner';

// function ShowValues(props) {
//     const { currentUser } = useContext(userContextObj);

//     const { activity, dur, chng, fl } = props;

//     // 🛑 Use useMemo to prevent unnecessary re-renders
//     const content = useMemo(() => {
//         // Weight Gain Scenarios
//         if ((fl - chng) > 3000) {
//             return <p>It is not recommended for you to gain weight.</p>;
//         }

//         if (currentUser.desiredweight > currentUser.weight) {
//             if (fl > 3500) {
//                 return <p>It is dangerous to gain too much weight in short periods of time.</p>;
//             } else {
//                 return (
//                     <>
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Activity</th>
//                                     <th scope="col">Time Period</th>
//                                     <th scope="col">Calories Surplus</th>
//                                     <th scope="col">Calories Per Day</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>{activity}</td>
//                                     <td>{dur}</td>
//                                     <td>{chng}</td>
//                                     <td>{fl}</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                         <div>
//                             <SplitCalories />
//                             <Filter />
//                             <MealPlanner />
//                         </div>
//                     </>
//                 );
//             }
//         }

//         // Weight Loss Scenarios
//         if ((fl + chng) < 1900) {
//             return <p>It is not recommended for you to lose weight.</p>;
//         } else if (chng > 1000 || fl < 1500) {
//             return <p>It is dangerous to lose too much weight quickly.</p>;
//         } else {
//             return (
//                 <>
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Activity</th>
//                                 <th scope="col">Time Period</th>
//                                 <th scope="col">Calories Deficit</th>
//                                 <th scope="col">Calories Per Day</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>{activity}</td>
//                                 <td>{dur}</td>
//                                 <td>{chng}</td>
//                                 <td>{fl}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                     <div>
//                         <SplitCalories />
//                         <Filter />
//                         <MealPlanner />
//                     </div>
//                 </>
//             );
//         }
//     }, [currentUser, activity, dur, chng, fl]);  // Add necessary dependencies

//     return <div>{content}</div>;
// }

// export default ShowValues;
