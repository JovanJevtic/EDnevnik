import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';
import { IonButton, IonInput, IonItem, IonLabel, IonPage, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../app/store';
import { login, reset } from '../../../../features/admin/authAdminSlice';
import '../adminAuthStyles.css';
interface LoginAdminFormProps {

}

interface IFormData {
    email: string;
    sifra: string;
}

const LoginAdminForm: React.FC<LoginAdminFormProps> = ({}) => {
    const dispatch = useDispatch<AppDispatch>()
    const history = useHistory()
    const [presentAlert] = useIonAlert();

    const [formData, setFormData] = useState<IFormData>({
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

    const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.authAdmin
    )

    useEffect(() => {
        if (isError) {
          presentAlert({
            header: `${message}`,
            // subHeader: 'Important message',
            buttons: ['OK'],
          })
        }
      
        if (isSuccess || admin) {
          history.push('/')
        }
      
        dispatch(reset())
      }, [admin, isError, isSuccess, message, history, dispatch])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(login(formData));
    }


    return (
            <div id='loginForm-container'>
                <div id="loginForm-form-container">
                    <form onSubmit={onSubmit}>
                        <IonItem>
                            {/* <IonLabel>Input email</IonLabel> */}
                            <IonInput 
                                type='text'
                                id='email'
                                name='email'
                                placeholder='Enter Email'      
                                value={email}      
                                onIonChange={onChange}            
                            />
                        </IonItem>
                        <IonItem>
                            {/* <IonLabel>Input password</IonLabel> */}
                            <IonInput 
                                type='password'
                                id='sifra'
                                name='sifra'
                                value={sifra}
                                placeholder='Enter Password'      
                                onIonChange={onChange}              
                            />
                        </IonItem>
                        
                        <IonButton expand='block' type='submit'>Submit</IonButton>
                        <IonItem>
                            <Link to={'/admin/register'}>Register</Link>
                        </IonItem>
                    </form>
                </div>
            </div>
    );
}

export default LoginAdminForm