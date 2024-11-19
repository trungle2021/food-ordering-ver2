interface FilterTagProps {
    label: string
    onRemove: () => void
}

export const FilterTag = ({ label, onRemove }: FilterTagProps) => {
    const handleOnRemove = () => {
        console.log("remove");
        onRemove()
    }
    return (
        <button 
            onClick={handleOnRemove} 
            style={{ position: 'relative', padding: '5px 30px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}
        >
            <span
                style={{ width: '15px', position: 'absolute', zIndex: '10', color: 'var(--black)', top: -5, right: 0, border: 'none', borderRadius: '100%', fontSize: '1.5rem' }}
            >
                    x
            </span>
            {label}
        </button>
    )
}