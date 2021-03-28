import { dirname, fromFileUrl } from "https://deno.land/std@0.91.0/path/mod.ts";

console.log(import.meta.url);
// const moduleDir = dirname(fromFileUrl(import.meta.url));
// console.log(moduleDir);

console.log(Deno.mainModule);
// const moduleDir2 = dirname(fromFileUrl(Deno.mainModule));
// console.log(moduleDir2);


console.log(Deno.execPath());

const path2 = Deno.args[0];
const path = Deno.cwd();
console.log(path);
console.log(path2);

//console.log(deno.getUint8Array("./style.css"));

//console.log(Deno.statSync(import.meta.url)); // FileInfo { ... }
//console.log([...Deno.readDirSync(new URL("static-files", import.meta.url))]); // [ ... ]



//(async () => {
//    const output = await renderFile(`${cwd()}/text.ejs`, {
//    name: "world"
//  });
//  await copy(output, stdout);
//})();


