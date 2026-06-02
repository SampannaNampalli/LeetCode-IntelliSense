// cpp_stl_b.js — MAIN world, document_idle
// Part B of C++ STL data: unordered_map, map, unordered_set, set,
//                          stack, queue, priority_queue, list
// Exports: window.CPP_STL_DATA_B

window.CPP_STL_DATA_B = {

  "unordered_map": {
    package: "std  (<unordered_map>)",
    kind: "class",
    description: "Hash map. O(1) average insert/lookup/erase. Keys are not stored in sorted order.",
    constructors: [
      { signature: "unordered_map()", desc: "Constructs an empty hash map." },
      { signature: "unordered_map(InputIt first, InputIt last)", desc: "Constructs from an iterator range of pairs." }
    ],
    methods: {
      "at":       [{ signature: "at(const K& key)", returns: "V&", desc: "Returns reference to value for key. Throws if key absent.", params: [{ name: "key", type: "const K&", desc: "Key to look up." }], throws: ["std::out_of_range — if key not found"] }],
      "find":     [{ signature: "find(const K& key)", returns: "iterator", desc: "Returns iterator to element with key, or end() if not found.", params: [{ name: "key", type: "const K&", desc: "Key to search for." }] }],
      "count":    [{ signature: "count(const K& key)", returns: "size_t", desc: "Returns 1 if key exists, 0 otherwise.", params: [{ name: "key", type: "const K&", desc: "Key." }] }],
      "contains": [{ signature: "contains(const K& key)", returns: "bool", desc: "Returns true if key is in the map (C++20).", params: [{ name: "key", type: "const K&", desc: "Key." }] }],
      "insert":   [{ signature: "insert({key, value})", returns: "pair<iterator,bool>", desc: "Inserts key-value pair. Returns iterator and bool indicating if inserted.", params: [{ name: "kv", type: "pair<K,V>", desc: "Key-value pair to insert." }] }],
      "emplace":  [{ signature: "emplace(K key, V value)", returns: "pair<iterator,bool>", desc: "Constructs element in-place. More efficient than insert.", params: [{ name: "key", type: "K", desc: "Key." }, { name: "value", type: "V", desc: "Value." }] }],
      "erase": [
        { signature: "erase(const K& key)", returns: "size_t", desc: "Erases element with key. Returns number erased (0 or 1).", params: [{ name: "key", type: "const K&", desc: "Key to erase." }] },
        { signature: "erase(iterator pos)", returns: "iterator", desc: "Erases element at iterator.", params: [{ name: "pos", type: "iterator", desc: "Position to erase." }] }
      ],
      "size":   [{ signature: "size()", returns: "size_t", desc: "Number of key-value pairs." }],
      "empty":  [{ signature: "empty()", returns: "bool", desc: "Returns true if the map is empty." }],
      "clear":  [{ signature: "clear()", returns: "void", desc: "Removes all key-value pairs." }],
      "begin":  [{ signature: "begin()", returns: "iterator", desc: "Iterator to the first element." }],
      "end":    [{ signature: "end()", returns: "iterator", desc: "Iterator past the last element." }],
      "swap":   [{ signature: "swap(unordered_map& other)", returns: "void", desc: "Swaps contents with other.", params: [{ name: "other", type: "unordered_map&", desc: "Map to swap with." }] }]
    }
  },

  "map": {
    package: "std  (<map>)",
    kind: "class",
    description: "Sorted associative container. O(log n) insert/lookup/erase. Keys stored in ascending order.",
    constructors: [
      { signature: "map()", desc: "Constructs an empty sorted map." },
      { signature: "map(InputIt first, InputIt last)", desc: "Constructs from an iterator range of pairs." }
    ],
    methods: {
      "at":          [{ signature: "at(const K& key)", returns: "V&", desc: "Returns reference to value. Throws if key absent.", params: [{ name: "key", type: "const K&", desc: "Key." }], throws: ["std::out_of_range"] }],
      "find":        [{ signature: "find(const K& key)", returns: "iterator", desc: "Returns iterator to element or end() if not found.", params: [{ name: "key", type: "const K&", desc: "Key." }] }],
      "count":       [{ signature: "count(const K& key)", returns: "size_t", desc: "Returns 1 if key exists, 0 otherwise.", params: [{ name: "key", type: "const K&", desc: "Key." }] }],
      "contains":    [{ signature: "contains(const K& key)", returns: "bool", desc: "Returns true if key exists (C++20).", params: [{ name: "key", type: "const K&", desc: "Key." }] }],
      "lower_bound": [{ signature: "lower_bound(const K& key)", returns: "iterator", desc: "Iterator to first element with key >= given key.", params: [{ name: "key", type: "const K&", desc: "Key." }] }],
      "upper_bound": [{ signature: "upper_bound(const K& key)", returns: "iterator", desc: "Iterator to first element with key > given key.", params: [{ name: "key", type: "const K&", desc: "Key." }] }],
      "insert":  [{ signature: "insert({key, value})", returns: "pair<iterator,bool>", desc: "Inserts key-value pair.", params: [{ name: "kv", type: "pair<K,V>", desc: "Key-value pair." }] }],
      "emplace": [{ signature: "emplace(K key, V value)", returns: "pair<iterator,bool>", desc: "Constructs in-place.", params: [{ name: "key", type: "K", desc: "Key." }, { name: "value", type: "V", desc: "Value." }] }],
      "erase": [
        { signature: "erase(const K& key)", returns: "size_t", desc: "Erases element by key.", params: [{ name: "key", type: "const K&", desc: "Key." }] },
        { signature: "erase(iterator pos)", returns: "iterator", desc: "Erases element at iterator.", params: [{ name: "pos", type: "iterator", desc: "Position." }] }
      ],
      "size":  [{ signature: "size()", returns: "size_t", desc: "Number of key-value pairs." }],
      "empty": [{ signature: "empty()", returns: "bool", desc: "Returns true if empty." }],
      "clear": [{ signature: "clear()", returns: "void", desc: "Removes all elements." }],
      "begin": [{ signature: "begin()", returns: "iterator", desc: "Iterator to first element (smallest key)." }],
      "end":   [{ signature: "end()", returns: "iterator", desc: "Iterator past last element." }],
      "rbegin":[{ signature: "rbegin()", returns: "reverse_iterator", desc: "Reverse iterator to largest key." }],
      "rend":  [{ signature: "rend()", returns: "reverse_iterator", desc: "Reverse iterator before smallest key." }]
    }
  },

  "unordered_set": {
    package: "std  (<unordered_set>)",
    kind: "class",
    description: "Hash set. O(1) average insert/lookup/erase. Elements are not in any particular order.",
    constructors: [
      { signature: "unordered_set()", desc: "Constructs an empty hash set." },
      { signature: "unordered_set(InputIt first, InputIt last)", desc: "Constructs from iterator range." }
    ],
    methods: {
      "insert":   [{ signature: "insert(const T& val)", returns: "pair<iterator,bool>", desc: "Inserts val. Returns iterator and bool (true if inserted).", params: [{ name: "val", type: "const T&", desc: "Value to insert." }] }],
      "emplace":  [{ signature: "emplace(T val)", returns: "pair<iterator,bool>", desc: "Constructs element in-place.", params: [{ name: "val", type: "T", desc: "Value." }] }],
      "find":     [{ signature: "find(const T& val)", returns: "iterator", desc: "Returns iterator to val, or end() if not found.", params: [{ name: "val", type: "const T&", desc: "Value to find." }] }],
      "count":    [{ signature: "count(const T& val)", returns: "size_t", desc: "Returns 1 if val is in the set, 0 otherwise.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "contains": [{ signature: "contains(const T& val)", returns: "bool", desc: "Returns true if val is in the set (C++20).", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "erase": [
        { signature: "erase(const T& val)", returns: "size_t", desc: "Erases val. Returns number erased.", params: [{ name: "val", type: "const T&", desc: "Value." }] },
        { signature: "erase(iterator pos)", returns: "iterator", desc: "Erases element at iterator.", params: [{ name: "pos", type: "iterator", desc: "Position." }] }
      ],
      "size":  [{ signature: "size()", returns: "size_t", desc: "Number of elements." }],
      "empty": [{ signature: "empty()", returns: "bool", desc: "Returns true if empty." }],
      "clear": [{ signature: "clear()", returns: "void", desc: "Removes all elements." }],
      "begin": [{ signature: "begin()", returns: "iterator", desc: "Iterator to first element." }],
      "end":   [{ signature: "end()", returns: "iterator", desc: "Iterator past last element." }]
    }
  },

  "set": {
    package: "std  (<set>)",
    kind: "class",
    description: "Sorted unique-element container. O(log n) insert/lookup/erase. Elements in ascending order.",
    constructors: [
      { signature: "set()", desc: "Constructs an empty sorted set." },
      { signature: "set(InputIt first, InputIt last)", desc: "Constructs from an iterator range." }
    ],
    methods: {
      "insert":      [{ signature: "insert(const T& val)", returns: "pair<iterator,bool>", desc: "Inserts val. No-op if already present.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "emplace":     [{ signature: "emplace(T val)", returns: "pair<iterator,bool>", desc: "Constructs in-place.", params: [{ name: "val", type: "T", desc: "Value." }] }],
      "find":        [{ signature: "find(const T& val)", returns: "iterator", desc: "Iterator to val, or end() if not found.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "count":       [{ signature: "count(const T& val)", returns: "size_t", desc: "Returns 1 if present, 0 otherwise.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "contains":    [{ signature: "contains(const T& val)", returns: "bool", desc: "Returns true if val is in the set (C++20).", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "lower_bound": [{ signature: "lower_bound(const T& val)", returns: "iterator", desc: "Iterator to first element >= val.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "upper_bound": [{ signature: "upper_bound(const T& val)", returns: "iterator", desc: "Iterator to first element > val.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "erase": [
        { signature: "erase(const T& val)", returns: "size_t", desc: "Erases val.", params: [{ name: "val", type: "const T&", desc: "Value." }] },
        { signature: "erase(iterator pos)", returns: "iterator", desc: "Erases element at iterator.", params: [{ name: "pos", type: "iterator", desc: "Position." }] }
      ],
      "size":  [{ signature: "size()", returns: "size_t", desc: "Number of elements." }],
      "empty": [{ signature: "empty()", returns: "bool", desc: "Returns true if empty." }],
      "clear": [{ signature: "clear()", returns: "void", desc: "Removes all elements." }],
      "begin": [{ signature: "begin()", returns: "iterator", desc: "Iterator to smallest element." }],
      "end":   [{ signature: "end()", returns: "iterator", desc: "Iterator past last element." }],
      "rbegin":[{ signature: "rbegin()", returns: "reverse_iterator", desc: "Reverse iterator to largest element." }],
      "rend":  [{ signature: "rend()", returns: "reverse_iterator", desc: "Reverse iterator before smallest element." }]
    }
  },

  "stack": {
    package: "std  (<stack>)",
    kind: "class",
    description: "LIFO container adaptor. By default uses deque as underlying container.",
    constructors: [
      { signature: "stack()", desc: "Constructs an empty stack." }
    ],
    methods: {
      "push":  [{ signature: "push(const T& val)", returns: "void", desc: "Pushes val onto the top.", params: [{ name: "val", type: "const T&", desc: "Value to push." }] }],
      "pop":   [{ signature: "pop()", returns: "void", desc: "Removes the top element. Does NOT return it." }],
      "top":   [{ signature: "top()", returns: "T&", desc: "Returns a reference to the top element without removing it." }],
      "empty": [{ signature: "empty()", returns: "bool", desc: "Returns true if the stack has no elements." }],
      "size":  [{ signature: "size()", returns: "size_t", desc: "Returns the number of elements." }]
    }
  },

  "queue": {
    package: "std  (<queue>)",
    kind: "class",
    description: "FIFO container adaptor. push at back, pop from front.",
    constructors: [
      { signature: "queue()", desc: "Constructs an empty queue." }
    ],
    methods: {
      "push":  [{ signature: "push(const T& val)", returns: "void", desc: "Enqueues val at the back.", params: [{ name: "val", type: "const T&", desc: "Value to enqueue." }] }],
      "pop":   [{ signature: "pop()", returns: "void", desc: "Removes the front element. Does NOT return it." }],
      "front": [{ signature: "front()", returns: "T&", desc: "Reference to the front (oldest) element." }],
      "back":  [{ signature: "back()", returns: "T&", desc: "Reference to the back (newest) element." }],
      "empty": [{ signature: "empty()", returns: "bool", desc: "Returns true if empty." }],
      "size":  [{ signature: "size()", returns: "size_t", desc: "Number of elements." }]
    }
  },

  "priority_queue": {
    package: "std  (<queue>)",
    kind: "class",
    description: "Max-heap by default. top() is always the largest element. Use greater<T> for min-heap.",
    constructors: [
      { signature: "priority_queue()", desc: "Max-heap. Largest element is at top." },
      { signature: "priority_queue(Compare cmp)", desc: "Custom comparator. Use greater<T> for min-heap." },
      { signature: "priority_queue(InputIt first, InputIt last)", desc: "Constructs from iterator range." }
    ],
    methods: {
      "push":  [{ signature: "push(const T& val)", returns: "void", desc: "Inserts val and re-heapifies. O(log n).", params: [{ name: "val", type: "const T&", desc: "Value to insert." }] }],
      "pop":   [{ signature: "pop()", returns: "void", desc: "Removes the top (max) element. O(log n)." }],
      "top":   [{ signature: "top()", returns: "const T&", desc: "Returns the top element (max by default) without removing it. O(1)." }],
      "empty": [{ signature: "empty()", returns: "bool", desc: "Returns true if the heap is empty." }],
      "size":  [{ signature: "size()", returns: "size_t", desc: "Number of elements in the heap." }]
    }
  },

  "list": {
    package: "std  (<list>)",
    kind: "class",
    description: "Doubly-linked list. O(1) insert/erase anywhere given an iterator; no random access.",
    constructors: [
      { signature: "list()", desc: "Constructs an empty list." },
      { signature: "list(size_t n, const T& val)", desc: "Constructs with n copies of val." }
    ],
    methods: {
      "push_back":  [{ signature: "push_back(const T& val)", returns: "void", desc: "Appends val to the back.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "pop_back":   [{ signature: "pop_back()", returns: "void", desc: "Removes the last element." }],
      "push_front": [{ signature: "push_front(const T& val)", returns: "void", desc: "Prepends val to the front.", params: [{ name: "val", type: "const T&", desc: "Value." }] }],
      "pop_front":  [{ signature: "pop_front()", returns: "void", desc: "Removes the first element." }],
      "front": [{ signature: "front()", returns: "T&", desc: "Reference to the first element." }],
      "back":  [{ signature: "back()", returns: "T&", desc: "Reference to the last element." }],
      "size":  [{ signature: "size()", returns: "size_t", desc: "Number of elements." }],
      "empty": [{ signature: "empty()", returns: "bool", desc: "Returns true if empty." }],
      "clear": [{ signature: "clear()", returns: "void", desc: "Removes all elements." }],
      "insert":[{ signature: "insert(iterator pos, const T& val)", returns: "iterator", desc: "Inserts val before pos. O(1).", params: [{ name: "pos", type: "iterator", desc: "Position." }, { name: "val", type: "const T&", desc: "Value." }] }],
      "erase": [{ signature: "erase(iterator pos)", returns: "iterator", desc: "Erases element at pos. O(1).", params: [{ name: "pos", type: "iterator", desc: "Position." }] }],
      "sort":    [{ signature: "sort()", returns: "void", desc: "Sorts elements in ascending order. O(n log n)." }],
      "reverse": [{ signature: "reverse()", returns: "void", desc: "Reverses the order of elements. O(n)." }],
      "unique":  [{ signature: "unique()", returns: "void", desc: "Removes consecutive duplicates." }],
      "begin":   [{ signature: "begin()", returns: "iterator", desc: "Iterator to first element." }],
      "end":     [{ signature: "end()", returns: "iterator", desc: "Iterator past last element." }]
    }
  }

};
