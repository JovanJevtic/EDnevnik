import { IonButton, IonTitle } from "@ionic/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { AppDispatch } from "../app/store";
import { register } from "../features/admin/authAdminSlice";
import { register as registruj } from "../features/profesor/authProfesorSlice"

interface PageProps {

}

const Page: React.FC<PageProps> = ({}) => {
    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory();

    const data = {
        ime: 'Moj admin5',
        email: 'moj@admin5.com',
        adminSifra: 'admin',
        sifra: 'blablabla123'
    }

    const profData = {
        ime: 'mile3',
        prezime: 'ja3s',
        email: 'bl32@gmail.com',
        predmet: '637367d6f43df6cd1c7955ce',
        isRazrednik: true,
        adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTEwOWI5ZDU3NTIyODc3M2UyMzUyOSIsImlhdCI6MTY3MTQ5ODE2OSwiZXhwIjoxNjc0MDkwMTY5fQ.JykFSB_wOpvM3vXRsT5nYthOl8GD0IpIBUjktvSXHAk'
    }

    const onSubmit = () => {
        dispatch(register(data));
        dispatch(registruj(profData));
        
        history.push('/');
    }

    const onSubmitProf = () => {
        dispatch(registruj(profData));
    }

    return (
        <>
            <IonTitle>Pozdrav</IonTitle>
            <IonButton onClick={onSubmit}>Stisni</IonButton>
            <IonButton onClick={onSubmitProf}>Stisni 2</IonButton>
        </>
    );
}

export default Page