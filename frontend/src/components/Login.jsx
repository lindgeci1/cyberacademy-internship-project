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
            console.error(err.mesage);
            alert(err.mesage);
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
                >
                    Login

                    </button>
        </div>
    )
}