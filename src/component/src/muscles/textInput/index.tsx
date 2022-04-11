/* eslint-disable @typescript-eslint/naming-convention */
import classNames from "classnames";
import jss from "jss";
import * as React from "react";
import {
  composeRef,
  generateIndex,
  useElementLayout,
  useIsomorphicLayoutEffect,
} from "reactjs-view-core";
import { flattenStyle } from "../../atoms";
import { useThemes } from "../../molecules/text/styles";
import TextInputState from "./TextInputState";
import { TextInputProps } from "./types";

/** Determines whether a 'selection' prop differs from a node's existing selection state. */
const isSelectionStale = (
  node: { selectionEnd: any; selectionStart: any },
  selection: { start: any; end?: any },
) => {
  const { selectionEnd, selectionStart } = node;
  const { start, end } = selection;
  return start !== selectionStart || end !== selectionEnd;
};

/** Certain input types do no support 'selectSelectionRange' and will throw an error. */
const setSelection = (node: any, selection: { start: any; end?: any }) => {
  if (isSelectionStale(node, selection)) {
    const { start, end } = selection;
    try {
      node.setSelectionRange(start, end || start);
    } catch (e) {}
  }
};

// If an Input Method Editor is processing key input, the 'keyCode' is 229.
// https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
function isEventComposing(nativeEvent: any) {
  return nativeEvent.isComposing || nativeEvent.keyCode === 229;
}

const TextInput = React.forwardRef<HTMLElement, TextInputProps>(
  (
    {
      autoCapitalize = "sentences",
      autoComplete,
      autoCompleteType,
      autoCorrect = true,
      blurOnSubmit,
      clearTextOnFocus,
      dir,
      theme = "regular",
      lang,
      editable = true,
      keyboardType = "default",
      multiline = false,
      numberOfLines = 1,
      onBlur,
      onChange,
      onChangeText,
      onContentSizeChange,
      onFocus,
      onKeyPress,
      onLayout,
      onSelectionChange,
      onSubmitEditing,
      placeholderTextColor,
      returnKeyType,
      secureTextEntry = false,
      selection,
      selectTextOnFocus,
      spellCheck,
      className,
      style: styleProps,
      testID,
      ...rest
    },
    forwardedRef,
  ) => {
    let type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    let inputMode: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    const themes = useThemes();

    switch (keyboardType) {
      case "email-address":
        type = "email";
        break;
      case "number-pad":
      case "numeric":
        inputMode = "numeric";
        break;
      case "decimal-pad":
        inputMode = "decimal";
        break;
      case "phone-pad":
        type = "tel";
        break;
      case "search":
      case "web-search":
        type = "search";
        break;
      case "url":
        type = "url";
        break;
      default:
        type = "text";
    }

    if (secureTextEntry) {
      type = "password";
    }

    const dimensions = React.useRef({ height: null, width: null });
    const hostRef = React.useRef(null);

    const handleContentSizeChange = React.useCallback(
      (hostNode) => {
        if (multiline && onContentSizeChange && hostNode != null) {
          const newHeight = hostNode.scrollHeight;
          const newWidth = hostNode.scrollWidth;
          if (
            newHeight !== dimensions.current.height ||
            newWidth !== dimensions.current.width
          ) {
            dimensions.current.height = newHeight;
            dimensions.current.width = newWidth;
            onContentSizeChange({
              nativeEvent: {
                contentSize: {
                  height: dimensions.current.height,
                  width: dimensions.current.width,
                },
              },
            });
          }
        }
      },
      [multiline, onContentSizeChange],
    );

    const imperativeRef = React.useMemo(
      () => (hostNode: any) => {
        // TextInput needs to add more methods to the hostNode in addition to those
        // added by `usePlatformMethods`. This is temporarily until an API like
        // `TextInput.clear(hostRef)` is added to React Native.
        if (hostNode != null) {
          hostNode.clear = function () {
            if (hostNode != null) {
              hostNode.value = "";
            }
          };
          hostNode.isFocused = function () {
            return (
              hostNode != null &&
              TextInputState.currentlyFocusedField() === hostNode
            );
          };
          handleContentSizeChange(hostNode);
        }
      },
      [handleContentSizeChange],
    );

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
      TextInputState._currentlyFocusedNode = null;
      if (onBlur) {
        //@ts-ignore
        e.nativeEvent.text = e.target.value;
        onBlur(e);
      }
    }

    function handleChange(
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
      const hostNode = e.target;
      const text = hostNode.value;
      //@ts-ignore
      e.nativeEvent.text = text;
      handleContentSizeChange(hostNode);
      if (onChange) {
        onChange(e);
      }
      if (onChangeText) {
        onChangeText(text);
      }
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      const hostNode = e.target;
      if (onFocus) {
        //@ts-ignore
        e.nativeEvent.text = hostNode.value;
        onFocus(e);
      }
      if (hostNode != null) {
        TextInputState._currentlyFocusedNode = hostNode;
        if (clearTextOnFocus) {
          hostNode.value = "";
        }
        if (selectTextOnFocus) {
          // Safari requires selection to occur in a setTimeout
          setTimeout(() => {
            hostNode.select();
          }, 0);
        }
      }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      const hostNode = e.target;
      // Prevent key events bubbling (see #612)
      e.stopPropagation();

      const blurOnSubmitDefault = !multiline;
      const shouldBlurOnSubmit =
        blurOnSubmit == null ? blurOnSubmitDefault : blurOnSubmit;

      const nativeEvent = e.nativeEvent;
      const isComposing = isEventComposing(nativeEvent);

      if (onKeyPress) {
        onKeyPress(e);
      }

      if (
        e.key === "Enter" &&
        !e.shiftKey &&
        // Do not call submit if composition is occuring.
        !isComposing &&
        !e.isDefaultPrevented()
      ) {
        if ((blurOnSubmit || !multiline) && onSubmitEditing) {
          // prevent "Enter" from inserting a newline or submitting a form
          e.preventDefault();
          //@ts-ignore
          nativeEvent.text = e.target.value;
          onSubmitEditing(e);
        }
        if (shouldBlurOnSubmit && hostNode != null) {
          //@ts-ignore
          hostNode.blur();
        }
      }
    }

    const handleSelectionChange: React.DOMAttributes<HTMLInputElement>["onSelect"] =
      (e) => {
        if (onSelectionChange) {
          try {
            const node = e.target;
            const { selectionStart, selectionEnd } = node as any;
            //@ts-ignore
            e.nativeEvent.selection = {
              start: selectionStart,
              end: selectionEnd,
            };
            //@ts-ignore
            e.nativeEvent.text = e.target.value;
            onSelectionChange(e);
          } catch (e) {}
        }
      };

    useIsomorphicLayoutEffect(() => {
      const node = hostRef.current;
      if (node && selection) {
        setSelection(node, selection);
      }
      if (document.activeElement === node) {
        TextInputState._currentlyFocusedNode = node;
      }
    }, [hostRef, selection]);

    const style = flattenStyle([
      styleProps,
      //@ts-ignore
      !!placeholderTextColor && { placeholderTextColor },
    ]);

    useElementLayout(hostRef, onLayout);

    const supportedProps:
      | React.TextareaHTMLAttributes<HTMLTextAreaElement>
      | React.InputHTMLAttributes<HTMLInputElement> = rest;

    supportedProps.autoCapitalize = autoCapitalize;
    supportedProps.autoComplete = autoComplete || autoCompleteType || "on";
    supportedProps.autoCorrect = autoCorrect ? "on" : "off";
    supportedProps.className = classNames(
      classes.textinput,
      themes[`${theme}${lang ? `-${lang}` : ""}` as keyof typeof themes],
      className,
    );
    // 'auto' by default allows browsers to infer writing direction
    (supportedProps as any).enterKeyHint = returnKeyType;
    supportedProps.onBlur = handleBlur;
    supportedProps.onChange = handleChange;
    supportedProps.onFocus = handleFocus;
    supportedProps.onKeyDown = handleKeyDown;
    supportedProps.onSelect = handleSelectionChange;
    supportedProps.readOnly = !editable;
    // @ts-ignore
    supportedProps.rows = multiline ? numberOfLines : undefined;
    supportedProps.spellCheck = spellCheck != null ? spellCheck : autoCorrect;
    supportedProps.style = style;
    (supportedProps as React.InputHTMLAttributes<HTMLInputElement>).type = (
      multiline ? undefined : type
    ) as string;
    supportedProps.inputMode = inputMode;
    //@ts-ignore
    supportedProps["data-testid"] = testID;

    const setRef = composeRef(hostRef, imperativeRef, forwardedRef);

    return multiline ? (
      <textarea
        ref={setRef}
        {...(supportedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        ref={setRef}
        {...(supportedProps as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  },
);

TextInput.displayName = "TextInput";

const classes = jss
  .createStyleSheet(
    {
      textinput: {
        MozAppearance: "textfield",
        WebkitAppearance: "none",
        backgroundColor: "transparent",
        border: "0 solid black",
        borderRadius: 0,
        boxSizing: "border-box",
        fontSize: 14,
        margin: 0,
        padding: 0,
        resize: "none",
      },
    },
    {
      index: generateIndex("muscles", "coreModule"),
    },
  )
  .attach().classes;

export type { TextInputProps };
export { TextInput };
