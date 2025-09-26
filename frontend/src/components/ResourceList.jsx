import { useEffect, useState } from "react";
import {DataGrid} from "@mui/x-data-grid"
import ResourceFilter from "./ResourceFilter";
import Cookies  from "js-cookie";
import {api} from "../components/apiClient";
import { deleteResource } from "./ResourceDelete";
export default function ResourceList(){


    const[resources, SetResource] = useState([]);
    const[filteredResources, SetFilteredResources] = useState([]);
    const[selectCategory, SetSelectCategory] = useState("");


    useEffect(()=>{

        // console.log("Fetching resources from: ", `${api}/resources/getall`);
        api.get("/resources/getall")
        .then((res) =>{
            const formated  = res.data.data.map((res, index)=>({

                id: res._id,
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

    const handleDelete = async (id)=>{
        const updateResource = await deleteResource(resources, id);
        SetResource(updateResource);
        SetFilteredResources(
            selectCategory
            ? updateResource.filter((res)=>res.category===selectCategory)
            :updateResource
        );
    };
    const columns =[


        {field: "title", headerName: "Title", flex: 1},
        {field: "description", headerName: "Description", flex: 2},
        {field: "category", headerName: "Category", flex: 1},
        {field: "link", headerName: "Link", flex: 1,
             renderCell: (params) =>(
                <a href={params.value} target = "_blank" rel = "noopener noreferrer">
                    {params.value}
                </a>
             )
        },{
            field: "delete",
            headerName: "Delete",
            width: 100,
            renderCell: (params)=>(
                <button onClick={()=>handleDelete(params.row.id)}>
                    Delete
                </button>
            )
        }
    ]

    return(

        <div style = {{height: 400 , width: 1500}}>

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