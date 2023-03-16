import react, { useEffect, useRef, useState } from 'react';
import marioImg from '../Img/marioSwimming1.png';
import marioImg2 from '../Img/marioSwimming2.png';
import wall from '../Img/obstacleWall.png';
import swimmingTheme from '../Sound/swimmingTheme.mp3';
import marioDeath from '../Sound/marioDeath.mp3';

const MarioPage = () => {
    const [ChangeSwimmingImg, setChangeSwimmingImg] = useState<boolean>(false);
    const [isSwimming, setIsSwimming] = useState<boolean>(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [random, setRandom] = useState<any>(3);
    const [count, setCount] = useState<number>(1);

    const marioRef = useRef<HTMLImageElement>(null);
    const wallRef = useRef<HTMLImageElement>(null);
    const wallHoleRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioMarioDeathRef = useRef<HTMLAudioElement>(null);

    const wallArray = Array(9).fill(0);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key == "w") {
                setChangeSwimmingImg(ChangeSwimmingImg => !ChangeSwimmingImg);
                audioRef.current?.play();
                setIsSwimming(true);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        let swimmingInterval: NodeJS.Timer;
        let sinkingInterval: NodeJS.Timer;

        const m = marioRef.current;
        if (!m) return;


        if (isSwimming) {
            swimmingInterval = setInterval(() => {
                setPosition((prevPosition) => {
                    return ({ x: prevPosition.x, y: prevPosition.y - 6 })
                })
            }, 10)

            setTimeout(() => {
                clearInterval(swimmingInterval);
                setIsSwimming(false);
            }, 200)
        } else {
            sinkingInterval = setInterval(() => {
                if (m.offsetTop > window.innerHeight - 100) {
                    setPosition((prevPosition) => {
                        return ({ x: prevPosition.x, y: prevPosition.y })
                    })
                } else {
                    setPosition((prevPosition) => {
                        return ({ x: prevPosition.x, y: prevPosition.y + 3 })
                    })
                }
            }, 10);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            clearInterval(sinkingInterval);
        }
    }, [isSwimming]);

    useEffect(() => {
        let randomInterval: NodeJS.Timer;
        let checkIsDeadInterval: NodeJS.Timer;

        checkIsDeadInterval = setInterval(() => {
            let m = marioRef.current;
            let hole = wallHoleRef.current;
            let wall = wallRef.current;

            if (!m) return;
            if (!wall) return;
            if (!hole) return;

            if (wall.offsetLeft == m.offsetLeft && (m.offsetTop <= hole.offsetTop || m.offsetTop >= hole.offsetTop + 100)
                || (m.offsetTop < 0)) {
                audioMarioDeathRef.current?.play();
                if (!audioRef.current) return;
                audioRef.current.volume = 0;
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            }
        }, 10)

        randomInterval = setInterval(() => {
            setRandom(getRandom(70));
            setCount(count => count + 1);
        }, 3000)

        const getRandom = (num: number) => {
            return Math.floor(Math.random() * num);
        }


        return () => {
            clearInterval(randomInterval);
            clearInterval(checkIsDeadInterval);
        }
    }, []);

    return (
        <div>

            {
                <div>
                    <h1 id="score">
                        Score:
                        <span>{count}</span>
                    </h1>
                    <img src={(ChangeSwimmingImg) ? marioImg : marioImg2} className="mario" style={{ top: position.y }} ref={marioRef} />
                    <div style={{ position: "absolute", zIndex: "0", height: "200px", width: "100%", top: random + "%", backgroundColor: "rgb(65,90,255)" }} ref={wallHoleRef}></div>
                    {
                        wallArray.map((_, index) => {
                            return (<img key={index} className="wall" src={wall} style={{ width: "95px" }} ref={wallRef} />)
                        }
                        )
                    };
                </div>
            }

            <audio src={swimmingTheme} ref={audioRef} />
            <audio src={marioDeath} ref={audioMarioDeathRef} />
        </div>
    );
}

export default MarioPage;