import { useState,useEffect } from "react";
import { floorPlan } from "../data/floorPlan";
import TableSection from "./TableSection";
import StatsPanel from "./StatsPanel";
import Lengend from "./Legend";
import SimulatorToggle from "./SimulatorToggle";

export default function FloorPlan()
{
    const [now, setNow] = useState(Date.now())
    const noodleSection = floorPlan.filter(table => table.section === 'noodle-station')
    const mainHallSection = floorPlan.filter(table => table.section === 'main-hall')
    const privateRoomSection = floorPlan.filter(table => table.section === 'private-room')

    useEffect(() =>{
        const intervalId = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(intervalId)
    },[])
    return(
       <div className="flex flex-col items-center gap-8 p-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            <TableSection title="Noodle Station" tables={noodleSection} theme="slate" layout="row" currentTime = {now}></TableSection>
            <TableSection title="Main Hall" tables={mainHallSection} theme="slate" layout="column" currentTime={now}></TableSection>
            <TableSection title="Private Room" tables={privateRoomSection} theme="teal" layout="column" currentTime={now}></TableSection>
            <SimulatorToggle/>
        </div>
            <div className="self-start flex flex-col gap-4 md:mt-44 max-w-full">
                <StatsPanel currentTime={now}/>
                <Lengend/>
            </div>
       </div>
    )
}
