import { IonContent, IonItem, IonPage, IonText, IonTitle } from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch, RootState } from "../../app/store";
import Header from "../../components/Header";
import { IAdmin } from "../../features/admin/authAdminSlice";
import { getPredmet, IPredmet } from "../../features/predmet/predmetSlice";

interface AdminPredmetPageProps {
    admin: IAdmin;
    onLogout: () => void
}

const AdminPredmetPage: React.FC<AdminPredmetPageProps> = ({ admin, onLogout }) => {
    const { ime } = useParams<{ ime?: string }>();    
    // const { predmeti } = useSelector((state: RootState) => state.predmet);

    const [predmet, setPredmet] = useState<IPredmet>();

    const getPredmet = async () => {
        const response = await axios.get('http://localhost:5000/api/predmet' + `/${ime}`);
        setPredmet(response.data);
    }

    useEffect(() => {
        getPredmet();
    }, [])

    return (
        <IonPage>
            <Header ime={admin?.ime as string} onLogout={onLogout} userType="admin" />
            <IonContent>
                { predmet && 
                    <>
                
                        <IonItem>
                            <IonText>Naziv: {predmet.ime}</IonText>
                        </IonItem>  
                        <IonItem>Lista Profesora: </IonItem>
                    </>
                }
            </IonContent>
        </IonPage>
    );
}

export default AdminPredmetPage