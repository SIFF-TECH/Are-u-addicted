import { useSelector } from "react-redux";
import DoctorProfile from "../../components/doctorProfile/DoctorProfile";
import PatientProfile from "../../components/patientProfile/PatientProfile";
import AdmineProfile from "../../components/adminProfile/AdmineProfile";


const Profile = () => {
    const user = useSelector((state) => state.user.currentUser);

    if (user?.isMedecin) {
        return (
            <DoctorProfile />
        )
    }

    if (user?.isPatient) {
        return (
            <PatientProfile />
        )
    }

    if (user?.isAdmin) {
        return (
            <AdmineProfile />
        )
    }
}

export default Profile