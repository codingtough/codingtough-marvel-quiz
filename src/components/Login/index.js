import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../Firebase';

const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasBtn, setHasBtn] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if(password.length > 5 && email !== ''){
            setHasBtn(true);
        } else if(hasBtn){
            setHasBtn(false);
        }
    }, [email, password, hasBtn]);

    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(email, password)
        .then(user => {
            setEmail('');
            setPassword('');
            props.history.push("/welcome");
        })
        .catch(error => {
            setError(error)
            setEmail('');
            setPassword('');
        })
    }
    
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                        { error !== '' && <span>{error.message}</span> }
                        
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                             
                            <div className="inputBox">
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete="off" required/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            
                            <div className="linkContainer">
                                <Link className="simpleLink" to="/signup"><small>Nouveau sur Coding Marvel Quiz? Insrivez-vous maintenant.</small></Link>
                                <br/>
                                <Link className="simpleLink" to="/forgetpassword"><small>Mot de passe oublié ?</small></Link>
                            </div>

                            { hasBtn ? <button>Connexion</button> : <button disabled>Connexion</button> }
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
