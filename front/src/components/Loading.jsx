const Loading = (props)=>{
    const style = {
        Loading: {
            backgroundColor: "#7c7c7c",
            borderRadius: "5px",
            width: props.width+"px",
            height: props.height+"px",
        }
    }
    return (
        <div style={style.Loading} className="Card">
            
        </div>
    )
}
export default Loading;