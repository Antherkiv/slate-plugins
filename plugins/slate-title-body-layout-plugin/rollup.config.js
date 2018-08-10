// rollup.config.js
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.tsx',
  output: {
    format: 'es',
    dir: 'dist',
    file: 'index.js',
    sourcemap: true
  },

  plugins: [
    typescript({
      typescript: require('typescript'),
      declarationDir: './typing',
      useTsconfigDeclarationDir: false
    })
  ]
};
