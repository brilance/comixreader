export default function LeftArrow({isDisabled, action}) {
    if (!isDisabled){
        return (
            <div id="leftArrow" className="arrow" onClick={action}>
            &#8592;
            </div>
        )
    }
    return (
           <div id="leftArrow" className="arrow disabled">
           &#8592;
           </div>
       );
}