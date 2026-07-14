import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    rules: {
      // Card artwork comes from generated remote avatar URLs and is also
      // captured by html2canvas; raw images are intentional here.
      '@next/next/no-img-element': 'off',
      // These effects hydrate browser storage or subscribe to Supabase and
      // external stores. Their state updates are the synchronization work.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'ios/**', 'android/**', 'next-env.d.ts']),
]);
