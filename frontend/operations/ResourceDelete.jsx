import { api } from "../src/components/apiClient";

export async function deleteResource(resources, id) {
  try {
    await api.delete(`/resources/delete/${id}`);
    return resources.filter((res) => res.id != id);
  } catch (err) {
    console.log("Delete error: ", err);
    return resources;
  }
}
