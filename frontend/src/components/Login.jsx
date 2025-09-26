import React from "react";
import Cookies from "js-cookie";


export default function Login({onLogin}){

    const api = import.meta.env.VITE_API_KEY;

    const handleLogin = async()=>{
        try{
            const res = await fetch (`${api}/login`,{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({username: "User 1", password: "User#123"}),
            });
            const data  = await res.json();
            if(!res.ok) throw new Error (data.message || "Login failed!");

            Cookies.set("token", data.token);
            onLogin();
        }
        catch(err){
            console.error(err.message);
            alert(err.message);
        }
    }

    return(
        <div style={{width: "100vw",height:"100vh", display:"flex",flexDirection: "column", justifyContent: "center", alignItems:"center"}}>

            <h2 className="text-2xl mb-6">Please login here</h2>
                <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
                >
                    Login

                    </button>
        </div>
    )
}