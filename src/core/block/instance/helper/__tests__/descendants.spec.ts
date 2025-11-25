import { fetchBlockInstances } from '@/src/core/block/instance/helper/fetchers';
import { findBlockLastDescendant, findBlockDescendants } from '@/src/core/block/instance/helper/finders/descendants';

import type { BlockInstanceRecord, BlockInstance } from '@/src/core/block/instance/types/block';

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

test('fetchBlockChildren returns instances for children', () => {
  const parent = makeBlock('p', 'root', ['a', 'b']);
  const a = makeBlock('a', 'p');
  const b = makeBlock('b', 'p');

  const store: BlockInstanceRecord = { p: parent, a, b } as any;

  const res = fetchBlockInstances(parent.contentIDs, store);
  expect(res.success).toBe(true);
  if (!res.success) return;

  expect(res.data.map(d => d.id)).toEqual(['a', 'b']);
});

test('findBlockLastDescendant follows last-child chain', () => {
  const top = makeBlock('top', 'root', ['a']);
  const a = makeBlock('a', 'top', ['b']);
  const b = makeBlock('b', 'a');

  const store: BlockInstanceRecord = { top, a, b } as any;

  const r = findBlockLastDescendant(top, store);
  expect(r.status).toBe('found');
  if (r.status !== 'found') return;

  expect(r.data.id).toBe('b');
});

test('findBlockDescendants DFS ordering and nested children', () => {
  // top -> a -> [a1, a2 -> [a2a]]
  const top = makeBlock('top', 'root', ['a']);
  const a = makeBlock('a', 'top', ['a1', 'a2']);
  const a1 = makeBlock('a1', 'a');
  const a2 = makeBlock('a2', 'a', ['a2a']);
  const a2a = makeBlock('a2a', 'a2');

  const store: BlockInstanceRecord = { top, a, a1, a2, a2a } as any;

    const res = findBlockDescendants(top, store);
    expect(res.status).toBe('found');
    if (res.status !== 'found') return;

  // The traversal is LIFO (stack), so children are processed starting with
  // the last pushed child. With the given structure the expected DFS order
  // is ['a', 'a2', 'a2a', 'a1']
  expect(res.data.map(d => d.id)).toEqual(['a', 'a2', 'a2a', 'a1']);
});

test('findBlockDescendants handles cycles and includes revisited root in cycle', () => {
  // a -> b -> c -> a (cycle)
  const a = makeBlock('a', 'root', ['b']);
  const b = makeBlock('b', 'a', ['c']);
  const c = makeBlock('c', 'b', ['a']);

  const store: BlockInstanceRecord = { a, b, c } as any;

  const res = findBlockDescendants(a, store);
  expect(res.status).toBe('found');
  if (res.status !== 'found') return;

  // The collector will traverse b, c, then hit a which is not yet visited
  // so it will be included (preserves prior semantics).
  expect(res.data.map(d => d.id)).toEqual(['b', 'c', 'a']);
});

test('findBlockDescendants returns error when a child cannot be fetched', () => {
  const top = makeBlock('top', 'root', ['a']);
  // 'a' does not exist in the store
  const store: BlockInstanceRecord = { top } as any;

    const res = findBlockDescendants(top, store);
    expect(res.status).toBe('error');
    if (res.status !== 'error') return;

    expect(res.error).toMatch(/Failed to find descendants/);
  });
