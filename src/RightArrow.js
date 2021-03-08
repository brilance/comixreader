export default function RightArrow({isDisabled, action}) {
    if (!isDisabled){
        return (
            <div id="rightArrow" className="arrow" onClick={action}>
            &#8594;
            </div>
        )
    }
    return (
           <div id="rightArrow" className="arrow disabled">
           &#8594;
           </div>
       );
}