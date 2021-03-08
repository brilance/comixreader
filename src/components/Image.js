export default function Image({url, alt}) {
    return (
        <>
        <img id="mainImage" src={url} alt={alt} title={alt}/>
        <p>{alt}</p>
        </>
    )
}