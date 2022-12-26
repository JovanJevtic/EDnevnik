import { InputChangeEventDetail, IonInputCustomEvent } from '@ionic/core';
import { IonButton, IonInput, IonItem, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../../app/store';
import { register, reset } from '../../../../features/admin/authAdminSlice';
import '../adminAuthStyles.css';
interface RegisterAdminForm {

}

interface IFormData {
    ime: string;
    adminSifra: string;
    email: string;
    sifra: string;
}

const RegisterAdminForm: React.FC<RegisterAdminForm> = ({}) => {
    const dispatch = useDispatch<AppDispatch>()
    const history = useHistory()
    const [presentAlert] = useIonAlert();

    const [formData, setFormData] = useState<IFormData>({
        email: '',
        sifra: '',
        adminSifra: '',
        ime: ''
    });

    const { email, sifra, adminSifra, ime } = formData;

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

        dispatch(register(formData));
    }


    return (
            <div id='registerForm-container'>
                <div id="registerForm-form-container">
                    <form onSubmit={onSubmit}>
                        <IonItem>
                            <IonInput 
                                type='text'
                                id='ime'
                                name='ime'
                                placeholder='Unesi ime'
                                value={ime}
                                onIonChange={onChange}
                            />
                        </IonItem>
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

                        <IonItem>
                            <IonInput
                                type='password'
                                id='adminSifra'
                                name='adminSifra'
                                value={adminSifra}
                                placeholder='Unesi admin lozinku'
                                onIonChange={onChange}
                            />
                        </IonItem>
                        
                        <IonButton expand='block' type='submit'>Submit</IonButton>
                        <IonItem>
                            <Link to={'/admin/login'}>Login</Link>
                        </IonItem>
                    </form>
                </div>
            </div>
    );
}

export default RegisterAdminForm