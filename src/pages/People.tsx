import React from "react";
import { NextPageContext } from "next";
import { myCustomGet } from "../helpers/fetch";

const People = ({ people }: any) => {
  return (
    <div>
      <h1>people</h1>
      {JSON.stringify(people, null, 10)}
    </div>
  );
};

export default People;

People.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = ctx.req?.headers.cookie;
  const url = "http://localhost:3000/api/people";

  try {
    const data = await myCustomGet(ctx, cookie, url);
    return { people: data };
  } catch (error) {
    console.log(error);
  }

  //#region created a customGet helper
  /**
  try {
    //fetch --set cookie
    const response = await fetch("http://localhost:3000/api/people", {
      headers: { cookie: cookie! },
    });

    //redirect if 401 && csr(client side rendering)
    if (response.status === 401 && !ctx.req) {
      Router.replace("/login");
      return;
    }

    //soft redirect if 401 && ssr(server side-rendering)
    if (response.status === 401 && ctx.req) {
      ctx.res?.writeHead(302, {
        location: "http://localhost:3000/login",
      });
      ctx.res?.end();
      return;
    }

    const people = await response.json();
    return { people };
  } catch (error) {
    console.log(error);
    //
  }
 */
  //#endregion
};
