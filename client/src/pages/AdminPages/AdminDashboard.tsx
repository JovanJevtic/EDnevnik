import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonItem, IonPage, IonRouterOutlet, IonTitle } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect, Route } from "react-router";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import Header from "../../components/Header";
import { IAdmin, logout } from "../../features/admin/authAdminSlice";
import AdminPredmetiPage from "./AdminPredmetiPage";

interface AdminDashboardProps {

}

const AdminDashboard: React.FC<AdminDashboardProps> = ({}) => {
    const dispatch = useDispatch<AppDispatch>();

    const { admin, isError, isLoading, message, isSuccess  } = useSelector((state: RootState) => state.authAdmin);

    const onLogout = () => {
        dispatch(logout());
    }


    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path='/'>
                    <IonPage>
                        <Header onLogout={onLogout} userType={"admin"} ime={admin?.ime as string} />
                        <IonContent>
                            {/* <IonItem>This is the Admin Dashboard</IonItem> */}
                            <Link style={{textDecoration: 'none'}} to={'/razredi'}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>Razredi</IonCardTitle>
                                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        Here's a small text description for the card content. Nothing more, nothing less.
                                    </IonCardContent>
                                </IonCard>
                            </Link>

                            <Link style={{textDecoration: 'none'}} to={'/profesori'}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>profesori</IonCardTitle>
                                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        Here's a small text description for the card content. Nothing more, nothing less.
                                    </IonCardContent>
                                </IonCard>
                            </Link>

                            <Link style={{textDecoration: 'none'}} to={'/ucenici'}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>ucenici</IonCardTitle>
                                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        Here's a small text description for the card content. Nothing more, nothing less.
                                    </IonCardContent>
                                </IonCard>
                            </Link>

                            <Link style={{textDecoration: 'none'}} to={'/predmeti'}>
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardTitle>predmeti</IonCardTitle>
                                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                                    </IonCardHeader>

                                    <IonCardContent>
                                        Here's a small text description for the card content. Nothing more, nothing less.
                                    </IonCardContent>
                                </IonCard>
                            </Link>
                        </IonContent>
                    </IonPage>
                </Route>
                <Route exact path='/razredi'>
                    <IonPage>
                        <Header ime={admin?.ime as string} onLogout={onLogout} userType="admin" />
                        <IonContent>
                            <IonTitle>
                                This is the fuuking razredi page
                            </IonTitle>
                        </IonContent>
                    </IonPage>
                </Route>
                <Route exact path='/profesori'>
                    <IonPage>
                        <Header ime={admin?.ime as string} onLogout={onLogout} userType="admin" />
                        <IonContent>
                            <IonTitle>
                                This is the fuuking profesori page
                            </IonTitle>
                        </IonContent>
                    </IonPage>
                </Route>
                <Route exact path='/ucenici'>
                    <IonPage>
                        <Header ime={admin?.ime as string} onLogout={onLogout} userType="admin" />
                        <IonContent>
                            <IonTitle>
                                This is the fuuking ucenici page
                            </IonTitle>
                        </IonContent>
                    </IonPage>
                </Route>
                <Route exact path='/predmeti'>
                    <AdminPredmetiPage admin={admin as IAdmin} onLogout={onLogout} />
                </Route>
                <Route>
                    <Redirect to={'/'}/>
                </Route>
            </IonRouterOutlet>
        </IonReactRouter>
    );
}

export default AdminDashboard