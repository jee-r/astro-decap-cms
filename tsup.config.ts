import { defineConfig } from 'tsup'
import fs from 'node:fs'
import { join } from 'node:path'

const dir = (...path: string[]) => join(import.meta.dirname, ...path)
const decapCmsSource = dir('./node_modules/decap-cms-core/index.d.ts')
const typesFile = dir('./dist/index.d.ts')

export default defineConfig({
	entry: {
		'index': './src/index.ts',
		'identity-widget': './src/identity-widget.ts',
		'vite-plugin': './src/vite/plugin.ts',
	},
	format: 'esm',
	splitting: true,
	clean: true,
	dts: {
		entry: {
			'index': './src/index.ts'
		},
	}
})

// bundle CmsConfig from decap-cms-core
process.on('beforeExit', (code) => {
	if (code !== 0) return

  const types = fs.readFileSync(decapCmsSource, { encoding: 'utf-8' }) +
		'\n\n' +
		'declare module "@miseya/astro-decap-cms" {\n' +
		fs.readFileSync(typesFile, { encoding: 'utf-8' }) +
		'\n}\n'

	fs.writeFileSync(typesFile, types, { encoding: 'utf-8' })
})