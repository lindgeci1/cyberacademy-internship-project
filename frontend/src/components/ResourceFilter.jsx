export default function ResourceFilter ({categories, selectCategory, onChange}){

return(
    <div className = "mb-4">
            <label className = "mr-2 font-semibold"> Filter By Category</label>
            <select
                value = {selectCategory}
                onChange = {(e) =>onChange(e.target.value)}
                className = "border rounded px-2 py-1"
                >
                    <option value = "">All</option>
                    {categories.map((cat)=>(

                        <option key={cat} value = {cat}>
                            {cat}
                        </option>
                    ))}
            </select>
    </div>
)



}