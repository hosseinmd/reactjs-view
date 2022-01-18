import { Index, Scope, scopes } from "reactjs-view-share";

function generateIndex(index: Index, scope: Scope = "app") {
  return scopes[scope][index]++;
}

export { generateIndex };
