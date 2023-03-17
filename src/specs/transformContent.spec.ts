import {buildMd} from "../core/markdownTransform";

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './fixtures/example_1.html'), 'utf8');
import {parseContent} from "../core/parseContent";


test("parse content and transform to md", () => {
  document.body.innerHTML = html
  const data = document.querySelectorAll(".group.w-full")
  const result = parseContent(data)
  const md = buildMd(result[0].content,{dialogType: "bot", level: 0, parentElement: ["root"]})
  expect(md.length).toBeGreaterThan(0)
})
