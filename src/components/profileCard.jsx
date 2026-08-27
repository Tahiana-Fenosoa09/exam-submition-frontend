
// import { useParams } from "react-router";
// import { useState } from "react";
// import ProfileCard from "../components/profileCard";
// import NotFound from "./notFound";

// function Profile() {
//     const [ isOwner , setIsOwner] = useState(false);

//     const owner = {
//         id: 1,
//         firstName: 'Steevey',
//         lastName: 'Rakoto',
//         group: 'N3',
//         level: 'L1',
//         role: 'student'
//     }

//     const [students, setStudents] = useState([
//         {
//             id: 1,
//             firstName: 'Steevey',
//             lastName: 'Rakoto',
//             group: 'N3',
//             level: 'L1',
//             role: 'student'
//         },
//         {
//             id: 2,
//             firstName: 'Prudence',
//             lastName: 'RaJean',
//             group: 'N3',
//             level: 'L1',
//             role: 'student'
//         }, {
//             id: 3,
//             firstName: 'Stanley',
//             lastName: 'Shang',
//             group: 'N3',
//             level: 'L1',
//             role: 'student'
//         }, {
//             id: 4,
//             firstName: 'Junioh',
//             lastName: 'Ok',
//             group: 'N3',
//             level: 'L1',
//             role: 'student'
//         }
//     ]);



//     const { studentId } = useParams;

//     const researchedStudent = students.find(e => e.id == Number(studentId));

//     if(researchedStudent.id == owner.id){
//         setIsOwner(e => !e);
//     }

//     return (

//         <>
            
//             { role == 'student' && isOwner ? <ProfileCard name={researchedStudent.name} group={researchedStudent.group} level={researchedStudent.level} id={researchedStudent.id} isAdmin={false} isOwner={true}/> : role == 'student' && !isOwner ? <ProfileCard name={researchedStudent.name} group={researchedStudent.group} level={researchedStudent.level} id={researchedStudent.id}  isAdmin={false} owner={false}/>  : role == 'admin' ? <ProfileCard name={researchedStudent.name} group={researchedStudent.group} level={researchedStudent.level} id={researchedStudent.id}  isAdmin={true}/> : <h1>this user is unknown</h1>}
//         </>
//     );

// }

// export default Profile;