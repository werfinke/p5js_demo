//
console.log("Test2");
console.log(import.meta.url);

console.log(Deno.mainModule);

console.log(Deno.execPath());

const path2 = Deno.args[0];
const path = Deno.cwd();
console.log(path);
console.log(path2);
