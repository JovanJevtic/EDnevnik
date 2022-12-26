import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import RegisterAdminForm from "./components/RegisterAdminForm";

interface RegisterAdminPageProps {

}

const RegisterAdminPage: React.FC<RegisterAdminPageProps> = ({}) => {
    
    const history = useHistory();
    
    const { admin, isLoading: isAdminLoading } = useSelector((state: RootState) => state.authAdmin);
    const { profesor, isLoading: isProfesorLoading } = useSelector((state: RootState) => state.authProfesor);

    // useEffect(() => {
    //     if (profesor || admin) {
    //         history.push('/');
    //     }
    // }, [admin, isAdminLoading, profesor, isProfesorLoading]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <Link style={{ textDecoration: 'none', color: '#2dd36f', fontWeight: 'bold', marginLeft: '10px' }} to='/'>EDnevnik</Link>
                    </IonButtons>
                    <IonButtons slot='primary'>
                        <IonTitle style={{ bacgkround: 'red' }}>Admin Register</IonTitle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <RegisterAdminForm />
            </IonContent>
        </IonPage>
    );
}

export default RegisterAdminPage