// WARNING: DO NOT EDIT THIS EVER!!!!!!!!
// THIS IS RECOMMENDED - AS IT MINIFIES AND OBFUSCATES STUFF.

const fs = require('fs')
const path = require('path')

const { minify } = require('terser')
const JavaScriptObfuscator = require('javascript-obfuscator')
const CleanCSS = require('clean-css')
const htmlMinify = require('html-minifier-terser').minify

async function build() {
    const files = fs.readdirSync('.')

    for (const file of files) {
        const ext = path.extname(file)

        if (ext === '.css') {
            const css = fs.readFileSync(file, 'utf8')
            const result = new CleanCSS({ level: 2 }).minify(css).styles
            fs.writeFileSync(file, result)
        }

        if (ext === '.html') {
            const html = fs.readFileSync(file, 'utf8')

            const result = await htmlMinify(html, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true
            })

            fs.writeFileSync(file, result)
        }
    }

    if (fs.existsSync('./js')) {
        const jsFiles = fs.readdirSync('./js')

        for (const file of jsFiles) {
            if (!file.endsWith('.js')) continue

            const filePath = path.join('./js', file)
            const js = fs.readFileSync(filePath, 'utf8')

            let code = js

            if (file !== 'meow.js') {
                const minified = await minify(js, {
                    compress: true,
                    mangle: true
                })
                code = minified.code
            }

            const obfuscated = JavaScriptObfuscator.obfuscate(code, {
                compact: true,
                controlFlowFlattening: true,
                deadCodeInjection: true,
                stringArray: true,
                rotateStringArray: true,
                stringArrayEncoding: ['base64'],
                identifierNamesGenerator: 'hexadecimal',
                selfDefending: true
            })

            fs.writeFileSync(filePath, obfuscated.getObfuscatedCode())
        }
    }

    console.log('Build complete.')
}

build()
