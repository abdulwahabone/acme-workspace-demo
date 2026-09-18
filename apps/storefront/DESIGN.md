# Storefront design contract

This describes what the storefront actually does today. It covers
`apps/storefront` only; the backoffice and the docs site have their own looks
and are not documented.

## Where the values live

Cross-app values (colour, spacing, radius, type scale) come from
`packages/ui/tokens.css` as `--acme-*` custom properties. The storefront adds a
small set of `--sf-*` aliases at the top of `src/styles.css` for the handful of
roles it uses often. Nothing else invents a colour or a spacing value.

## Palette

| Role | Token | Value |
| --- | --- | --- |
| Accent, buttons and marks | `--acme-color-brand-500` | `#0284c7` |
| Accent on hover, links | `--acme-color-brand-700` | `#075985` |
| Tinted panels, art backgrounds | `--acme-color-brand-100` | `#e0f2fe` |
| Headings | `--acme-color-ink` | `#0f172a` |
| Body text | `--acme-color-ink-muted` | `#56637a` |
| Borders and rules | `--acme-color-line` | `#dfe4ec` |
| Page background | `--acme-color-surface` | `#ffffff` |
| Quiet panels (summary, steps, footer) | `--acme-color-canvas` | `#f5f7fa` |
| In stock | `--acme-color-positive` | `#047857` |
| Out of stock | `--acme-color-critical` | `#b91c1c` |

Status colours are for status only. They never appear as decoration.

## Type

System sans (`--acme-font-sans`), body at 16px with a 1.65 line height.

| Use | Size |
| --- | --- |
| Hero title | `--acme-text-2xl` (40px) |
| Page and product titles | `--acme-text-xl` (28px) |
| Section headings, card prices | `--acme-text-lg` (20px) |
| Body | `--acme-text-md` (16px) |
| Secondary text, taglines, table cells | `--acme-text-sm` (14px) |
| Eyebrows and labels | `--acme-text-xs` (12px), uppercase, 0.08em tracking |

Headings are 700 with `-0.01em` tracking. Only eyebrows and table headers are
uppercase.

## Spacing

The 4px scale from the tokens. Page gutters are `--acme-space-5` (24px), the
space between cards in a grid is `--acme-space-5`, and a page's vertical
padding is `--acme-space-7` (48px). The hero is the one exception at
`--acme-space-8` (64px), because it sits directly under the header.

## Shape

- Cards, tiles, the summary panel and the large art panels: `--acme-radius-lg`
  (16px).
- Buttons, selects, the stepper and small art panels: `--acme-radius-md` (8px).
- The basket count and the category chips: `--acme-radius-pill`.

Borders are always 1px `--acme-color-line`. Elevation is only used on hover
(`--acme-shadow-md`); nothing is raised at rest.

## Components

**Buttons.** One `.button` base with `--acme-space-3`/`--acme-space-5` padding.
Two variants: `--primary` (filled accent, white text) and `--ghost` (white,
1px border). `--block` makes it full width inside a card or the summary panel.
Disabled buttons go grey with `not-allowed`; they are never hidden, because
"Out of stock" and "Checkout is off" are things the page should say out loud.

**Product cards.** Tinted art panel on top, body in the middle, action pinned to
the bottom so buttons line up across a row of different card heights. The whole
card lifts with a shadow on hover; the art and the name are both links to the
product.

**Forms and controls.** Native `select` and `button` elements, restyled but not
replaced. Every interactive element gets the shared `--acme-focus-ring` on
`:focus-visible` and nothing removes an outline without putting one back.

**Tables.** Used once, in the basket. Uppercase 12px column headers, 1px row
rules, prices in tabular numerals so the column aligns.

## Layout

A single 1120px column, centred, with 24px gutters. Grids are three columns on
desktop, two below 900px, one below 620px. The product detail and the basket
drop from two columns to one at 900px.

## Pictures

There are no image files. Every mark, product picture and icon is inline SVG in
`src/components/art.jsx` or in the page that uses it, drawn with `currentColor`
so the CSS decides the colour. No remote fonts, no CDN, no tracking.
