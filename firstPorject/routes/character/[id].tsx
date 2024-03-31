import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { PropertySignature } from "https://deno.land/x/ts_morph@20.0.0/ts_morph.js";
import Axios from "npm:axios";
import Character from "../../components/character.tsx";

export type Planet = {
  name: string;
  url: string;
};

export type Character = {
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

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Character>) => {
    const { id } = ctx.params;
    const character = await Axios.get<Character>(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    console.log(character);
    return ctx.render({
      image: character.data.image,
      name: character.data.name,
      id: character.data.id,
      status: character.data.status,
      species: character.data.species,
      type: character.data.type,
      gender: character.data.gender,
      origin: {
        name: character.data.origin.name,
        url: character.data.origin.url,
      },
      location: {
        name: character.data.location.name,
        url: character.data.location.url,
      },
      episode: character.data.episode,
      created: character.data.created,
      url: character.data.url,
    });
  },
};
const Page = (props: PageProps<Character>) => {
  console.log(props);

  return (
    <Character
      name={props.data.name}
      image={props.data.image}
      id={props.data.id}
      species={props.data.species}
      status={props.data.status}
      gender={props.data.gender}
      origin={props.data.origin}
      location={props.data.location}
      episode={props.data.episode}
      created={props.data.created}
      url={props.data.url}
      type={props.data.type}
    />
  );
};

export default Page;
