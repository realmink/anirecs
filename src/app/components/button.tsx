export default function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
    return(
        <button className ="bg-amber-50 text-gray-600 rounded-2xl w-24 h-4 flex text-center" onClick={onClick}> 
            {children}
        </button>
    );
}