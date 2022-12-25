import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Page from './pages/Page';
import { AppDispatch, RootState } from './app/store';
import { useDispatch } from 'react-redux';
import Pocetak from './pages/Pocetak';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from './pages/AdminPages/AdminDashboard';
import ProfesorDashboard from './pages/ProfesorPages/ProfesorDashboard';
import UcenikDashbaord from './pages/UcenikPages/UcenikDashbaord';
import { getMe as getMeAdmin } from './features/admin/authAdminSlice';
import { getMe as getMeProfesor } from './features/profesor/authProfesorSlice';
import { getMe as getMeUcenik } from './features/ucenik/authUcenikSlice';

setupIonicReact();

const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const [adminToken, setAdminToken] = useState<string | null>(null)
  const [profesorToken, setProfesorToken] = useState<string | null>(null);
  const [ucenikToken, setUcenikToken] = useState<string | null>(null);

  const { admin, isLoading: isAdminLoading, isError: isAdminError } = useSelector((state: RootState) => state.authAdmin); 
  const { profesor, isLoading: isProfesorLoading, isError: isProfesorError } = useSelector((state: RootState) => state.authProfesor);
  const { ucenik, isLoading: isUcenikLoading, isError: isUcenikError } = useSelector((state: RootState) => state.authUcenik);


  useEffect(() => {
    setAdminToken(localStorage.getItem('adminToken'));
    setProfesorToken(localStorage.getItem('profesorToken'));
    setUcenikToken(localStorage.getItem('ucenikToken'));

  }, [admin, isAdminError, isAdminLoading, profesor, isProfesorError, isProfesorLoading, ucenik, isUcenikError, isUcenikLoading ]);

  useEffect(() => {
    if (adminToken) {
      dispatch(getMeAdmin(adminToken as string));
    } 
    if (profesorToken) {
      dispatch(getMeProfesor(profesorToken as string))
    }
    if (ucenikToken) {
      dispatch(getMeUcenik(ucenikToken as string))
    }
  }, [adminToken, profesorToken, ucenikToken])

  useEffect(() => {
    if (!admin && isAdminError) {
      console.log('molim');
      localStorage.removeItem('adminToken');
    }
    if (!isProfesorError && !profesor && isProfesorLoading) {
      localStorage.removeItem('profesorToken');
    }
    if (!isUcenikError && !ucenik && isUcenikLoading) {
      localStorage.removeItem('ucenikToken');
    }
  }, [isAdminError, isUcenikError, isProfesorError, admin, profesor, ucenik])

  return (
    <IonApp>

      {

        adminToken ? (
          <AdminDashboard />
        )

        : profesorToken ? 

        (
          <ProfesorDashboard />
        ) 

        : ucenikToken ? 

        (
          <UcenikDashbaord />
        )

        : (
          <Pocetak />
        )

      }
    </IonApp>
  )
};

export default App;
