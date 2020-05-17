/** @jsx jsx */

import { getHtmlDocument } from '__test-utils__/getHtmlDocument';
import { jsx } from '__test-utils__/jsx';
import { htmlDeserialize } from 'deserializers';
import { ACTION_ITEM, ActionItemPlugin } from 'elements/action-item';
import { BlockquotePlugin } from 'elements/blockquote';
import { CodePlugin } from 'elements/code';
import { HeadingPlugin } from 'elements/heading';
import { ImagePlugin } from 'elements/image';
import { LinkPlugin } from 'elements/link';
import { ListPlugin } from 'elements/list';
import { MENTION, MentionPlugin } from 'elements/mention';
import { ParagraphPlugin } from 'elements/paragraph';
import { TablePlugin } from 'elements/table';
import { VideoPlugin } from 'elements/video';
import { deserializeBold } from 'marks/bold/deserializeBold';
import { deserializeHighlight } from 'marks/highlight/deserializeHighlight';
import { deserializeInlineCode } from 'marks/inline-code/deserializeInlineCode';
import { deserializeItalic } from 'marks/italic/deserializeItalic';
import { deserializeStrikethrough } from 'marks/strikethrough/deserializeStrikethrough';
import { deserializeSubscript } from 'marks/subscript/deserializeSubscript';
import { deserializeSuperscript } from 'marks/superscript/deserializeSuperscript';
import { deserializeUnderline } from 'marks/underline/deserializeUnderline';
import { SearchHighlightPlugin } from 'search-highlight';
import { SoftBreakPlugin } from 'soft-break';

const textTags = [
  '<span>span</span>',
  '<strong>strong</strong>',
  '<span style="font-weight: 600">style</span>',
  '<i>i</i>',
  '<em>em</em>',
  '<span style="font-style: italic">style</span>',
  '<u>u</u>',
  '<span style="text-decoration: underline">style</span>',
  '<del>del</del>',
  '<s>s</s>',
  '<span style="text-decoration: line-through">style</span>',
  '<code>code</code>',
  '<kbd>kbd</kbd>',
  '<sub>sub</sub>',
  '<sup>sup</sup>',
];

const inlineTags = [
  '<a href="http://localhost:3000">a</a>',
  `<span data-slate-type=${MENTION} data-slate-character="zbeyens" />`,
];

const elementTags = [
  '<pre><code>code</code></pre>',
  '<ul><li><p>ul-li-p</p></li></ul>',
  '<ol><li><p>ol-li-p</p></li></ol>',
  '<img alt="" src="https://i.imgur.com/removed.png" />',
  '<table><tr><td>table</td></tr></table>',
  `<div data-slate-type=${ACTION_ITEM} data-slate-checked="true">checked</div>`,
  `<div data-slate-type=${ACTION_ITEM} data-slate-checked="false">unchecked</div>`,
  `<iframe src="https://player.vimeo.com/video/26689853" />`,
];

const html = `<html><body><p>${textTags.join('')}</p><p>${inlineTags.join(
  ''
)}</p>${elementTags.join('')}</body></html>`;

const input1 = [
  BlockquotePlugin(),
  ActionItemPlugin(),
  HeadingPlugin({ levels: 1 }),
  ImagePlugin(),
  LinkPlugin(),
  ListPlugin(),
  MentionPlugin(),
  ParagraphPlugin(),
  CodePlugin(),
  TablePlugin(),
  VideoPlugin(),
  SearchHighlightPlugin(),
  SoftBreakPlugin(),
  { deserialize: deserializeBold() },
  { deserialize: deserializeHighlight() },
  { deserialize: deserializeInlineCode() },
  { deserialize: deserializeItalic() },
  { deserialize: deserializeStrikethrough() },
  { deserialize: deserializeSubscript() },
  { deserialize: deserializeSuperscript() },
  { deserialize: deserializeUnderline() },
];
const input2 = getHtmlDocument(html).body;

const output = (
  <editor>
    <hp>
      <htext>span</htext>
      <htext bold>strong</htext>
      <htext bold>style</htext>
      <htext italic>i</htext>
      <htext italic>em</htext>
      <htext italic>style</htext>
      <htext underline>u</htext>
      <htext underline>style</htext>
      <htext strikethrough>del</htext>
      <htext strikethrough>s</htext>
      <htext strikethrough>style</htext>
      <htext code>code</htext>
      <htext code>kbd</htext>
      <htext SUBSCRIPT>sub</htext>
      <htext SUPERSCRIPT>sup</htext>
    </hp>
    <hp>
      <ha url="http://localhost:3000">a</ha>
      <hmention character="zbeyens" />
    </hp>
    <hcode>
      <htext>code</htext>
    </hcode>
    <hul>
      <hli>
        <hp>ul-li-p</hp>
      </hli>
    </hul>
    <hol>
      <hli>
        <hp>ol-li-p</hp>
      </hli>
    </hol>
    <himg url="https://i.imgur.com/removed.png" />
    <htable>
      <htr>
        <htd>table</htd>
      </htr>
    </htable>
    <hactionitem checked>checked</hactionitem>
    <hactionitem checked={false}>unchecked</hactionitem>
    <hvideo url="https://player.vimeo.com/video/26689853">
      {'</body></html>'}
    </hvideo>
  </editor>
) as any;

it('should be', () => {
  expect(htmlDeserialize(input1)(input2)).toEqual(output.children);
});
