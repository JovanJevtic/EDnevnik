import { IonContent, IonPage, IonTitle } from "@ionic/react";
import Header from "../../components/Header";
import { IAdmin } from "../../features/admin/authAdminSlice";
import MaterialTable from 'material-table'

import { ThemeProvider, createTheme } from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline'; 

interface AdminPredmetiPageProps {
    admin: IAdmin;
    onLogout: () => void;
}



const AdminPredmetiPage: React.FC<AdminPredmetiPageProps> = ({ admin, onLogout }) => {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    });

    return (
        <IonPage>
            <Header ime={admin?.ime as string} onLogout={onLogout} userType="admin" />
            <IonContent>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline>
                        <MaterialTable
                            columns={[{ title: 'Naziv Predmeta', field: 'name' }]}
                            data={[{ name: 'Hemija' }, { name: 'Matematika' }, { name: 'Matematika' }, { name: 'Matematika' }, { name: 'Matematika' }, { name: 'Matematika' }, { name: 'Matematika' }, { name: 'Matematika' }]}
                            title="Predmeti"
                        />
                    </CssBaseline>
                </ThemeProvider>
            </IonContent>
        </IonPage>
    );
}

export default AdminPredmetiPage