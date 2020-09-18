import path from 'path';
import RollupTypescriptPlugin from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: path.join(__dirname, 'src/index.ts'),
  output:{
    file: path.join(__dirname, 'dist/kanga.min.js'),
    format: 'cjs',
    name: 'KangaJS',
    sourcemap: true
  },
  plugins: [
    RollupTypescriptPlugin(),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: true,
      },
    }),
  ]
}