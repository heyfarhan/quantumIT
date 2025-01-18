import { useState } from "react"
import Row from "./Row"
import Data from '../../Data.json'
const Table = () => {

    const [page, setPage] = useState(0);
    return (
        <div className="flex flex-col bg-white  w-[60%] rounded-lg text-center items-center justify-center">
            <div div className="grid grid-cols-6 bg-blue-400 text-white rounded-t-md text-center border-b-2 border-gray-200 px-2 py-3 w-full" >
                <span>#</span>
                <span>Name</span>
                <span>Date Created</span>
                <span>Role</span>
                <span>status</span>
                <span>Action</span>
            </div>

            {
                Data.slice(page * 10, page * 10 + 10).map((child, index) => <Row data={child} index={(page) * 10 + index + 1} key={index} />)
            }
            <div className="flex gap-4 mt-4 items-center justify-center mb-4">
                {
                    (page > 0) ? (
                        <button className="bg-red-600 py-1 px-2 rounded-sm text-white" onClick={() => setPage((prev) => (prev - 1))}>Back</button>

                    ) : (null)
                }
                {`Page ${page + 1}`}
                {(Math.floor(Data.length / 10) > page) ? (
                    <button className="bg-green-600 py-1 px-2 rounded-sm text-white " onClick={() => setPage((prev) => (prev + 1))}>Next</button>

                ) : (null)
                }
            </div>
            {`Total Length : ${Data.length}`}

        </div >
    )
}

export default Table