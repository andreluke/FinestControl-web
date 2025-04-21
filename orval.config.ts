import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'https://finestcontro.discloud.app/docs/json',

    output: {
      target: './src/http/api.ts',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      baseUrl: 'https://finestcontro.discloud.app',

      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },

        mutator: {
          path: './src/client/http.ts',
          name: 'http',
        },
      },
    },
  },
})
