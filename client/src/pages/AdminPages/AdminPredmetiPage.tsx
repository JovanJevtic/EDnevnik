import { IonContent, IonItem, IonPage, IonTitle } from "@ionic/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import Header from "../../components/Header";
import { IAdmin } from "../../features/admin/authAdminSlice";
import { getPredmeti, IPredmet } from "../../features/predmet/predmetSlice";
import PredmetLinkItem from "./components/PredmetLinkItem";

interface AdminPredmetiPageProps {
    admin: IAdmin;
    onLogout: () => void;
}

const AdminPredmetiPage: React.FC<AdminPredmetiPageProps> = ({ admin, onLogout }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { predmeti } = useSelector((state: RootState) => state.predmet);

    useEffect(() => {
        dispatch(getPredmeti());
    }, [])

    return (
        <IonPage>
            <Header ime={admin?.ime as string} onLogout={onLogout} userType="admin" />
            <IonContent>
                { predmeti && predmeti.map((predmet) => (
                    <PredmetLinkItem predmet={predmet} />
                ))}
            </IonContent>
        </IonPage>
    );
}

export default AdminPredmetiPage