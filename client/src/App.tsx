import { Redirect, Route } from 'react-router-dom';
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
import { logout } from './features/admin/authAdminSlice';

setupIonicReact();

const App: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();

  const [adminToken, setAdminToken] = useState<string | null>(null)
  const [profesorToken, setProfesorToken] = useState<string | null>(null);
  const [ucenikToken, setUcenikToken] = useState<string | null>(null);

  const { admin, isLoading, isError } = useSelector((state: RootState) => state.authAdmin); 


  useEffect(() => {
    setAdminToken(localStorage.getItem('adminToken'));
    setProfesorToken(localStorage.getItem('profesorToken'));
    setUcenikToken(localStorage.getItem('ucenikToken'));

    console.log(adminToken);
  }, [admin, isError, isLoading]);

  const adminLogOut = () => { 
    dispatch(logout())
  }

  return (
    <IonApp>

      {

        adminToken ? (
          <IonPage>
            <IonTitle>Admin Dashboard</IonTitle>
            <IonButton onClick={adminLogOut}>Logout</IonButton>
          </IonPage>
        )

        : profesorToken ? 

        (
          <IonPage>
            <IonTitle>Profesor Dashboard</IonTitle>
          </IonPage>
        ) 

        : ucenikToken ? 

        (
          <IonPage>
            <IonTitle>Ucenik Dashboard</IonTitle>
          </IonPage>
        )

        : (
          <Pocetak />
        )

      }

      {/* <IonReactRouter>
        <Route exact path="/tab1">
          <Page />
        </Route>      
        <Route exact path="/">
          <Redirect to="/tab1" />
        </Route>
        <Route>
          <Redirect to="/tab1" />
        </Route>
        
      </IonReactRouter> */}
    </IonApp>
  )
};

export default App;
