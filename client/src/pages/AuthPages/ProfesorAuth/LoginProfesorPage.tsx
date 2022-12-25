import { IonButton, IonInput, IonItem, IonPage, IonTitle, useIonAlert } from "@ionic/react";
import { IonInputCustomEvent, InputChangeEventDetail } from '@ionic/core';
import { useEffect, useState } from "react";
import { LoginProfesorData } from "../../../features/profesor/authProfesorServices";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { useHistory } from "react-router";
import { login, reset } from "../../../features/profesor/authProfesorSlice";
import { useSelector } from "react-redux";

interface LoginProfesorPageProps {

}

const LoginProfesorPage: React.FC<LoginProfesorPageProps> = ({}) => {
    
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
        profesor 
    } = useSelector((state: RootState) => state.authProfesor);

    useEffect(() => {
        if (isError) {
            presentAlert({
                header: `${message}`,
                buttons: ['OK'],
            })
        }

        if (isSuccess || profesor) {
            history.push('/');
        } 

        dispatch(reset());
    }, [isError, isLoading, isSuccess, message, profesor ]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(login(formData));
    }

    const { admin, isLoading: isAdminLoading } = useSelector((state: RootState) => state.authAdmin);

    useEffect(() => {
        if (admin || profesor) {
            history.push('/');
        }
    }, [admin, isAdminLoading, profesor, isLoading]);

    return (
        <IonPage>
            <IonTitle>Login Profesor</IonTitle>
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

export default LoginProfesorPage