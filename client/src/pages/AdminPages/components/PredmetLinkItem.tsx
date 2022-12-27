import { IonItem } from "@ionic/react";
import { Link } from "react-router-dom";
import { IPredmet } from "../../../features/predmet/predmetSlice";

interface PredmetLinkItemProps {
    predmet: IPredmet;
}

const PredmetLinkItem: React.FC<PredmetLinkItemProps> = ({ predmet }) => {
    return (
        <Link style={{ textDecoration: 'none' }} to={`predmeti/${predmet.ime}`}>
            <IonItem color={"light"}>{predmet.ime}</IonItem>
        </Link>
    );
}

export default PredmetLinkItem