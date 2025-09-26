import { useEffect, useState } from "react";
import {DataGrid} from "@mui/x-data-grid"
import ResourceFilter from "./ResourceFilter";
import Cookies  from "js-cookie";
import {api} from "../components/apiClient";
//operations
import { deleteResource } from "../../operations/ResourceDelete";
import { updateResource } from "../../operations/ResourceUpdate";
import { createResource } from "../../operations/ResourceCreate";
//models
import ResourceEditModal from "../../models/ResourceEditModal";
import ResourceCreateModel from "../../models/ResourceCreateModel";
export default function ResourceList(){


    const[resources, SetResource] = useState([]);
    const[filteredResources, SetFilteredResources] = useState([]);
    const[selectCategory, SetSelectCategory] = useState("");
    const[editResource, setEditResource] = useState(null);
    const[createopen, setCreateopen] = useState(false);

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

    const handleupdateClick = (resources) =>{
        setEditResource(resources);
    }

    const handleSave = async(updateData)=>{
        const   updateResources = await updateResource(resources, editResource.id, updateData);
        SetResource(updateResources);
        SetFilteredResources(
            selectCategory
            ? updateResource.filter((res)=>res.category===selectCategory)
            :updateResource
        );
        setEditResource(null);

        window.location.reload();
    }
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
        ,
        {
            field: "update",
            headerName: "Update",
            width: 100,
            renderCell: (params)=>(
                <button onClick={()=>handleupdateClick(params.row)}>
                    update
                </button>
            )
        }
    ]

    return(

        <div style = {{height: 400 , width: 1200}}>

                <h2>Resources</h2> 

                <ResourceFilter
                categories={categories}
                selectCategory={selectCategory}
                onChange={SetSelectCategory}/>

                <button onClick={()=>setCreateopen(true)} style = {{margin:"10px 0"}}>
                    Create a new Resource
                </button>
                <DataGrid 
                rows = {filteredResources}
                columns={columns}
                pageSize ={5}
                />
                {editResource && (
                    <ResourceEditModal
                        resource={editResource}
                        onClose={()=>setEditResource(null)}
                        onSave={handleSave}
                        />
                )}
                {createopen &&(
                    <ResourceCreateModel
                    onClose={()=>setCreateopen(false)}
                    onSave={async (newData)=>{
                        const updateResources = await createResource(resources, newData);
                        SetResource(updateResource);
                        SetFilteredResources(
                            selectCategory
                            ? updateResource.filter((res)=>res.category===selectCategory)
                            :updateResource
                        );
                        setCreateopen(false);
                        window.location.reload();
                    }}
                    />
                )}

        </div>
    )
}