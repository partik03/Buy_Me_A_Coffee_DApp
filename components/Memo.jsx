export default function Memos({memos}){
    return (
        <div className="bg-sky-300 flex my-4 mx-3 rounded-lg px-2 py-3 justify-between">
            <h2 className="text-xl font-bold">{memos.message}</h2>
            <p>By-{memos.name}</p>

        </div>
    )
}