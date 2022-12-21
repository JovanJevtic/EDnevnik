import './adminAuthStyles.css';


import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import LoginAdminForm from "./components/LoginAdminForm";


interface LoginAdminPageProps {

}

const LoginAdminPage: React.FC<LoginAdminPageProps> = ({}) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Admin Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div id="loginContent">
                    <LoginAdminForm />
                </div>
            </IonContent>
        </IonPage>
    );
}

export default LoginAdminPage