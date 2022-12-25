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
                <div id="registerForm-svg-container">
                    {/* <svg id='registerForm-svg' width="900" height="600" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_2)">
                        <path d="M614.567 241.256C603.249 248.508 589.795 243.155 570.504 230.336C555.998 220.692 542.66 212.102 531.812 195.598C524.218 184.051 519.953 171.635 517.858 160.668C515.585 148.786 511.286 134.316 520.898 127.347C534.103 117.776 576.37 126.333 602.261 163.037C630.7 203.362 625.633 234.17 614.567 241.256Z" fill="url(#paint0_linear_1_2)"/>
                        <path d="M733.711 277.014C717.202 285.203 695.291 274.673 695.291 274.673C695.291 274.673 700.16 250.871 716.678 242.693C733.187 234.504 755.089 245.022 755.089 245.022C755.089 245.022 750.219 268.825 733.711 277.014V277.014Z" fill="url(#paint1_linear_1_2)"/>
                        <path d="M212.064 210.428C235.686 224.586 269.576 211.498 269.576 211.498C269.576 211.498 265.145 175.462 241.508 161.321C217.887 147.163 184.011 160.235 184.011 160.235C184.011 160.235 188.443 196.271 212.064 210.428V210.428Z" fill="url(#paint2_linear_1_2)"/>
                        <path d="M659.283 227.405C650.995 227.405 644.276 234.124 644.276 242.412C644.276 250.7 650.995 257.419 659.283 257.419C667.571 257.419 674.29 250.7 674.29 242.412C674.29 234.124 667.571 227.405 659.283 227.405Z" fill="#666AF6"/>
                        <path d="M242.913 257.17C236.09 257.17 230.559 262.701 230.559 269.524C230.559 276.347 236.09 281.878 242.913 281.878C249.736 281.878 255.267 276.347 255.267 269.524C255.267 262.701 249.736 257.17 242.913 257.17Z" fill="#666AF6"/>
                        <path d="M333.67 491.457C325.9 491.457 319.601 485.158 319.601 477.388C319.601 469.618 325.9 463.319 333.67 463.319C341.44 463.319 347.739 469.618 347.739 477.388C347.739 485.158 341.44 491.457 333.67 491.457Z" fill="#666AF6"/>
                        <path d="M737.112 349.749C733.486 349.749 730.547 346.81 730.547 343.184C730.547 339.558 733.486 336.619 737.112 336.619C740.738 336.619 743.677 339.558 743.677 343.184C743.677 346.81 740.738 349.749 737.112 349.749Z" fill="#666AF6"/>
                        <path d="M570.97 484.073C566.308 484.073 562.529 480.294 562.529 475.632C562.529 470.97 566.308 467.191 570.97 467.191C575.632 467.191 579.411 470.97 579.411 475.632C579.411 480.294 575.632 484.073 570.97 484.073Z" fill="#E1E4E5"/>
                        <path d="M155.702 463.55C148.968 463.55 143.509 458.091 143.509 451.357C143.509 444.623 148.968 439.164 155.702 439.164C162.436 439.164 167.895 444.623 167.895 451.357C167.895 458.091 162.436 463.55 155.702 463.55Z" fill="#E1E4E5"/>
                        <path d="M701.101 496.287C695.976 496.287 691.821 492.132 691.821 487.007C691.821 481.882 695.976 477.727 701.101 477.727C706.226 477.727 710.381 481.882 710.381 487.007C710.381 492.132 706.226 496.287 701.101 496.287Z" fill="#E1E4E5"/>
                        <path d="M700.079 161.515C694.381 161.515 689.762 156.896 689.762 151.198C689.762 145.5 694.381 140.881 700.079 140.881C705.777 140.881 710.396 145.5 710.396 151.198C710.396 156.896 705.777 161.515 700.079 161.515Z" fill="#E1E4E5"/>
                        <path d="M158.297 291.669C159.621 296.611 156.688 301.692 151.745 303.016C146.803 304.34 141.722 301.407 140.398 296.465C139.074 291.522 142.007 286.442 146.949 285.117C151.892 283.793 156.972 286.726 158.297 291.669Z" fill="#E1E4E5"/>
                        <path d="M342.369 114.156C340.239 114.156 338.513 112.43 338.513 110.3C338.513 108.17 340.239 106.444 342.369 106.444C344.499 106.444 346.225 108.17 346.225 110.3C346.225 112.43 344.499 114.156 342.369 114.156Z" fill="#E1E4E5"/>
                        <path d="M725.306 410.598C720.07 410.598 715.825 407.202 715.825 403.013C715.825 398.824 720.07 395.428 725.306 395.428C730.542 395.428 734.787 398.824 734.787 403.013C734.787 407.202 730.542 410.598 725.306 410.598Z" fill="#E1E4E5"/>
                        <path d="M531.399 104.478C532.358 108.056 530.235 111.734 526.657 112.692C523.079 113.651 519.401 111.528 518.442 107.95C517.484 104.372 519.607 100.694 523.185 99.7355C526.763 98.7768 530.44 100.9 531.399 104.478Z" fill="#E1E4E5"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M288.677 236.48C223.819 245.351 173.692 300.473 173.692 367.876C173.692 441.433 233.232 501.084 306.653 501.084H599.168C657.91 501.084 705.537 453.369 705.537 394.517C705.537 335.666 657.91 287.951 599.168 287.951C599.168 199.661 527.741 128.102 439.615 128.102C369.491 128.102 310.084 173.472 288.677 236.48V236.48Z" fill="#666AF6"/>
                        <path d="M362.141 292.557H515.805V426.351H362.141V292.557Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M439.635 302.776C420.459 302.776 403.377 303.533 389.421 304.496C376.183 305.408 366.004 316.362 365.054 330.618C364.378 340.759 363.907 351.445 363.907 361.441C363.907 371.437 364.378 382.122 365.054 392.263C366.004 406.519 376.183 417.473 389.421 418.386C406.134 419.532 422.882 420.105 439.635 420.105C458.812 420.105 475.894 419.348 489.85 418.386C503.088 417.473 513.267 406.519 514.217 392.263C514.893 382.122 515.363 371.437 515.363 361.441C515.363 351.445 514.893 340.759 514.217 330.618C513.267 316.362 503.088 305.408 489.85 304.496C473.136 303.349 456.388 302.775 439.635 302.776V302.776ZM388.048 281.077C364.056 282.731 345.207 302.921 343.473 328.927C342.774 339.423 342.271 350.705 342.271 361.441C342.271 372.177 342.774 383.459 343.473 393.955C345.207 419.96 364.056 440.151 388.048 441.805C405.218 442.982 422.424 443.571 439.635 443.571C459.33 443.571 476.874 442.794 491.222 441.805C515.215 440.151 534.064 419.96 535.797 393.955C536.497 383.459 537 372.177 537 361.441C537 350.705 536.497 339.423 535.797 328.927C534.064 302.921 515.215 282.731 491.222 281.077C456.871 278.721 422.399 278.721 388.048 281.077V281.077Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M385.281 271.235C385.281 241.31 409.54 217.05 439.466 217.05C469.392 217.05 493.652 241.31 493.652 271.235V314.584C493.652 320.569 488.8 325.421 482.815 325.421C476.83 325.421 471.978 320.569 471.978 314.584V271.235C471.978 253.28 457.422 238.724 439.466 238.724C421.511 238.724 406.955 253.28 406.955 271.235V314.584C406.955 320.569 402.103 325.421 396.118 325.421C390.132 325.421 385.281 320.569 385.281 314.584V271.235Z" fill="white"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M450.303 374.998C456.782 371.251 461.141 364.246 461.141 356.224C461.141 344.253 451.437 334.549 439.466 334.549C427.496 334.549 417.792 344.253 417.792 356.224C417.792 364.246 422.151 371.251 428.629 374.998V388.735C428.629 394.72 433.481 399.572 439.466 399.572C445.451 399.572 450.303 394.72 450.303 388.735V374.998Z" fill="#666AF6"/>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear_1_2" x1="539.736" y1="287.468" x2="611.959" y2="27.715" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white"/>
                        <stop offset="1" stop-color="#EEEEEE"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_1_2" x1="670.316" y1="302.558" x2="806.479" y2="194.852" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white"/>
                        <stop offset="1" stop-color="#EEEEEE"/>
                        </linearGradient>
                        <linearGradient id="paint2_linear_1_2" x1="303.474" y1="256" x2="113.405" y2="79.401" gradientUnits="userSpaceOnUse">
                        <stop stop-color="white"/>
                        <stop offset="1" stop-color="#EEEEEE"/>
                        </linearGradient>
                        <clipPath id="clip0_1_2">
                        <rect width="900" height="600" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg> */}
                </div>
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
                            <Link to={'/admin/register'}>Login</Link>
                        </IonItem>
                    </form>
                </div>
            </div>
    );
}

export default RegisterAdminForm