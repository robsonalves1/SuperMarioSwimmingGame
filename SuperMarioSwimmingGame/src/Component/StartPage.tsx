import { Link } from 'react-router-dom';

const color = ["#FF0100", "#00BBFF", "#FFCC00", "#34B800"];

const StartPage = () => {
    const title = "Super Mario Swimming Game";
    let idxColor = color.length;

    return (
        <div className="menu-start">
            <h1 id="game-title">
                {
                    title.split('').map((_, index) => {
                        idxColor++;
                        idxColor %= color.length;
                        return (<span style={{ color: color[idxColor] }}>{title.charAt(index)}</span>)
                    })
                }
            </h1>
            <Link to="gamemario">
                <button>Start Game</button>
            </Link>
        </div>
    );
}

export default StartPage;