export default function InputComponent({label, placeholder, onChange, value, type}){
    
    return(
        <div className="">
            <p className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white text-base">{label}</p>
            <input 
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-2 pr-2 pb-2 pl-2 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
            />
        </div>
    )
}