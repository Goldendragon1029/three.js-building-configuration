import Front from './front';
import Back from './back';
import Right from './right';
import Left from './left';
import Roof from './roof';
import Trim from './trim';

const SimpleBuilding = () => {
    return(
        <group>
            <Front />
            <Back />
            <Right />
            <Left />
            <Roof />
            <Trim />
            <mesh rotation={[ - Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[200, 200]}/>
                <meshStandardMaterial color={'white'} transparent opacity={0.7} roughness={0.4} />
            </mesh>
        </group>
    )
}
export default SimpleBuilding;
