import "./style/Main.scss"

import Radar from "./Radar";
import KPI from "./KPI";
import Objectifs from "./Objectifs";
import Poids from "./Poids";
import Card from "./Card";
import Loading from "./Loading";
import User from "../services/Service";

const Main = ()=>{
    if (User.status === 500){
        return (
            <main style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <h1>ERROR 503</h1>
                <p>quelque chose s’est mal passé sur le serveur réessayer plus tard</p>
                <img src="./asset/error500.png" alt="error 500" width={300}/>
            </main>
        )
    }
    if (User.MainData.status === 404){
        return (
            <main style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <h1>ERROR 404</h1>
                <p>le contenu que vous avez demander n'existe pas</p>
                <img src="./asset/error404.png" alt="error 404" width={300}/>
            </main>
        )
    }if (User.MainData.status){
        return (
            <main>
                <h1>ERROR {User.MainData.status}</h1>
            </main>
        )
    }
    if (User) {
        return (
            <main>
                <div className="head">
                    <div className="titre">
                        <p>Bonjour</p>
                        <p>{User.MainData.userInfos.firstName}</p>
                    </div>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </div>
                <div className="body">
                    <div className="un">
                        <div className="deux">
                            <Poids      data={User.UserActivity.sessions}/>
                        </div>
                        <div className="deux">
                            <Objectifs  data={User.UserSessions.Sessions}/>
                            <Radar      data={User.UserPerformance}/>
                            <KPI        data={User.MainData.score}/>
                        </div>
                    </div>
                    <div className="un">
                        <Card srcImg="./asset/Calories.png" valeur={User.MainData.keyData.calorieCount+"kCal"}  description="Calories"/>
                        <Card srcImg="./asset/Proteines.png"valeur={User.MainData.keyData.proteinCount+"g"}     description="Proteines"/>
                        <Card srcImg="./asset/Glucides.png" valeur={User.MainData.keyData.carbohydrateCount+"g"}description="Glucides"/>
                        <Card srcImg="./asset/Lipides.png"  valeur={User.MainData.keyData.lipidCount+"g"}       description="Lipides"/>
                    </div>
                </div>
            </main>
        )
    }
    else{
        return (
            <main>
                <div className="head">
                    <div className="titre">
                        <p>Bonjour</p>
                        <p>{<Loading width="170" height="57"/>}</p>
                    </div>
                    <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </div>
                <div className="body">
                    <div className="un">
                        <div className="deux">
                            <Loading width="835" height="320"/>
                        </div>
                        <div className="deux">
                            <Loading width="258" height="263"/>
                            <Loading width="258" height="263"/>
                            <Loading width="258" height="263"/>
                        </div>
                    </div>
                    <div className="un">
                        <Loading width="258" height="124"/>
                        <Loading width="258" height="124"/>
                        <Loading width="258" height="124"/>
                        <Loading width="258" height="124"/>
                    </div>
                </div>
            </main>
        )
    }
}
export default Main;