// import React, {  createContext, useContext, useState } from "react";


// const userContext = createContext()
// const authContext = ({children}) => {
//     const [user, setUser]= useState(null)
//     const login = (user) => {
//         setUser(user)

//     }


//     const logout = () => {
//         setUser(null)
//         localStorage.removeItem("token")
        
//     }
//     return (
//         <userContext.Provider valua= {{user, login, logout }}>
//             {children}
            
//         </userContext.Provider>
//     )
// }
// export const useAuth = () => useContext(userContext)
// export default authContext 


// import axios from "axios";
// import React, { createContext, useContext, useEffect, useState } from "react";


// // Créer un contexte
// const userContext = createContext();

// // Créer le composant fournisseur de contexte
// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(false);
//     useEffect(() => {
        
//         const verifyUser = async () => {
            
//             try {
//                 const token = localStorage.getItem('token')
//                 if (token){
//                     const response = await axios.get('http://localhost:3000/api/auth/verify', {
//                         headers: {
//                             "Authorization" : `Bearer ${token} `,
//                         },
//                     });
//                     console.log(response)
//                     if (response.data.success){
//                         setUser(response.data.user);
//                     }
//                 }else {
//                     setUser(null)
//                     setLoading(false)
//                 }
//             } catch (error) {
//                 console.log(error)
//                 if (error.response && !error.response.data.success) {
//                     setUser(null)
//                 }
//             } finally {
//                 setLoading(false)
//             }
//         } 
//         verifyUser()  
//     }, [])

//     const login = (user) => {
//         setUser(user);
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem("token");
//     };

//     return (
//         <userContext.Provider value={{ user, login, logout, loading }}>
//             {children}
//         </userContext.Provider>
//     );
// };

// // Hook personnalisé pour utiliser le contexte
// export const useAuth = () => useContext(userContext);

// // Exportation du fournisseur de contexte
// export default AuthProvider;







import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Créer un contexte
const userContext = createContext();

// Créer le composant fournisseur de contexte
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Commencer avec true pour éviter un rendu prématuré

    useEffect(() => {
        const verifyUser = async () => {
            setLoading(true); // Activer le chargement au début

            try {
                const token = localStorage.getItem("token");

                if (token) {
                    const response = await axios.get("http://localhost:3000/api/auth/verify", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    console.log(response);
                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'utilisateur :", error);
                setUser(null);
            } finally {
                setLoading(false); // Désactiver le chargement dans tous les cas
            }
        };

        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
        localStorage.setItem("token", user.token); // Assurer que le token est stocké
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(userContext);

// Exportation du fournisseur de contexte
export default AuthProvider;
