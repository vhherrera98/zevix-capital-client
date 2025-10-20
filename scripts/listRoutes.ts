// scripts/listRoutes.ts
import fs from 'fs';
import path from 'path';

const appDir = path.join(process.cwd(), 'app');

function getRoutes(dir: string, base = ''): string[] {
 const entries = fs.readdirSync(dir, { withFileTypes: true });
 let routes: string[] = [];

 for (const entry of entries) {
  const fullPath = path.join(dir, entry.name);
  if (entry.isDirectory()) {
   routes = routes.concat(getRoutes(fullPath, path.join(base, entry.name)));
  } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
   let route = path.join(base, entry.name.replace(/\.tsx$/, ''));
   if (route.endsWith('/index')) route = route.replace('/index', '');
   routes.push(route === '' ? '/' : route.replace(/\\/g, '/'));
  }
 }

 return routes;
}

const routes = getRoutes(appDir);
console.log('Rutas encontradas:');
routes.forEach(r => console.log(r));
