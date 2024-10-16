import { lucia } from "lucia";
import { cookies } from "next/headers";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";

const adapter = new BetterSqlite3Adapter(db, {
    user: 'users',
    session: 'sessions'
});


export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
      sessionCookie.name, 
      sessionCookie.value, 
      sessionCookie.attributes
  );
}

export async function verifyAuth(){
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if(!sessionCookie) {
      return {
          user: null,
          session: null
      };
  }

  const sessionId = sessionCookie.value;

  if(!sessionId) {
      return {
          user: null,
          session: null
      };
  }

  const result = await lucia.validateSession(sessionId);

  try {
      if(result.session && result.session.fresh) {
          const sessionCookie = lucia.createBlankSessionCookie(result.session.id);
          cookies().set(
              sessionCookie.name, 
              sessionCookie.value, 
              sessionCookie.attributes
          );
      }

      if(!result.session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          cookies().set(
              sessionCookie.name, 
              sessionCookie.value, 
              sessionCookie.attributes
          );
      }
  } catch {}
  

  return result;  
}

export async function destroySession(){
  const {} = await verifyAuth();
  if(!session) {
      return {
          error : 'Unauthorized!'
      }
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
      sessionCookie.name, 
      sessionCookie.value, 
      sessionCookie.attributes
  );
}