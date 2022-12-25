import { IonButton, IonPage, IonTitle } from "@ionic/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { logout } from "../../features/ucenik/authUcenikSlice";

interface UcenikDashbaordProps {

}

const UcenikDashbaord: React.FC<UcenikDashbaordProps> = ({}) => {
    const dispatch = useDispatch<AppDispatch>();

    const onLogout = () => {
        dispatch(logout());
    }

    return (
        <IonPage>
            <IonTitle>This is the Ucenik Dashboard</IonTitle>
            <IonButton onClick={onLogout}>Logout</IonButton>
        </IonPage>
    );
}

export default UcenikDashbaord