import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import tailwind from '../src/index'

/**
 * Tests
 */
it('generates the right CSS', () => {
  const input = fs.readFileSync(path.resolve(`${__dirname}/fixtures/tailwind-input.css`), 'utf8')

  return postcss([tailwind()])
    .process(input)
    .then(result => {
      const expected = fs.readFileSync(
        path.resolve(`${__dirname}/fixtures/tailwind-output.css`),
        'utf8'
      )

      expect(result.css).toBe(expected)
    })
})

it('does not add any CSS if no Tailwind features are used', () => {
  return postcss([tailwind()])
    .process('.foo { color: blue; }')
    .then(result => {
      expect(result.css).toMatchCss('.foo { color: blue; }')
    })
})

it('generates the right CSS with implicit screen utilities', () => {
  const input = fs.readFileSync(
    path.resolve(`${__dirname}/fixtures/tailwind-input-with-explicit-screen-utilities.css`),
    'utf8'
  )

  return postcss([tailwind()])
    .process(input)
    .then(result => {
      const expected = fs.readFileSync(
        path.resolve(`${__dirname}/fixtures/tailwind-output-with-explicit-screen-utilities.css`),
        'utf8'
      )

      expect(result.css).toBe(expected)
    })
})
