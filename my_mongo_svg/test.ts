import { normalize, isAbsolute, basename, dirname } from "https://deno.land/std@0.91.0/path/mod.ts";
console.log("import.meta.url:")
console.log(import.meta.url);
console.log("dirname:", dirname(import.meta.url));
console.log("basename:", basename(import.meta.url));
console.log("isAbsolute:", isAbsolute(Deno.execPath()));
console.log("normalize:", normalize(import.meta.url));


console.log("Deno.mainModule:")
console.log(Deno.mainModule);
console.log("dirname:", dirname(Deno.mainModule));
console.log("basename:", basename(Deno.mainModule));


console.log("Deno.execPath():", Deno.execPath());

const path2 = Deno.args[0];
const path = Deno.cwd();
console.log(path);
console.log(path2);
