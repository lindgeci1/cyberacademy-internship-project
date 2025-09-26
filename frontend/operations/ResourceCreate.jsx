import { api } from "../src/components/apiClient";

export async function createResource(resources, newData) {
  try {

    const res = await api.post(`/resources/create`, newData);
    const createdResource   ={
        title: res.data.data.title,
        description: res.data.data.description,
        category: res.data.data.category,
        link: res.data.data.link,
    };
    return[...resources, createResource];
  } catch (err) {
    console.log("Create error: ", err);
    return resources;
  }
}
