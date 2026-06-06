// py_builtins.js — MAIN world, document_idle
// Python 3 built-in sequence and mapping types.
// Exports: window.PY_BUILTINS_DATA

window.PY_BUILTINS_DATA = {

  "list": {
    package: "builtins",
    kind: "class",
    description: "Mutable ordered sequence. O(1) append/pop from end; O(n) insert/remove from middle. Supports indexing, slicing, and iteration.",
    constructors: [
      { signature: "list()", desc: "Creates an empty list." },
      { signature: "list(iterable)", desc: "Creates a list from any iterable (string, tuple, range, etc.)." }
    ],
    methods: {
      "append":  [{ signature: "append(x)", returns: "None", desc: "Adds x to the end of the list. O(1) amortised.", params: [{ name: "x", type: "object", desc: "Element to append." }] }],
      "extend":  [{ signature: "extend(iterable)", returns: "None", desc: "Appends all elements of iterable to the end.", params: [{ name: "iterable", type: "Iterable", desc: "Source of elements." }] }],
      "insert":  [{ signature: "insert(i, x)", returns: "None", desc: "Inserts x before index i. O(n).", params: [{ name: "i", type: "int", desc: "Index to insert before." }, { name: "x", type: "object", desc: "Element to insert." }] }],
      "remove":  [{ signature: "remove(x)", returns: "None", desc: "Removes the first occurrence of x. Raises ValueError if not found.", params: [{ name: "x", type: "object", desc: "Value to remove." }], throws: ["ValueError — if x is not in the list"] }],
      "pop": [
        { signature: "pop()", returns: "object", desc: "Removes and returns the last element. O(1)." },
        { signature: "pop(i)", returns: "object", desc: "Removes and returns element at index i. O(n).", params: [{ name: "i", type: "int", desc: "Index to pop." }], throws: ["IndexError — if list is empty or index out of range"] }
      ],
      "index":   [{ signature: "index(x, start, end)", returns: "int", desc: "Returns first index of x in [start, end). Raises ValueError if not found.", params: [{ name: "x", type: "object", desc: "Value to find." }, { name: "start", type: "int", desc: "Start index (default 0)." }, { name: "end", type: "int", desc: "End index (default len)." }], throws: ["ValueError — if x is not present"] }],
      "count":   [{ signature: "count(x)", returns: "int", desc: "Returns the number of times x appears in the list.", params: [{ name: "x", type: "object", desc: "Value to count." }] }],
      "sort": [
        { signature: "sort()", returns: "None", desc: "Sorts the list in place in ascending order. O(n log n). Stable sort." },
        { signature: "sort(key, reverse)", returns: "None", desc: "Sorts with optional key function and/or descending order.", params: [{ name: "key", type: "callable", desc: "Function of one argument (default None)." }, { name: "reverse", type: "bool", desc: "If True, sort descending (default False)." }] }
      ],
      "reverse": [{ signature: "reverse()", returns: "None", desc: "Reverses the list in place. O(n)." }],
      "clear":   [{ signature: "clear()", returns: "None", desc: "Removes all elements. Equivalent to del lst[:]." }],
      "copy":    [{ signature: "copy()", returns: "list", desc: "Returns a shallow copy of the list." }]
    }
  },

  "dict": {
    package: "builtins",
    kind: "class",
    description: "Mutable hash map. O(1) average get/set/delete. Keys must be hashable. Preserves insertion order (Python 3.7+).",
    constructors: [
      { signature: "dict()", desc: "Creates an empty dictionary." },
      { signature: "dict(**kwargs)", desc: "Creates a dict from keyword arguments: dict(a=1, b=2)." },
      { signature: "dict(mapping)", desc: "Creates a dict from a mapping object." },
      { signature: "dict(iterable)", desc: "Creates from an iterable of (key, value) pairs." }
    ],
    methods: {
      "get":        [{ signature: "get(key, default)", returns: "object", desc: "Returns value for key, or default if key absent (never raises KeyError).", params: [{ name: "key", type: "object", desc: "Key to look up." }, { name: "default", type: "object", desc: "Value returned if key absent (default None)." }] }],
      "keys":       [{ signature: "keys()", returns: "dict_keys", desc: "Returns a view of all keys." }],
      "values":     [{ signature: "values()", returns: "dict_values", desc: "Returns a view of all values." }],
      "items":      [{ signature: "items()", returns: "dict_items", desc: "Returns a view of all (key, value) pairs." }],
      "update": [
        { signature: "update(other)", returns: "None", desc: "Updates with key-value pairs from other dict.", params: [{ name: "other", type: "dict", desc: "Source dictionary." }] },
        { signature: "update(**kwargs)", returns: "None", desc: "Updates with keyword arguments: d.update(a=1)." }
      ],
      "pop": [
        { signature: "pop(key)", returns: "object", desc: "Removes and returns value for key. Raises KeyError if absent.", params: [{ name: "key", type: "object", desc: "Key to remove." }], throws: ["KeyError — if key not found and no default given"] },
        { signature: "pop(key, default)", returns: "object", desc: "Removes key; returns default if not found instead of raising.", params: [{ name: "key", type: "object", desc: "Key." }, { name: "default", type: "object", desc: "Fallback value." }] }
      ],
      "setdefault": [{ signature: "setdefault(key, default)", returns: "object", desc: "Returns value for key. If absent, inserts key with default and returns default.", params: [{ name: "key", type: "object", desc: "Key." }, { name: "default", type: "object", desc: "Default value (default None)." }] }],
      "clear":      [{ signature: "clear()", returns: "None", desc: "Removes all key-value pairs." }],
      "copy":       [{ signature: "copy()", returns: "dict", desc: "Returns a shallow copy." }],
      "fromkeys":   [{ signature: "fromkeys(iterable, value)", returns: "dict", desc: "Class method. Creates dict with keys from iterable, all mapped to value.", params: [{ name: "iterable", type: "Iterable", desc: "Key source." }, { name: "value", type: "object", desc: "Default value (default None)." }] }]
    }
  },

  "set": {
    package: "builtins",
    kind: "class",
    description: "Mutable unordered collection of unique hashable elements. O(1) average add/remove/contains.",
    constructors: [
      { signature: "set()", desc: "Creates an empty set." },
      { signature: "set(iterable)", desc: "Creates a set from an iterable, removing duplicates." }
    ],
    methods: {
      "add":                  [{ signature: "add(elem)", returns: "None", desc: "Adds elem to the set. No-op if already present.", params: [{ name: "elem", type: "object", desc: "Hashable element to add." }] }],
      "remove":               [{ signature: "remove(elem)", returns: "None", desc: "Removes elem. Raises KeyError if not present.", params: [{ name: "elem", type: "object", desc: "Element to remove." }], throws: ["KeyError — if elem not in set"] }],
      "discard":              [{ signature: "discard(elem)", returns: "None", desc: "Removes elem if present; does nothing if absent. Never raises.", params: [{ name: "elem", type: "object", desc: "Element to discard." }] }],
      "pop":                  [{ signature: "pop()", returns: "object", desc: "Removes and returns an arbitrary element. Raises KeyError if empty.", throws: ["KeyError — if set is empty"] }],
      "clear":                [{ signature: "clear()", returns: "None", desc: "Removes all elements." }],
      "union":                [{ signature: "union(*others)", returns: "set", desc: "Returns a new set with elements from this set and all others.", params: [{ name: "*others", type: "set", desc: "One or more sets to union with." }] }],
      "intersection":         [{ signature: "intersection(*others)", returns: "set", desc: "Returns a new set with elements common to this set and all others.", params: [{ name: "*others", type: "set", desc: "Sets to intersect with." }] }],
      "difference":           [{ signature: "difference(*others)", returns: "set", desc: "Returns elements in this set but not in others.", params: [{ name: "*others", type: "set", desc: "Sets to subtract." }] }],
      "symmetric_difference": [{ signature: "symmetric_difference(other)", returns: "set", desc: "Returns elements in either set but not both.", params: [{ name: "other", type: "set", desc: "Other set." }] }],
      "issubset":             [{ signature: "issubset(other)", returns: "bool", desc: "Returns True if every element of this set is in other.", params: [{ name: "other", type: "set", desc: "Superset candidate." }] }],
      "issuperset":           [{ signature: "issuperset(other)", returns: "bool", desc: "Returns True if this set contains every element of other.", params: [{ name: "other", type: "set", desc: "Subset candidate." }] }],
      "isdisjoint":           [{ signature: "isdisjoint(other)", returns: "bool", desc: "Returns True if this set and other share no elements.", params: [{ name: "other", type: "set", desc: "Other set." }] }],
      "update":               [{ signature: "update(*others)", returns: "None", desc: "Adds all elements from others to this set (in-place union).", params: [{ name: "*others", type: "set", desc: "Sources." }] }],
      "intersection_update":  [{ signature: "intersection_update(*others)", returns: "None", desc: "Keeps only elements found in this set AND all others.", params: [{ name: "*others", type: "set", desc: "Filter sets." }] }],
      "difference_update":    [{ signature: "difference_update(*others)", returns: "None", desc: "Removes all elements found in others from this set.", params: [{ name: "*others", type: "set", desc: "Sets to subtract." }] }],
      "copy":                 [{ signature: "copy()", returns: "set", desc: "Returns a shallow copy of the set." }]
    }
  },

  "str": {
    package: "builtins",
    kind: "class",
    description: "Immutable sequence of Unicode characters. All methods return new strings; the original is never modified.",
    constructors: [
      { signature: "str(object)", desc: "Returns the string representation of object." }
    ],
    methods: {
      "upper":      [{ signature: "upper()", returns: "str", desc: "Returns a copy with all characters uppercased." }],
      "lower":      [{ signature: "lower()", returns: "str", desc: "Returns a copy with all characters lowercased." }],
      "strip":      [{ signature: "strip(chars)", returns: "str", desc: "Returns copy with leading and trailing chars removed (default: whitespace).", params: [{ name: "chars", type: "str", desc: "Characters to strip (default whitespace)." }] }],
      "lstrip":     [{ signature: "lstrip(chars)", returns: "str", desc: "Strips leading characters.", params: [{ name: "chars", type: "str", desc: "Characters to strip." }] }],
      "rstrip":     [{ signature: "rstrip(chars)", returns: "str", desc: "Strips trailing characters.", params: [{ name: "chars", type: "str", desc: "Characters to strip." }] }],
      "split": [
        { signature: "split(sep, maxsplit)", returns: "list", desc: "Splits on sep (default: any whitespace) and returns a list.", params: [{ name: "sep", type: "str", desc: "Delimiter (default None = any whitespace)." }, { name: "maxsplit", type: "int", desc: "Max splits (default -1 = unlimited)." }] }
      ],
      "join":       [{ signature: "join(iterable)", returns: "str", desc: "Joins elements of iterable with this string as separator.", params: [{ name: "iterable", type: "Iterable[str]", desc: "Strings to join." }] }],
      "replace":    [{ signature: "replace(old, new, count)", returns: "str", desc: "Returns copy with occurrences of old replaced by new.", params: [{ name: "old", type: "str", desc: "Substring to replace." }, { name: "new", type: "str", desc: "Replacement." }, { name: "count", type: "int", desc: "Max replacements (default all)." }] }],
      "find":       [{ signature: "find(sub, start, end)", returns: "int", desc: "Returns lowest index of sub in [start, end), or -1 if not found.", params: [{ name: "sub", type: "str", desc: "Substring to find." }, { name: "start", type: "int", desc: "Start index." }, { name: "end", type: "int", desc: "End index." }] }],
      "rfind":      [{ signature: "rfind(sub, start, end)", returns: "int", desc: "Returns highest index of sub, or -1 if not found.", params: [{ name: "sub", type: "str", desc: "Substring." }, { name: "start", type: "int", desc: "Start." }, { name: "end", type: "int", desc: "End." }] }],
      "index":      [{ signature: "index(sub, start, end)", returns: "int", desc: "Like find() but raises ValueError if sub not found.", params: [{ name: "sub", type: "str", desc: "Substring." }, { name: "start", type: "int", desc: "Start." }, { name: "end", type: "int", desc: "End." }], throws: ["ValueError — if sub not found"] }],
      "count":      [{ signature: "count(sub, start, end)", returns: "int", desc: "Returns number of non-overlapping occurrences of sub.", params: [{ name: "sub", type: "str", desc: "Substring." }, { name: "start", type: "int", desc: "Start." }, { name: "end", type: "int", desc: "End." }] }],
      "startswith": [{ signature: "startswith(prefix, start, end)", returns: "bool", desc: "Returns True if string starts with prefix.", params: [{ name: "prefix", type: "str | tuple", desc: "Prefix or tuple of prefixes." }, { name: "start", type: "int", desc: "Start index." }, { name: "end", type: "int", desc: "End index." }] }],
      "endswith":   [{ signature: "endswith(suffix, start, end)", returns: "bool", desc: "Returns True if string ends with suffix.", params: [{ name: "suffix", type: "str | tuple", desc: "Suffix or tuple of suffixes." }, { name: "start", type: "int", desc: "Start." }, { name: "end", type: "int", desc: "End." }] }],
      "isdigit":    [{ signature: "isdigit()", returns: "bool", desc: "Returns True if all characters are digit characters and string is non-empty." }],
      "isalpha":    [{ signature: "isalpha()", returns: "bool", desc: "Returns True if all characters are alphabetic and string is non-empty." }],
      "isalnum":    [{ signature: "isalnum()", returns: "bool", desc: "Returns True if all characters are alphanumeric and string is non-empty." }],
      "isspace":    [{ signature: "isspace()", returns: "bool", desc: "Returns True if all characters are whitespace and string is non-empty." }],
      "islower":    [{ signature: "islower()", returns: "bool", desc: "Returns True if all cased characters are lowercase." }],
      "isupper":    [{ signature: "isupper()", returns: "bool", desc: "Returns True if all cased characters are uppercase." }],
      "capitalize": [{ signature: "capitalize()", returns: "str", desc: "Returns copy with first character capitalised, rest lowercased." }],
      "title":      [{ signature: "title()", returns: "str", desc: "Returns title-cased copy (first letter of each word uppercased)." }],
      "zfill":      [{ signature: "zfill(width)", returns: "str", desc: "Pads with leading zeros to at least width characters.", params: [{ name: "width", type: "int", desc: "Minimum total width." }] }],
      "format":     [{ signature: "format(*args, **kwargs)", returns: "str", desc: "Formats the string using {} placeholders.", params: [{ name: "*args", type: "object", desc: "Positional values." }, { name: "**kwargs", type: "object", desc: "Named values." }] }],
      "encode":     [{ signature: "encode(encoding, errors)", returns: "bytes", desc: "Encodes to bytes using encoding (default 'utf-8').", params: [{ name: "encoding", type: "str", desc: "Encoding name (default 'utf-8')." }, { name: "errors", type: "str", desc: "Error handler (default 'strict')." }] }],
      "splitlines": [{ signature: "splitlines(keepends)", returns: "list", desc: "Splits on line boundaries ('\\n', '\\r\\n', etc.).", params: [{ name: "keepends", type: "bool", desc: "If True, line endings are included (default False)." }] }]
    }
  },

  "tuple": {
    package: "builtins",
    kind: "class",
    description: "Immutable ordered sequence. Use as a hashable, fixed-size record. Supports indexing and slicing.",
    constructors: [
      { signature: "tuple()", desc: "Creates an empty tuple." },
      { signature: "tuple(iterable)", desc: "Creates a tuple from an iterable." }
    ],
    methods: {
      "index": [{ signature: "index(x, start, end)", returns: "int", desc: "Returns first index of x in [start, end).", params: [{ name: "x", type: "object", desc: "Value to find." }, { name: "start", type: "int", desc: "Start (default 0)." }, { name: "end", type: "int", desc: "End (default len)." }], throws: ["ValueError — if x not found"] }],
      "count": [{ signature: "count(x)", returns: "int", desc: "Returns number of occurrences of x.", params: [{ name: "x", type: "object", desc: "Value to count." }] }]
    }
  },

  "int": {
    package: "builtins",
    kind: "class",
    description: "Arbitrary-precision integer. Supports all arithmetic operators. Use float('inf') for infinity.",
    constructors: [
      { signature: "int(x, base)", desc: "Converts x to integer. If x is a string, base specifies numeric base (default 10)." }
    ],
    fields: {
      "real": { type: "int", desc: "The real part of this number (returns self)." },
      "imag": { type: "int", desc: "The imaginary part (always 0 for int)." }
    },
    methods: {
      "bit_length": [{ signature: "bit_length()", returns: "int", desc: "Returns the number of bits needed to represent the integer (excluding sign and leading zeros)." }],
      "bit_count":  [{ signature: "bit_count()", returns: "int", desc: "Returns the number of 1-bits in the binary representation (Python 3.10+)." }],
      "to_bytes":   [{ signature: "to_bytes(length, byteorder)", returns: "bytes", desc: "Returns integer as a bytes object.", params: [{ name: "length", type: "int", desc: "Number of bytes." }, { name: "byteorder", type: "str", desc: "'big' or 'little'." }] }]
    }
  }

};
