import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from '../Firebase';
import ReactTooltip from 'react-tooltip';

const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(checked){
            firebase.signoutUser();
        }
    }, [checked, firebase]);

    const handleChange = e => {
        setChecked(e.target.checked)
    }
    
    return (
        <div className="logoutContainer">
            <label className="switch">
                <input 
                onChange={handleChange}
                    type="checkbox" 
                    checked={checked}
                />
                <span data-tip="Déconnexion" className="slider round"></span>
            </label>
            <ReactTooltip
                place="left"
                effect="solid"
            />
        </div>
    )
}

export default Logout
