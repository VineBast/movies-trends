import Image from 'next/image';
import trends from "/public/trends.png";

export default function CentralImage() {
    return (
        <Image className="baseCardImage" width={230} height={230} src={trends} alt="Colored oscar" />
    )
}