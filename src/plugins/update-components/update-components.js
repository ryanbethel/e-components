import { rmSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url';
import { join, basename, dirname  } from 'path'
import { globSync } from 'glob'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectDir = join(__dirname, '../../..')
const srcDir = join(projectDir, '/src/component-parts')

const files = [...globSync(join(srcDir, '*.mjs'))]
const allComponents = files.map(file => basename(file).replace('.mjs', ''))


export async function updateComponent(tagName){
  const file = join(srcDir,tagName+'.mjs')  
  const component = (await import(file)).default  
  if (!existsSync(join(projectDir,'/dist'))) {
    mkdirSync(join(projectDir,'/dist'))
  }
  if (!existsSync(join(projectDir,'/dist/elements-html'))) {
    mkdirSync(join(projectDir,'/dist/elements-html'))
  }
  if (!existsSync(join(projectDir,'/dist/components'))) {
    mkdirSync(join(projectDir,'/dist/components'))
  }
  if (!existsSync(join(projectDir,'/dist/elements-mjs'))) {
    mkdirSync(join(projectDir,'/dist/elements-mjs'))
  }

  if (component.elementHTML) {
    writeFileSync(join(projectDir,`/dist/elements-html/${tagName}.html`),component.elementHTML,'utf8')
  } else { 
    try { rmSync(join(projectDir,`/dist/elements-html/${tagName}.html`)) } catch(e) {}
  }

  if (component.elementFunctionString) {
    writeFileSync(join(projectDir,`/dist/elements-mjs/${tagName}.mjs`),component.elementFunctionString,'utf8')
  } else { 
    try { rmSync(join(projectDir,`/dist/elements-mjs/${tagName}.mjs`)) } catch(e) {}
  }

  if (component.componentFunctionString) {
    writeFileSync(join(projectDir,`/dist/components/${tagName}.mjs`),component.componentFunctionString,'utf8')
  } else { 
    try { rmSync(join(projectDir,`/dist/components/${tagName}.mjs`)) } catch(e) {}
  }

}

export async function updateAll(){
  await Promise.all(allComponents.map(async tagName=> {
    return updateComponent(tagName)
  }))
}


