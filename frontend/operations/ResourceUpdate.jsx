import { api } from "../src/components/apiClient";


export async function updateResource(resources, id, updateData){

    try{
        const res = await api.put(`/resources/update/${id}`, updateData);
        return resources.map((r)=> (r.id ===id?{...r, ...res.data}: r))
    }
    catch(err){
        console.log("Update error: ", err);
        return resources;
    }
}