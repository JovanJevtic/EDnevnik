import { IonButton, IonInput, IonItem, IonPage, IonTitle, useIonAlert } from "@ionic/react";
import { IonInputCustomEvent, InputChangeEventDetail } from '@ionic/core';
import { useEffect, useState } from "react";
import { LoginProfesorData } from "../../../features/profesor/authProfesorServices";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useHistory } from "react-router";
import { login, reset } from '../../../features/ucenik/authUcenikSlice';
import { useSelector } from "react-redux";

interface LoginUcenikPageProps {

}

const LoginUcenikPage: React.FC<LoginUcenikPageProps> = ({}) => {
    
    const [presentAlert] = useIonAlert();
    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory();

    const [formData, setFormData] = useState<LoginProfesorData>({
        email: '',
        sifra: ''
    });

    const { email, sifra } = formData;

    const onChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
        setFormData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }))
    }

    const { 
        isError, 
        isLoading, 
        isSuccess, 
        message, 
        ucenik
    } = useSelector((state: RootState) => state.authUcenik);

    useEffect(() => {
        if (isError) {
            presentAlert({
                header: `${message}`,
                buttons: ['OK'],
            })
        }

        if (isSuccess || ucenik) {
            history.push('/');
        } 

        dispatch(reset());
    }, [isError, isLoading, isSuccess, message, ucenik ]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(login(formData));
    }

    const { admin, isLoading: isAdminLoading } = useSelector((state: RootState) => state.authAdmin);
    const { profesor, isLoading: isProfesorLoading } = useSelector((state: RootState) => state.authProfesor);

    useEffect(() => {
        if (admin || profesor || ucenik) {
            history.push('/');
        }
    }, [admin, isAdminLoading, ucenik, isLoading, profesor, isProfesorLoading]);

    return (
        <IonPage>
            <IonTitle>Login Ucenik</IonTitle>
            <form onSubmit={onSubmit}>
                <IonItem>
                    <IonInput
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Unesi Email"
                        value={email}
                        onIonChange={onChange}
                    />
                </IonItem>  
                <IonItem>
                    <IonInput 
                        type="password"
                        id="sifra"
                        name="sifra"
                        value={sifra}
                        placeholder="Unesi lozinku"
                        onIonChange={onChange}
                    />
                </IonItem>
                <IonButton expand="block" type="submit">Submit</IonButton>
            </form>
        </IonPage>
    );
}

export default LoginUcenikPage