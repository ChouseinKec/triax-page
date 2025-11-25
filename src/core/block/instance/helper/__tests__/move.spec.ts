import { moveBlock } from '@/src/core/block/instance/helper/operations/move';

import type { BlockInstance, BlockInstanceRecord } from '@/src/core/block/instance/types/block';

function makeBlock(id: string, parentID: string, contentIDs: string[] = []): BlockInstance {
  return {
    id,
    parentID,
    type: 'test',
    tag: 'div',
    contentIDs,
    attributes: {},
    styles: {},
  };
}

test('move within same parent (reorder)', () => {
  const parent = makeBlock('parent', 'root', ['a', 'b', 'c']);
  const a = makeBlock('a', 'parent');
  const b = makeBlock('b', 'parent');
  const c = makeBlock('c', 'parent');

  const blocks: BlockInstanceRecord = {
    parent,
    a,
    b,
    c,
  } as any;

  const result = moveBlock(b, parent, blocks, 0);
  expect(result.success).toBe(true);
  if (!result.success) return;

  const newParent = result.data['parent'];
  expect(newParent.contentIDs).toEqual(['b', 'a', 'c']);
  expect(result.data['b'].parentID).toBe('parent');
});

test('move across parents', () => {
  const p1 = makeBlock('p1', 'root', ['a', 'b', 'c']);
  const a = makeBlock('a', 'p1');
  const b = makeBlock('b', 'p1');
  const c = makeBlock('c', 'p1');

  const p2 = makeBlock('p2', 'root', ['d', 'e']);
  const d = makeBlock('d', 'p2');
  const e = makeBlock('e', 'p2');

  const blocks: BlockInstanceRecord = { p1, a, b, c, p2, d, e } as any;

  // move 'b' into p2 at index 1 using targetIsParent true
  const result = moveBlock(b, p2, blocks, 1);
  expect(result.success).toBe(true);
  if (!result.success) return;

  const newP1 = result.data['p1'];
  const newP2 = result.data['p2'];

  expect(newP1.contentIDs).toEqual(['a', 'c']);
  expect(newP2.contentIDs).toEqual(['d', 'b', 'e']);
  expect(result.data['b'].parentID).toBe('p2');
});

test('move to same index (no-op style) within same parent', () => {
  const parent = makeBlock('parent', 'root', ['a', 'b', 'c']);
  const a = makeBlock('a', 'parent');
  const b = makeBlock('b', 'parent');
  const c = makeBlock('c', 'parent');

  const blocks: BlockInstanceRecord = { parent, a, b, c } as any;

  const result = moveBlock(b, parent, blocks, 1);
  expect(result.success).toBe(true);
  if (!result.success) return;

  const newParent = result.data['parent'];
  // moving 'b' to index 1 (its original index) should preserve order
  expect(newParent.contentIDs).toEqual(['a', 'b', 'c']);
});
