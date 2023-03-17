const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './fixtures/example_1.html'), 'utf8');
import {parseContent} from "../src/core/parseContent";


test("parse content", () => {
  document.body.innerHTML = html
  const data = document.querySelectorAll(".group.w-full")
  const result = parseContent(data)
  if (result[0].content.value instanceof Array) {
    expect(result[0].content.value.length).toEqual(9)
  }
})
