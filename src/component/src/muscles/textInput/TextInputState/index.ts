/**
 * Copyright (c) Nicolas Gallagher. Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 * @flow
 */

/**
 * This class is responsible for coordinating the "focused" state for
 * TextInputs. All calls relating to the keyboard should be funneled through here
 */
const TextInputState = {
  /** Internal state */
  _currentlyFocusedNode: null as null | Object,

  /**
   * Returns the ID of the currently focused text field, if one exists If no
   * text field is focused it returns null
   */
  currentlyFocusedField(): null | Object {
    if (document.activeElement !== this._currentlyFocusedNode) {
      this._currentlyFocusedNode = null;
    }
    return this._currentlyFocusedNode;
  },
};

export default TextInputState;
