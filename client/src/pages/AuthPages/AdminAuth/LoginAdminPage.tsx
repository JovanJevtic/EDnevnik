import './adminAuthStyles.css';


import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import LoginAdminForm from "./components/LoginAdminForm";
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useEffect } from 'react';
import { useHistory } from 'react-router';


interface LoginAdminPageProps {

}

const LoginAdminPage: React.FC<LoginAdminPageProps> = ({}) => {

    const history = useHistory();
    
    const { admin, isLoading: isAdminLoading } = useSelector((state: RootState) => state.authAdmin);
    const { profesor, isLoading: isProfesorLoading } = useSelector((state: RootState) => state.authProfesor);

    useEffect(() => {
        if (admin || profesor) {
            history.push('/');
        }
    }, [admin, isAdminLoading, profesor, isProfesorLoading]);

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