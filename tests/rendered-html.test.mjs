import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the finished portfolio and its conversion content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Alexis Krenz \| Diseño y Desarrollo Web/);
  assert.match(html, /Tu idea merece/);
  assert.match(html, /Trabajo real/);
  assert.match(html, /Thompson Medical System/);
  assert.match(html, /Preguntas frecuentes/);
  assert.match(html, /wa\.me\/541151078475/);
  assert.doesNotMatch(html, /codex-preview|Building your site|Your site is taking shape/i);
});

test("includes social preview and project images", async () => {
  await Promise.all([
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/favicon.svg", import.meta.url)),
    access(new URL("../public/projects/danna.png", import.meta.url)),
    access(new URL("../public/projects/lilian.png", import.meta.url)),
    access(new URL("../public/projects/thompson-home.png", import.meta.url)),
  ]);
});
