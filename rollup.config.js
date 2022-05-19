import path from 'path';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: path.join(__dirname, 'src/index.ts'),
  output: [
    {
      dir: path.join(__dirname, 'dist'),
      entryFileNames: '[name].js',
      format: 'esm',
      sourcemap: true,
    },
    {
      dir: path.join(__dirname, 'dist'),
      entryFileNames: 'kanga.web.min.js',
      format: 'iife',
      name: 'Kanga',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    typescript({
      // This is hacky and just there so that we can generate .d.ts files.
      // Reference: https://github.com/rollup/plugins/issues/243#issuecomment-595964778
      rootDir: 'src',
      sourceMap: true,
    }),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: true,
      },
    }),
  ],
};
