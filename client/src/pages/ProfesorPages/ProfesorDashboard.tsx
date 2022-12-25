import { IonButton, IonPage, IonTitle } from "@ionic/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

import { logout } from '../../features/profesor/authProfesorSlice';

interface ProfesorDashboardProps {

}

const ProfesorDashboard: React.FC<ProfesorDashboardProps> = ({}) => {

    const { profesor, isLoading: isProfesorLoading } = useSelector((state: RootState) => state.authProfesor);
    const dispatch = useDispatch<AppDispatch>();

    const logoutFn = () => {
        dispatch(logout());
    }
    
    return (
        <IonPage>
            <IonTitle>This is the profesor Dashboard</IonTitle>
            <IonButton onClick={logoutFn}>Logout</IonButton>
        </IonPage>
    );
}

export default ProfesorDashboard