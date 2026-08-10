import { floorPlan } from "../data/floorPlan";
import TableSection from "./TableSection";
export default function FloorPlan()
{
    const noodleSection = floorPlan.filter(table => table.section === 'noodle-station')
    const mainHallSection = floorPlan.filter(table => table.section === 'main-hall')
    const privateRoomSection = floorPlan.filter(table => table.section === 'private-room')

    return(
        <div className="flex gap-8 p-4">
            <TableSection title="Noodle Station" tables={noodleSection} theme="slate" layout="row"></TableSection>
            <TableSection title="Main Hall" tables={mainHallSection} theme="slate" layout="column"></TableSection>
            <TableSection title="Private Room" tables={privateRoomSection} theme="teal" layout="column"></TableSection>
        </div>
    )
}