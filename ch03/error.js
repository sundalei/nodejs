'use strict';

function c () {
  b();
}

function b () {
  a();
}

function a () {
  try {
  setTimeout(function () {
    throw new Error('here');
  }, 10);
  } catch (e) {console.err(e);}
}

c();
