import { NextPageContext } from "next";
import Router from "next/router";

export const myCustomGet = async (
  ctx: NextPageContext,
  cookie: any,
  url: string
) => {
  try {
    //fetch --set cookie
    const response = await fetch(url, {
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
