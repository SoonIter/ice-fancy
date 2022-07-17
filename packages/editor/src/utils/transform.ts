// import initSwc, { transformSync } from '@swc/wasm-web'

const transformSwc = async (_code: string) => {
  const { default: initSwc, transformSync } = await import('@swc/wasm-web')
  await initSwc()

  const code = transformSync(_code, {
    jsc: {
      parser: {
        syntax: 'typescript', // 'ecmascript',
        jsx: true,
        tsx: true,
      },
      target: 'es2022',
      transform: {
        react: {
          useBuiltins: true,
        },
      },
    },
  })
  return code.code as string
}
// const transformBabel = async (code: string) => {
//   const { transform } = await import('@babel/standalone')

//   const transformOptions = {
//     presets: [],
//     plugins: [],
//   }
//   // @ts-expect-error
//   transformOptions.presets!.push(['react', { useBuiltIns: true }])

//   //  // @ts-expect-error

//   const ts = await import('@babel/plugin-transform-typescript').then(
//     m => m.default,
//   )
//   // // @ts-expect-error

//   transformOptions.plugins!.push([ts, { isTSX: true }])

//   return transform(code, transformOptions).code!
// }

const transform = (reactCode: string) => {
  return transformSwc(reactCode)
  // return transformBabel(reactCode)
};
export default transform;
