import { useEffect, useState } from "react";
import {DataGrid} from "@mui/x-data-grid"
import ResourceFilter from "./ResourceFilter";
export default function ResourceList(){


    const[resources, SetResource] = useState([]);
    const[filteredResources, SetFilteredResources] = useState([]);
    const[selectCategory, SetSelectCategory] = useState("");


    useEffect(()=>{

        const api = import.meta.env.VITE_API_KEY;
        // console.log("Fetching resources from: ", `${api}/resources/getall`);
        fetch(`${api}/resources/getall`)
        .then((res)=>res.json())
        .then((data) =>{
            const formated  = data.data.map((res, index)=>({

                id: index,
                title: res.title,
                description: res.description,
                category: res.category,
                link: res.link,
            }))
            // console.log("Resources Fetched", data);
            SetResource(formated);
            SetFilteredResources(formated);
        })
        .catch((err)=>console.error("Fetch error: ", err));


    },[])

    
    useEffect(()=>{
        if(selectCategory===""){
            SetFilteredResources(resources);
        }else{
            SetFilteredResources(
                resources.filter((res)=>res.category===selectCategory)
            );
        }
    },[selectCategory, resources])


    const categories = Array.from(new Set(resources.map((res)=>res.category)));

    const columns =[


        {field: "title", headerName: "Title", flex: 1},
        {field: "description", headerName: "Description", flex: 1},
        {field: "category", headerName: "Category", flex: 1},
        {field: "link", headerName: "Link", flex: 1,
             renderCell: (params) =>(
                <a href={params.value} target = "_blank" rel = "noopener noreferrer">
                    {params.value}
                </a>
             )
        }
    ]

    return(

        <div style = {{height: 400 , width: 1000}}>

                <h2>Resources</h2> 

                <ResourceFilter
                categories={categories}
                selectCategory={selectCategory}
                onChange={SetSelectCategory}/>

                <DataGrid 
                rows = {filteredResources}
                columns={columns}
                pageSize ={5}
                />

        </div>
    )
}