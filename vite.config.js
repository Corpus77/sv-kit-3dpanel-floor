import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
const config = {
	plugins: [sveltekit()],
	kit: {
    vite:{
      resolve: {
        alias: {
          $routes: path.resolve('./src/routes'),
        }
      }
    },
  },
};

export default config;
