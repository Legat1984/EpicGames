import React, { useState, useContext } from "react";
import EpicGamesBackground from "./EpicGamesBackground";
import EpicGamesStartAppButtonContainer from "./EpicGamesStartAppButtonContainer";
import { UserContext } from '../../contexts/UserContext';

import EpicGamesPlatform from '../Platform/App';

const EpicGamesStartApp = () => {
    const [hideByModality, setHideByModality] = useState(false);

    return (
        <>
            <EpicGamesBackground hideByModality={hideByModality}/>
            <EpicGamesStartAppButtonContainer setHideByModality={setHideByModality} />
        </>
    );
}

const AppContent = () => {
    const { isAuthenticated } = useContext(UserContext);

    return (
        <>
            {isAuthenticated ? <EpicGamesPlatform /> : <EpicGamesStartApp />}
        </>
    );
}

export default AppContent;