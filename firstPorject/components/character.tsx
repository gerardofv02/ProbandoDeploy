import { FunctionComponent } from "preact";
import { Planet } from "../routes/character/[id].tsx";
type CharacterProps = {
  image: string;
  name: string;
  id: number;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Planet;
  location: Planet;
  episode: string[];
  created: string;
  url: string;
};

const Character: FunctionComponent<CharacterProps> = (props) => {
  const { name, image, status, species, type, gender, origin, location } =
    props;
  return (
    <div>
      <h2>{name}</h2>
      Imagen: <img src={image} width="100px" height="100px"></img>
      <div>Status: {status}</div>
      <div>Species: {species}</div>
      <div>type: {type}</div>
      <div>gender: {gender}</div>
      origin:
      <a href={`../location/${origin.url.split("/")[5]}`}>
        {origin.name}
      </a>
      <br />
      location:
      <a href={`../location/${location.url.split("/")[5]}`}>
        {location.name}
      </a>
    </div>
  );
};

export default Character;
