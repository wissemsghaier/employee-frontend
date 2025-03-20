import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    return (
        <div>
            <h1>Accès non autorisé</h1>
            <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
        </div>
    );
}

export default UnauthorizedPage;
