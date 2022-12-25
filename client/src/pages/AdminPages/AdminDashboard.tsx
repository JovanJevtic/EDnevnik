import { IonButton, IonContent, IonPage, IonRouterOutlet, IonTitle } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import Header from "../../components/Header";
import { logout } from "../../features/admin/authAdminSlice";

interface AdminDashboardProps {

}

const AdminDashboard: React.FC<AdminDashboardProps> = ({}) => {
    const dispatch = useDispatch<AppDispatch>();

    const { admin, isError, isLoading, message, isSuccess  } = useSelector((state: RootState) => state.authAdmin);

    

    const onLogout = () => {
        dispatch(logout());
    }


    return (
        <IonPage>
            <Header userType={"admin"} ime={admin?.ime as string} />
            <IonContent>
                <IonTitle>This is the Admin Dashboard</IonTitle>
                <IonButton onClick={onLogout}>Logout</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default AdminDashboard