// cpp_stl_a.js — MAIN world, document_idle
// Part A of C++ STL data: vector, string, deque, pair
// Exports: window.CPP_STL_DATA_A

window.CPP_STL_DATA_A = {

  "vector": {
    package: "std  (<vector>)",
    kind: "class",
    description: "Dynamic array. O(1) random access and amortised O(1) push_back. Contiguous storage.",
    constructors: [
      { signature: "vector()", desc: "Constructs an empty vector." },
      { signature: "vector(size_t n, const T& val)", desc: "Constructs with n copies of val." },
      { signature: "vector(InputIt first, InputIt last)", desc: "Constructs from iterator range." }
    ],
    methods: {
      "push_back":  [{ signature: "push_back(const T& val)", returns: "void", desc: "Appends val to the end. Amortised O(1).", params: [{ name: "val", type: "const T&", desc: "Value to append." }] }],
      "pop_back":   [{ signature: "pop_back()", returns: "void", desc: "Removes the last element. O(1)." }],
      "size":       [{ signature: "size()", returns: "size_t", desc: "Returns the number of elements." }],
      "empty":      [{ signature: "empty()", returns: "bool", desc: "Returns true if the vector has no elements." }],
      "front":      [{ signature: "front()", returns: "T&", desc: "Returns a reference to the first element." }],
      "back":       [{ signature: "back()", returns: "T&", desc: "Returns a reference to the last element." }],
      "at":         [{ signature: "at(size_t idx)", returns: "T&", desc: "Returns element at idx with bounds checking.", params: [{ name: "idx", type: "size_t", desc: "Index." }], throws: ["std::out_of_range — if idx >= size()"] }],
      "begin":      [{ signature: "begin()", returns: "iterator", desc: "Iterator to the first element." }],
      "end":        [{ signature: "end()", returns: "iterator", desc: "Iterator past the last element." }],
      "rbegin":     [{ signature: "rbegin()", returns: "reverse_iterator", desc: "Reverse iterator to the last element." }],
      "rend":       [{ signature: "rend()", returns: "reverse_iterator", desc: "Reverse iterator before the first element." }],
      "clear":      [{ signature: "clear()", returns: "void", desc: "Erases all elements. Size becomes 0." }],
      "capacity":   [{ signature: "capacity()", returns: "size_t", desc: "Number of elements storable without reallocation." }],
      "reserve":    [{ signature: "reserve(size_t n)", returns: "void", desc: "Reserves storage for at least n elements.", params: [{ name: "n", type: "size_t", desc: "Minimum capacity." }] }],
      "resize": [
        { signature: "resize(size_t count)", returns: "void", desc: "Resizes to count elements; new elements are value-initialised.", params: [{ name: "count", type: "size_t", desc: "New size." }] },
        { signature: "resize(size_t count, const T& val)", returns: "void", desc: "Resizes to count; new elements filled with val.", params: [{ name: "count", type: "size_t", desc: "New size." }, { name: "val", type: "const T&", desc: "Fill value." }] }
      ],
      "insert": [
        { signature: "insert(iterator pos, const T& val)", returns: "iterator", desc: "Inserts val before pos. O(n).", params: [{ name: "pos", type: "iterator", desc: "Insert position." }, { name: "val", type: "const T&", desc: "Value." }] },
        { signature: "insert(iterator pos, size_t count, const T& val)", returns: "iterator", desc: "Inserts count copies of val before pos.", params: [{ name: "pos", type: "iterator", desc: "Insert position." }, { name: "count", type: "size_t", desc: "Count." }, { name: "val", type: "const T&", desc: "Value." }] }
      ],
      "erase": [
        { signature: "erase(iterator pos)", returns: "iterator", desc: "Erases element at pos. Returns iterator to next.", params: [{ name: "pos", type: "iterator", desc: "Element to erase." }] },
        { signature: "erase(iterator first, iterator last)", returns: "iterator", desc: "Erases elements in [first, last).", params: [{ name: "first", type: "iterator", desc: "Start." }, { name: "last", type: "iterator", desc: "End (exclusive)." }] }
      ],
      "assign": [{ signature: "assign(size_t count, const T& val)", returns: "void", desc: "Replaces content with count copies of val.", params: [{ name: "count", type: "size_t", desc: "Count." }, { name: "val", type: "const T&", desc: "Value." }] }],
      "swap":   [{ signature: "swap(vector& other)", returns: "void", desc: "Swaps contents with other in O(1).", params: [{ name: "other", type: "vector&", desc: "Vector to swap with." }] }]
    }
  },

  "string": {
    package: "std  (<string>)",
    kind: "class",
    description: "Mutable sequence of characters with value semantics and a rich manipulation API.",
    constructors: [
      { signature: "string()", desc: "Constructs an empty string." },
      { signature: "string(const char* s)", desc: "Constructs from a C-string." },
      { signature: "string(size_t count, char c)", desc: "Constructs a string of count copies of c." },
      { signature: "string(const string& str, size_t pos, size_t len)", desc: "Constructs a substring." }
    ],
    fields: {
      "npos": { type: "static const size_t", desc: "Sentinel value returned by find() when no match. Equal to size_t(-1)." }
    },
    methods: {
      "size":    [{ signature: "size()", returns: "size_t", desc: "Returns the number of characters." }],
      "length":  [{ signature: "length()", returns: "size_t", desc: "Same as size(). Returns character count." }],
      "empty":   [{ signature: "empty()", returns: "bool", desc: "Returns true if the string is empty." }],
      "front":   [{ signature: "front()", returns: "char&", desc: "Reference to the first character." }],
      "back":    [{ signature: "back()", returns: "char&", desc: "Reference to the last character." }],
      "at":      [{ signature: "at(size_t pos)", returns: "char&", desc: "Character at pos with bounds checking.", params: [{ name: "pos", type: "size_t", desc: "Index." }], throws: ["std::out_of_range"] }],
      "c_str":   [{ signature: "c_str()", returns: "const char*", desc: "Returns null-terminated C-string. Valid until string is modified." }],
      "data":    [{ signature: "data()", returns: "char*", desc: "Returns pointer to the underlying character array." }],
      "clear":   [{ signature: "clear()", returns: "void", desc: "Erases all characters. Size becomes 0." }],
      "push_back": [{ signature: "push_back(char c)", returns: "void", desc: "Appends character c.", params: [{ name: "c", type: "char", desc: "Character to append." }] }],
      "pop_back":  [{ signature: "pop_back()", returns: "void", desc: "Removes the last character." }],
      "append": [
        { signature: "append(const string& str)", returns: "string&", desc: "Appends str to the end.", params: [{ name: "str", type: "const string&", desc: "String to append." }] },
        { signature: "append(size_t count, char c)", returns: "string&", desc: "Appends count copies of c.", params: [{ name: "count", type: "size_t", desc: "Count." }, { name: "c", type: "char", desc: "Character." }] }
      ],
      "substr": [{ signature: "substr(size_t pos, size_t len)", returns: "string", desc: "Returns substring at pos of length len (npos = to end).", params: [{ name: "pos", type: "size_t", desc: "Start position." }, { name: "len", type: "size_t", desc: "Max length (default npos)." }] }],
      "find": [
        { signature: "find(const string& str, size_t pos)", returns: "size_t", desc: "First occurrence of str from pos. Returns npos if not found.", params: [{ name: "str", type: "const string&", desc: "Pattern." }, { name: "pos", type: "size_t", desc: "Start position (default 0)." }] },
        { signature: "find(char c, size_t pos)", returns: "size_t", desc: "First occurrence of c from pos.", params: [{ name: "c", type: "char", desc: "Character." }, { name: "pos", type: "size_t", desc: "Start position (default 0)." }] }
      ],
      "rfind": [
        { signature: "rfind(const string& str, size_t pos)", returns: "size_t", desc: "Last occurrence of str, searching backward from pos.", params: [{ name: "str", type: "const string&", desc: "Pattern." }, { name: "pos", type: "size_t", desc: "Start (default npos)." }] },
        { signature: "rfind(char c, size_t pos)", returns: "size_t", desc: "Last occurrence of c.", params: [{ name: "c", type: "char", desc: "Character." }, { name: "pos", type: "size_t", desc: "Start (default npos)." }] }
      ],
      "find_first_of":     [{ signature: "find_first_of(const string& chars, size_t pos)", returns: "size_t", desc: "Finds first char in string matching any char in chars.", params: [{ name: "chars", type: "const string&", desc: "Character set." }, { name: "pos", type: "size_t", desc: "Start (default 0)." }] }],
      "find_first_not_of": [{ signature: "find_first_not_of(const string& chars, size_t pos)", returns: "size_t", desc: "Finds first char NOT in chars.", params: [{ name: "chars", type: "const string&", desc: "Character set." }, { name: "pos", type: "size_t", desc: "Start (default 0)." }] }],
      "find_last_of":      [{ signature: "find_last_of(const string& chars, size_t pos)", returns: "size_t", desc: "Finds last char matching any in chars.", params: [{ name: "chars", type: "const string&", desc: "Character set." }, { name: "pos", type: "size_t", desc: "Start (default npos)." }] }],
      "insert": [
        { signature: "insert(size_t pos, const string& str)", returns: "string&", desc: "Inserts str before position pos.", params: [{ name: "pos", type: "size_t", desc: "Position." }, { name: "str", type: "const string&", desc: "String to insert." }] },
        { signature: "insert(size_t pos, size_t count, char c)", returns: "string&", desc: "Inserts count copies of c at pos.", params: [{ name: "pos", type: "size_t", desc: "Position." }, { name: "count", type: "size_t", desc: "Count." }, { name: "c", type: "char", desc: "Character." }] }
      ],
      "erase":   [{ signature: "erase(size_t pos, size_t len)", returns: "string&", desc: "Erases len chars from pos.", params: [{ name: "pos", type: "size_t", desc: "Start (default 0)." }, { name: "len", type: "size_t", desc: "Count (default npos)." }] }],
      "replace": [{ signature: "replace(size_t pos, size_t len, const string& str)", returns: "string&", desc: "Replaces len chars at pos with str.", params: [{ name: "pos", type: "size_t", desc: "Start." }, { name: "len", type: "size_t", desc: "Chars to replace." }, { name: "str", type: "const string&", desc: "Replacement." }] }],
      "compare": [{ signature: "compare(const string& str)", returns: "int", desc: "Lexicographic comparison. 0=equal, <0=less, >0=greater.", params: [{ name: "str", type: "const string&", desc: "String to compare." }] }],
      "begin":   [{ signature: "begin()", returns: "iterator", desc: "Iterator to first character." }],
      "end":     [{ signature: "end()", returns: "iterator", desc: "Iterator past last character." }],
      "rbegin":  [{ signature: "rbegin()", returns: "reverse_iterator", desc: "Reverse iterator to last character." }],
      "rend":    [{ signature: "rend()", returns: "reverse_iterator", desc: "Reverse iterator before first character." }],
      "resize":  [{ signature: "resize(size_t count, char c)", returns: "void", desc: "Resizes string; new chars initialised to c.", params: [{ name: "count", type: "size_t", desc: "New size." }, { name: "c", type: "char", desc: "Fill char (default '\\0')." }] }],
      "swap":    [{ signature: "swap(string& other)", returns: "void", desc: "Swaps content with other in O(1).", params: [{ name: "other", type: "string&", desc: "String to swap with." }] }]
    }
  },

  "deque": {
    package: "std  (<deque>)",
    kind: "class",
    description: "Double-ended queue. O(1) push/pop at both ends and O(1) random access.",
    constructors: [
      { signature: "deque()", desc: "Constructs an empty deque." },
      { signature: "deque(size_t n, const T& val)", desc: "Constructs with n copies of val." }
    ],
    methods: {
      "push_back":  [{ signature: "push_back(const T& val)", returns: "void", desc: "Appends val to the back.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "pop_back":   [{ signature: "pop_back()", returns: "void", desc: "Removes the last element." }],
      "push_front": [{ signature: "push_front(const T& val)", returns: "void", desc: "Prepends val to the front.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "pop_front":  [{ signature: "pop_front()", returns: "void", desc: "Removes the first element." }],
      "front":  [{ signature: "front()", returns: "T&", desc: "Reference to the first element." }],
      "back":   [{ signature: "back()", returns: "T&", desc: "Reference to the last element." }],
      "at":     [{ signature: "at(size_t idx)", returns: "T&", desc: "Element at idx with bounds checking.", params: [{ name: "idx", type: "size_t", desc: "Index." }], throws: ["std::out_of_range"] }],
      "size":   [{ signature: "size()", returns: "size_t", desc: "Number of elements." }],
      "empty":  [{ signature: "empty()", returns: "bool", desc: "Returns true if empty." }],
      "clear":  [{ signature: "clear()", returns: "void", desc: "Erases all elements." }],
      "begin":  [{ signature: "begin()", returns: "iterator", desc: "Iterator to first element." }],
      "end":    [{ signature: "end()", returns: "iterator", desc: "Iterator past last element." }],
      "insert": [{ signature: "insert(iterator pos, const T& val)", returns: "iterator", desc: "Inserts val before pos.", params: [{ name: "pos", type: "iterator", desc: "Position." }, { name: "val", type: "const T&", desc: "Value." }] }],
      "erase":  [{ signature: "erase(iterator pos)", returns: "iterator", desc: "Erases element at pos.", params: [{ name: "pos", type: "iterator", desc: "Element to erase." }] }]
    }
  },

  "pair": {
    package: "std  (<utility>)",
    kind: "class",
    description: "Holds two heterogeneous values. Access via .first and .second.",
    constructors: [
      { signature: "pair()", desc: "Default constructor; value-initialises both members." },
      { signature: "pair(const T1& a, const T2& b)", desc: "Constructs with first=a, second=b." }
    ],
    fields: {
      "first":  { type: "T1", desc: "The first element of the pair." },
      "second": { type: "T2", desc: "The second element of the pair." }
    },
    methods: {
      "swap": [{ signature: "swap(pair& other)", returns: "void", desc: "Swaps first and second with other.", params: [{ name: "other", type: "pair&", desc: "Pair to swap with." }] }]
    }
  }

};
