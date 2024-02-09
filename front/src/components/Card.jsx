import { useEffect } from "react";

const Card = (props)=>{
    const style = {
        Card: {
            display: "flex",
            backgroundColor: "#FBFBFB",
            borderRadius: "5px",
            width: "258px",
            height: "124px",
            gap: "24px"
        },
        img: {
            borderRadius: "6px",
            width: "60px",
            height: "60px",
            margin: "32px"
        },
        div:{
            display: "flex",
            flexDirection: "column",
            valeur:{
                fontWeight: "bold",
                fontSize: "20px"
            },
            description:{
                fontSize: "14px",
                color: "#74798C",
                fontWeight: "medium",
            }
        }
    }
    return (
        <div style={style.Card} className="Card">
            <img style={style.img} src={props.srcImg} alt="img"/>
            <div style={style.div}>
                <p style={style.div.valeur}>{props.valeur}</p>
                <p style={style.div.description}>{props.description}</p>
            </div>
        </div>
    )
}
export default Card;