import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { Character } from "./character/[id].tsx";

type Search = {
  characters?: Character[];
};
type example = {
  search?: string;
  characters: Data[];
};
type Data = {
  id: number;
  name: string;
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, example>) => {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || undefined;
    if (!search) {
      return ctx.render({ characters: [], search: "" });
    }
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${search}`,
    );
    if (response.status != 200) {
      return ctx.render({ characters: [], search });
    }
    const data = await response.json();
    return ctx.render({ characters: data.results, search });
  },
};

export default function Home(props: PageProps<example>) {
  return (
    <div>
      <h1>PERSONAJES RICK Y MORTY</h1>
      <form method="get" target="/buscando">
        <input type="text" name="search" value={props.data.search}></input>
        <button type="submit">Enviar</button>
      </form>
      {props.data.characters.map((ch) => <div key={ch.id}>{ch.name}</div>)}
    </div>
  );
}
