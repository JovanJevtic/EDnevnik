import { IonPage, IonTitle } from "@ionic/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
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
            <IonTitle>Register Admin</IonTitle>
            <RegisterAdminForm />
        </IonPage>
    );
}

export default RegisterAdminPage