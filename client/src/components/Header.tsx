import { IonButton, IonButtons, IonChip, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar } from "@ionic/react";
import { Link } from "react-router-dom";

import { person, addCircle } from 'ionicons/icons';

interface HeaderProps {
    userType: string;
    ime: string;
}

const Header: React.FC<HeaderProps> = ({  userType, ime }) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>EDnevnik</IonTitle>
                <IonButtons>
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