 export default function Button(props){
    return(
        <button onClick={props.onclick} style={{backgroundColor: props.color}} className="btn btn-primary"> {props.text}</button>
    )
}