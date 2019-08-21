const { src, dest, series, parallel } = require('gulp')
const del = require('delete')
const tsc = require('gulp-typescript')

const cleanDist = (target = '../lib/*') => {
  const clean = cb => del(target, { force: true }, cb)
  return clean
}

const copyAssets = (dist = '../lib') => {
  const copy = () => {
    return src(['../src/**/*', '!../src/typings', '!../src/**/*.ts', '!../src/**/*.tsx'])
      .pipe(dest(dist))
  }
  return copy
}

const compileScripts = (dist = '../lib', tsConfig = {}) => {
  const compile = () => {
    const tsProject = tsc.createProject('../tsconfig.json', tsConfig)
    return src(['../src/**/*.ts', '../src/**/*.tsx'])
      .pipe(tsProject())
      .pipe(dest(dist))
  }
  return compile
}

const buildLib = series(
  cleanDist(),
  parallel(
    copyAssets(),
    compileScripts()
  )
)

const buildES = series(
  cleanDist('../es/*'),
  parallel(
    copyAssets('../es'),
    compileScripts('../es', { module: 'ES6' })
  )
)

exports.default = parallel(buildLib, buildES)
