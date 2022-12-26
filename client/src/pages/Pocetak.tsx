import { IonButton, IonContent, IonHeader, IonItem, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { Link } from "react-router-dom";
import LoginAdminForm from "./AuthPages/AdminAuth/components/LoginAdminForm";
import LoginAdminPage from "./AuthPages/AdminAuth/LoginAdminPage";
import RegisterAdminPage from "./AuthPages/AdminAuth/RegisterAdminPage";
import LoginProfesorPage from "./AuthPages/ProfesorAuth/LoginProfesorPage";
import LoginUcenikPage from "./AuthPages/UcenikAuth/LoginUcenikPage";

interface PocetakProps {

}

const Pocetak: React.FC<PocetakProps> = ({}) => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/">
                    <IonPage>
                        <IonHeader>
                            <IonToolbar>
                                <IonTitle style={{ textDecoration: 'none', color: '#2dd36f', fontWeight: 'bold', fontSize: '18px' }}>EDnevnik</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>
                            <IonItem>
                                <Link to={'/admin/login'}>Admin Login</Link>
                            </IonItem>
                            <IonItem>
                                <Link to={'/profesor/login'}>Profesor Login</Link>
                            </IonItem>
                            <IonItem>
                                <Link to={'/ucenik/login'}>Ucenik Login</Link>
                            </IonItem>
                        </IonContent>
                    </IonPage>
                </Route>    
                <Route path="/admin/register">
                    <RegisterAdminPage />
                </Route>
                <Route path='/admin/login'>
                    <LoginAdminPage />
                </Route>
                <Route path='/profesor/login'>
                    <LoginProfesorPage />
                </Route>
                <Route path='/ucenik/login'>
                    <LoginUcenikPage />
                </Route>
                <Route path='/ja/sam'>
                    <IonPage>
                        <IonTitle>Ja sam</IonTitle>
                    </IonPage>
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </IonRouterOutlet>        
        </IonReactRouter>
    );
}

export default Pocetak