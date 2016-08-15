///<reference path="../../typings/index.d.ts" />

'use strict';

import { assert } from 'chai';
import { Demo, Demo2 } from '../ts/demo';

describe('Demoのテスト', () => {
  it('名前を取得する', () => {
    let demoClass = new Demo('TSHiYK');
    let name = demoClass.getName();
    assert.equal(name, 'TSHiYK');
  });
});

describe('Demo2のテスト', () => {

  var demo2 = new Demo2();

  it('名前を取得する', () => {
    let name = demo2.getName();
    assert.equal(name, 'demo');
  });

  it('名前を設定する', () => {
    demo2.setName('TSHiYK');
    let name = demo2.getName();
    assert.equal(name, 'TSHiYK');
  });
});
