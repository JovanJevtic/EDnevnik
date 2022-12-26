import { IonButton, IonButtons, IonChip, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar } from "@ionic/react";
import { Link } from "react-router-dom";

import { person, addCircle } from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useSelector } from "react-redux";
import { logout } from "../features/admin/authAdminSlice";

interface HeaderProps {
    userType: string;
    ime: string;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({  userType, ime, onLogout}) => {
    const dispatch = useDispatch<AppDispatch>();

    const { admin, isError, isLoading, message, isSuccess  } = useSelector((state: RootState) => state.authAdmin);

    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot='start'>
                    <Link to={'/'} style={{ textDecoration: 'none', color: '#2dd36f', fontWeight: 'bold', marginLeft: '10px' }}>EDnevnik</Link>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton color={"danger"} onClick={onLogout}>Logout</IonButton>
                    <IonChip>
                        <IonIcon color='#ffffff' icon={person} />
                    <IonLabel>{ime}</IonLabel>      
                </IonChip>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
}

export default Header