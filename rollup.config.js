import path from 'path';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: path.join(__dirname, 'src/index.ts'),
  output: [
    {
      file: path.join(__dirname, 'dist/kanga.js'),
      format: 'cjs',
      name: 'KangaJS'
    },
    {
      file: path.join(__dirname, 'dist/kanga.min.js'),
      format: 'iife',
      name: 'KangaJS',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    typescript(),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: true,
      },
    })
  ]
}