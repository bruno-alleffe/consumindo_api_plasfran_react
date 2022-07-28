import Navbar from '../sidebar/Navbar.js'
import PostoCombustivelTable from '../postoCombustivel/PostoCombustivelTable.js'



function PostoCombustivel() {
   
    return (
        <div>
            <Navbar />
            <div className="bg-red-500 w-11/12 m-auto mt-10">
                <PostoCombustivelTable />
            </div>
           
        </div>
    )
}

export default PostoCombustivel