export const AmountDisplay = ({ label, amount }) => {
    return (
        <div className="text-2xl text-blue-600 font-bold">
            {label}:
            <span className="font-black text-black">{amount.toLocaleString("en-Us", { style:"currency", currency: "USD" })}</span>
        </div>
    )
}