import { IonContent, IonPage, IonTitle } from "@ionic/react";
import Header from "../../components/Header";
import { IAdmin } from "../../features/admin/authAdminSlice";

interface AdminPredmetiPageProps {
    admin: IAdmin;
    onLogout: () => void;
}

const AdminPredmetiPage: React.FC<AdminPredmetiPageProps> = ({ admin, onLogout }) => {
    return (
        <IonPage>
            <Header ime={admin?.ime as string} onLogout={onLogout} userType="admin" />
                <IonContent>
                    <IonTitle>
                        This is the fuuking predmeti page
                    </IonTitle>
                </IonContent>
        </IonPage>
    );
}

export default AdminPredmetiPage