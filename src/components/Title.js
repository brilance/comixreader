export default function Title({title, month, day, year}) {
    return (
        <>
        <h1>{title}</h1>
        <p className="date">Date: {month}/{day}/{year}</p>
        </>
    )
}