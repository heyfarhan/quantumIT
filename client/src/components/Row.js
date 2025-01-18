const Row = ({ data, index }) => {

    var col = 'bg-green-500'
    if (data.status === 'inactive') {
        col = 'bg-yellow-400'
    }
    if (data.status === 'suspended') {
        col = 'bg-red-700'
    }

    return (
        <div div className="grid grid-cols-6 text-center border-b-2 border-gray-200 px-2 py-3 w-full items-center" >
            <span>{index}</span>
            <div className="flex gap-2 items-center ">
                <img src={data.profile} className="h-10 rounded-full" />
                <span>{data.name}</span>
            </div>
            <span>{data.date}</span>
            <span>{data.role}</span>
            <div className="flex gap-2 items-center pl-8 ">
                <div className={`w-4 h-4 rounded-full ${col} `}></div>
                <span>{data.status.toUpperCase()}</span>
            </div>
            <span>Action</span>
        </div>
    )
}
export default Row