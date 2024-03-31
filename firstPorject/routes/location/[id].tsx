import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { PropertySignature } from "https://deno.land/x/ts_morph@20.0.0/ts_morph.js";
import Axios from "npm:axios";
import { Character } from "../character/[id].tsx";

type Planet = {
  name: string;
  url: string;
};

type CharacterLocation = {
  name: string;
  id: number;
  image: string;
  url: string;
};

type Location = {
  name: string;
  id: number;
  type: string;
  dimension: string;
  residents: CharacterLocation[];
};
type LocationFetch = {
  name: string;
  id: number;
  type: string;
  dimension: string;
  residents: string[];
};
export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Location>) => {
    const { id } = ctx.params;
    debugger;
    const location = await Axios.get<LocationFetch>(
      `https://rickandmortyapi.com/api/location/${id}`,
    );
    const characters = await Promise.all(
      location.data.residents.map(async (url) => {
        console.log(url);
        const character = await Axios.get<Character>(
          url,
        );
        console.log(character);

        const micharacter: CharacterLocation = {
          name: character.data.name,
          id: character.data.id,
          image: character.data.image,
          url: character.data.url,
        };
        return micharacter;
      }),
    );
    console.log(characters);
    return ctx.render({
      name: location.data.name,
      id: location.data.id,
      type: location.data.type,
      dimension: location.data.dimension,
      residents: characters,
    });
  },
};
const Page = (props: PageProps<Location>) => {
  console.log(props);
  return (
    <div>
      <h2>{props.data.name}</h2>
      <div>dimension: {props.data.dimension}</div>
      residents: {props.data.residents.map((ch) => {
        return (
          <li key={ch.id}>
            <a href={`../character/${ch.id}`}>{ch.name}</a>
          </li>
        );
      })}
      <div>type: {props.data.type}</div>
    </div>
  );
};

export default Page;
