import React, {useState, useEffect} from "react"

export default function ResourceCreateModel({onClose,onSave}){

    const[formData, setFormData]=useState({

        title: "",
        description: "",
        category: "",
        link: "",
});

        const handlechange = (e)=>{
            setFormData({...formData, [e.target.name]:e.target.value});
        };

        return(
            <div style = {{
                position: "fixed", top: 0, left: 0, right: 0 , bottom: 0,
                background: "rgb(0,0,0,0.3",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <div style={{background: "#fff", padding: 20, minWidth: 300, borderRadius: 5}}>

                <input name="title" value={formData.title} onChange={handlechange} placeholder="Title"/>
                <input name="description" value={formData.description} onChange={handlechange} placeholder="Description"/>
                <input name="category" value={formData.category} onChange={handlechange} placeholder="Category"/>
                <input name="link" value={formData.link} onChange={handlechange} placeholder="Link"/>
                <div style={{marginTop: 10, display: "flex", justifyContent: "flex-end", gap: 5}}>
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={() => onSave(formData)}>Save</button>

                </div>

                </div>

            </div>
        )


    
}