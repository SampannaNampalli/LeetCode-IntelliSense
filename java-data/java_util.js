/**
 * java_util.js — MAIN world data
 * Defines window.JAVA_UTIL_DATA with signatures for java.util classes.
 */
window.JAVA_UTIL_DATA = {

  // ─── ArrayList ────────────────────────────────────────────────────────────
  "ArrayList": {
    package: "java.util",
    kind: "class",
    description: "Resizable-array implementation of the List interface. Permits all elements, including null. Provides O(1) random access and amortized O(1) appends.",
    constructors: [
      { signature: "ArrayList()", desc: "Constructs an empty list with an initial capacity of 10." },
      { signature: "ArrayList(int initialCapacity)", desc: "Constructs an empty list with the specified initial capacity." },
      { signature: "ArrayList(Collection<? extends E> c)", desc: "Constructs a list containing the elements of the specified collection." }
    ],
    methods: {
      "add": [
        { signature: "add(E e)", returns: "boolean", returnsDesc: "true (as specified by Collection.add(E)).", params: [{ name: "e", type: "E", desc: "Element to be appended to this list." }], desc: "Appends the specified element to the end of this list." },
        { signature: "add(int index, E element)", returns: "void", returnsDesc: "", params: [{ name: "index", type: "int", desc: "Index at which the element is to be inserted." }, { name: "element", type: "E", desc: "Element to be inserted." }], desc: "Inserts the specified element at the specified position in this list.", throws: ["IndexOutOfBoundsException — if index is out of range"] }
      ],
      "addAll": [
        { signature: "addAll(Collection<? extends E> c)", returns: "boolean", returnsDesc: "true if this list changed as a result of the call.", params: [{ name: "c", type: "Collection<? extends E>", desc: "Collection containing elements to be added to this list." }], desc: "Appends all of the elements in the specified collection to the end of this list." },
        { signature: "addAll(int index, Collection<? extends E> c)", returns: "boolean", returnsDesc: "true if this list changed as a result of the call.", params: [{ name: "index", type: "int", desc: "Index at which to insert the first element from the specified collection." }, { name: "c", type: "Collection<? extends E>", desc: "Collection containing elements to be added." }], desc: "Inserts all of the elements in the specified collection into this list, starting at the specified position." }
      ],
      "get": [{ signature: "get(int index)", returns: "E", returnsDesc: "The element at the specified position.", params: [{ name: "index", type: "int", desc: "Index of the element to return." }], desc: "Returns the element at the specified position in this list.", throws: ["IndexOutOfBoundsException — if index is out of range"] }],
      "set": [{ signature: "set(int index, E element)", returns: "E", returnsDesc: "The element previously at the specified position.", params: [{ name: "index", type: "int", desc: "Index of the element to replace." }, { name: "element", type: "E", desc: "Element to be stored at the specified position." }], desc: "Replaces the element at the specified position in this list with the specified element.", throws: ["IndexOutOfBoundsException — if index is out of range"] }],
      "remove": [
        { signature: "remove(int index)", returns: "E", returnsDesc: "The element that was removed from the list.", params: [{ name: "index", type: "int", desc: "The index of the element to be removed." }], desc: "Removes the element at the specified position in this list.", throws: ["IndexOutOfBoundsException — if index is out of range"] },
        { signature: "remove(Object o)", returns: "boolean", returnsDesc: "true if this list contained the specified element.", params: [{ name: "o", type: "Object", desc: "Element to be removed from this list, if present." }], desc: "Removes the first occurrence of the specified element from this list." }
      ],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of elements in this list.", params: [], desc: "Returns the number of elements in this list." }],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if this list contains no elements.", params: [], desc: "Returns true if this list contains no elements." }],
      "contains": [{ signature: "contains(Object o)", returns: "boolean", returnsDesc: "true if this list contains the specified element.", params: [{ name: "o", type: "Object", desc: "Element whose presence in this list is to be tested." }], desc: "Returns true if this list contains the specified element." }],
      "indexOf": [{ signature: "indexOf(Object o)", returns: "int", returnsDesc: "The index of the first occurrence, or -1.", params: [{ name: "o", type: "Object", desc: "Element to search for." }], desc: "Returns the index of the first occurrence of the specified element in this list, or -1 if not found." }],
      "lastIndexOf": [{ signature: "lastIndexOf(Object o)", returns: "int", returnsDesc: "The index of the last occurrence, or -1.", params: [{ name: "o", type: "Object", desc: "Element to search for." }], desc: "Returns the index of the last occurrence of the specified element in this list, or -1 if not found." }],
      "clear": [{ signature: "clear()", returns: "void", returnsDesc: "", params: [], desc: "Removes all of the elements from this list." }],
      "toArray": [
        { signature: "toArray()", returns: "Object[]", returnsDesc: "An array containing all elements in this list in proper sequence.", params: [], desc: "Returns an array containing all of the elements in this list in proper sequence." },
        { signature: "toArray(T[] a)", returns: "T[]", returnsDesc: "An array containing all elements; the runtime type is that of the specified array.", params: [{ name: "a", type: "T[]", desc: "The array into which the elements are stored." }], desc: "Returns an array containing all of the elements in this list in proper sequence; the runtime type matches the specified array." }
      ],
      "subList": [{ signature: "subList(int fromIndex, int toIndex)", returns: "List<E>", returnsDesc: "A view of the specified range within this list.", params: [{ name: "fromIndex", type: "int", desc: "Low endpoint (inclusive) of the subList." }, { name: "toIndex", type: "int", desc: "High endpoint (exclusive) of the subList." }], desc: "Returns a view of the portion of this list between fromIndex (inclusive) and toIndex (exclusive).", throws: ["IndexOutOfBoundsException — if an endpoint index is out of range", "IllegalArgumentException — if fromIndex > toIndex"] }],
      "sort": [{ signature: "sort(Comparator<? super E> c)", returns: "void", returnsDesc: "", params: [{ name: "c", type: "Comparator<? super E>", desc: "The Comparator used to compare list elements. null for natural ordering." }], desc: "Sorts this list according to the order induced by the specified Comparator." }],
      "iterator": [{ signature: "iterator()", returns: "Iterator<E>", returnsDesc: "An iterator over the elements in this list in proper sequence.", params: [], desc: "Returns an iterator over the elements in this list in proper sequence." }],
      "listIterator": [
        { signature: "listIterator()", returns: "ListIterator<E>", returnsDesc: "A list iterator over the elements in this list.", params: [], desc: "Returns a list iterator over the elements in this list (in proper sequence)." },
        { signature: "listIterator(int index)", returns: "ListIterator<E>", returnsDesc: "A list iterator starting at the specified position.", params: [{ name: "index", type: "int", desc: "Index of the first element to be returned." }], desc: "Returns a list iterator starting at the specified position in this list." }
      ],
      "ensureCapacity": [{ signature: "ensureCapacity(int minCapacity)", returns: "void", returnsDesc: "", params: [{ name: "minCapacity", type: "int", desc: "The desired minimum capacity." }], desc: "Increases the capacity of this ArrayList instance, if necessary, to ensure at least the minimum capacity." }],
      "trimToSize": [{ signature: "trimToSize()", returns: "void", returnsDesc: "", params: [], desc: "Trims the capacity of this ArrayList instance to be the list's current size." }],
      "forEach": [{ signature: "forEach(Consumer<? super E> action)", returns: "void", returnsDesc: "", params: [{ name: "action", type: "Consumer<? super E>", desc: "The action to be performed for each element." }], desc: "Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception." }]
    }
  },

  // ─── LinkedList ───────────────────────────────────────────────────────────
  "LinkedList": {
    package: "java.util",
    kind: "class",
    description: "Doubly-linked list implementation of List and Deque interfaces. Permits all elements including null. O(1) add/remove at ends, O(n) indexed access.",
    constructors: [
      { signature: "LinkedList()", desc: "Constructs an empty list." },
      { signature: "LinkedList(Collection<? extends E> c)", desc: "Constructs a list containing the elements of the specified collection." }
    ],
    methods: {
      "add": [
        { signature: "add(E e)", returns: "boolean", returnsDesc: "true (as per Collection.add).", params: [{ name: "e", type: "E", desc: "Element to be appended." }], desc: "Appends the specified element to the end of this list." },
        { signature: "add(int index, E element)", returns: "void", returnsDesc: "", params: [{ name: "index", type: "int", desc: "Index at which the element is to be inserted." }, { name: "element", type: "E", desc: "Element to be inserted." }], desc: "Inserts the specified element at the specified position in this list." }
      ],
      "addFirst": [{ signature: "addFirst(E e)", returns: "void", returnsDesc: "", params: [{ name: "e", type: "E", desc: "The element to add." }], desc: "Inserts the specified element at the beginning of this list." }],
      "addLast": [{ signature: "addLast(E e)", returns: "void", returnsDesc: "", params: [{ name: "e", type: "E", desc: "The element to add." }], desc: "Appends the specified element to the end of this list." }],
      "get": [{ signature: "get(int index)", returns: "E", returnsDesc: "The element at the specified position.", params: [{ name: "index", type: "int", desc: "Index of the element to return." }], desc: "Returns the element at the specified position in this list.", throws: ["IndexOutOfBoundsException — if index is out of range"] }],
      "getFirst": [{ signature: "getFirst()", returns: "E", returnsDesc: "The first element in this list.", params: [], desc: "Returns the first element in this list.", throws: ["NoSuchElementException — if this list is empty"] }],
      "getLast": [{ signature: "getLast()", returns: "E", returnsDesc: "The last element in this list.", params: [], desc: "Returns the last element in this list.", throws: ["NoSuchElementException — if this list is empty"] }],
      "remove": [
        { signature: "remove()", returns: "E", returnsDesc: "The head (first element) of this list.", params: [], desc: "Retrieves and removes the head (first element) of this list.", throws: ["NoSuchElementException — if this list is empty"] },
        { signature: "remove(int index)", returns: "E", returnsDesc: "The element previously at the specified position.", params: [{ name: "index", type: "int", desc: "The index of the element to be removed." }], desc: "Removes the element at the specified position in this list.", throws: ["IndexOutOfBoundsException — if index is out of range"] },
        { signature: "remove(Object o)", returns: "boolean", returnsDesc: "true if this list contained the specified element.", params: [{ name: "o", type: "Object", desc: "Element to be removed, if present." }], desc: "Removes the first occurrence of the specified element from this list." }
      ],
      "removeFirst": [{ signature: "removeFirst()", returns: "E", returnsDesc: "The first element from this list.", params: [], desc: "Removes and returns the first element from this list.", throws: ["NoSuchElementException — if this list is empty"] }],
      "removeLast": [{ signature: "removeLast()", returns: "E", returnsDesc: "The last element from this list.", params: [], desc: "Removes and returns the last element from this list.", throws: ["NoSuchElementException — if this list is empty"] }],
      "peek": [{ signature: "peek()", returns: "E", returnsDesc: "The head of this list, or null if this list is empty.", params: [], desc: "Retrieves, but does not remove, the head (first element) of this list." }],
      "peekFirst": [{ signature: "peekFirst()", returns: "E", returnsDesc: "The first element of this list, or null if empty.", params: [], desc: "Retrieves, but does not remove, the first element of this list, or returns null if empty." }],
      "peekLast": [{ signature: "peekLast()", returns: "E", returnsDesc: "The last element of this list, or null if empty.", params: [], desc: "Retrieves, but does not remove, the last element of this list, or returns null if empty." }],
      "poll": [{ signature: "poll()", returns: "E", returnsDesc: "The head of this list, or null if empty.", params: [], desc: "Retrieves and removes the head (first element) of this list." }],
      "pollFirst": [{ signature: "pollFirst()", returns: "E", returnsDesc: "The first element of this list, or null if empty.", params: [], desc: "Retrieves and removes the first element of this list, or returns null if empty." }],
      "pollLast": [{ signature: "pollLast()", returns: "E", returnsDesc: "The last element of this list, or null if empty.", params: [], desc: "Retrieves and removes the last element of this list, or returns null if empty." }],
      "offer": [{ signature: "offer(E e)", returns: "boolean", returnsDesc: "true (as specified by Queue.offer(E)).", params: [{ name: "e", type: "E", desc: "The element to add." }], desc: "Adds the specified element as the tail (last element) of this list." }],
      "offerFirst": [{ signature: "offerFirst(E e)", returns: "boolean", returnsDesc: "true (as specified by Deque.offerFirst).", params: [{ name: "e", type: "E", desc: "The element to insert at the front." }], desc: "Inserts the specified element at the front of this list." }],
      "offerLast": [{ signature: "offerLast(E e)", returns: "boolean", returnsDesc: "true (as specified by Deque.offerLast).", params: [{ name: "e", type: "E", desc: "The element to insert at the end." }], desc: "Inserts the specified element at the end of this list." }],
      "push": [{ signature: "push(E e)", returns: "void", returnsDesc: "", params: [{ name: "e", type: "E", desc: "The element to push." }], desc: "Pushes an element onto the stack represented by this list (equivalent to addFirst)." }],
      "pop": [{ signature: "pop()", returns: "E", returnsDesc: "The element at the front of this list (the top of the stack).", params: [], desc: "Pops an element from the stack represented by this list (equivalent to removeFirst).", throws: ["NoSuchElementException — if this list is empty"] }],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of elements in this list.", params: [], desc: "Returns the number of elements in this list." }],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if this list contains no elements.", params: [], desc: "Returns true if this list contains no elements." }],
      "contains": [{ signature: "contains(Object o)", returns: "boolean", returnsDesc: "true if this list contains the specified element.", params: [{ name: "o", type: "Object", desc: "Element whose presence is to be tested." }], desc: "Returns true if this list contains the specified element." }],
      "clear": [{ signature: "clear()", returns: "void", returnsDesc: "", params: [], desc: "Removes all of the elements from this list." }],
      "set": [{ signature: "set(int index, E element)", returns: "E", returnsDesc: "The element previously at the specified position.", params: [{ name: "index", type: "int", desc: "Index of the element to replace." }, { name: "element", type: "E", desc: "Element to be stored at the specified position." }], desc: "Replaces the element at the specified position in this list.", throws: ["IndexOutOfBoundsException — if index is out of range"] }],
      "toArray": [{ signature: "toArray()", returns: "Object[]", returnsDesc: "An array containing all elements.", params: [], desc: "Returns an array containing all of the elements in this list in proper sequence." }]
    }
  },

  // ─── HashMap ──────────────────────────────────────────────────────────────
  "HashMap": {
    package: "java.util",
    kind: "class",
    description: "Hash table based implementation of the Map interface. Permits null keys and values. O(1) average time for get/put. Not ordered, not synchronized.",
    constructors: [
      { signature: "HashMap()", desc: "Constructs an empty HashMap with default initial capacity (16) and load factor (0.75)." },
      { signature: "HashMap(int initialCapacity)", desc: "Constructs an empty HashMap with the specified initial capacity and default load factor (0.75)." },
      { signature: "HashMap(int initialCapacity, float loadFactor)", desc: "Constructs an empty HashMap with the specified initial capacity and load factor." },
      { signature: "HashMap(Map<? extends K, ? extends V> m)", desc: "Constructs a new HashMap with the same mappings as the specified Map." }
    ],
    methods: {
      "put": [{ signature: "put(K key, V value)", returns: "V", returnsDesc: "The previous value associated with key, or null if none.", params: [{ name: "key", type: "K", desc: "Key with which the specified value is to be associated." }, { name: "value", type: "V", desc: "Value to be associated with the specified key." }], desc: "Associates the specified value with the specified key in this map." }],
      "get": [{ signature: "get(Object key)", returns: "V", returnsDesc: "The value to which the key is mapped, or null if no mapping exists.", params: [{ name: "key", type: "Object", desc: "The key whose associated value is to be returned." }], desc: "Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key." }],
      "getOrDefault": [{ signature: "getOrDefault(Object key, V defaultValue)", returns: "V", returnsDesc: "The value to which the key is mapped, or defaultValue if no mapping.", params: [{ name: "key", type: "Object", desc: "The key whose associated value is to be returned." }, { name: "defaultValue", type: "V", desc: "The default mapping of the key." }], desc: "Returns the value to which the specified key is mapped, or defaultValue if this map contains no mapping for the key." }],
      "containsKey": [{ signature: "containsKey(Object key)", returns: "boolean", returnsDesc: "true if this map contains a mapping for the specified key.", params: [{ name: "key", type: "Object", desc: "The key whose presence is to be tested." }], desc: "Returns true if this map contains a mapping for the specified key." }],
      "containsValue": [{ signature: "containsValue(Object value)", returns: "boolean", returnsDesc: "true if this map maps one or more keys to the specified value.", params: [{ name: "value", type: "Object", desc: "Value whose presence in this map is to be tested." }], desc: "Returns true if this map maps one or more keys to the specified value. O(n)." }],
      "remove": [
        { signature: "remove(Object key)", returns: "V", returnsDesc: "The previous value associated with key, or null.", params: [{ name: "key", type: "Object", desc: "Key whose mapping is to be removed." }], desc: "Removes the mapping for the specified key from this map if present." },
        { signature: "remove(Object key, Object value)", returns: "boolean", returnsDesc: "true if the entry was removed.", params: [{ name: "key", type: "Object", desc: "Key with which the specified value is associated." }, { name: "value", type: "Object", desc: "Value expected to be associated with the specified key." }], desc: "Removes the entry for the specified key only if it is currently mapped to the specified value." }
      ],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of key-value mappings in this map.", params: [], desc: "Returns the number of key-value mappings in this map." }],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if this map contains no key-value mappings.", params: [], desc: "Returns true if this map contains no key-value mappings." }],
      "clear": [{ signature: "clear()", returns: "void", returnsDesc: "", params: [], desc: "Removes all of the mappings from this map." }],
      "keySet": [{ signature: "keySet()", returns: "Set<K>", returnsDesc: "A set view of the keys contained in this map.", params: [], desc: "Returns a Set view of the keys contained in this map." }],
      "values": [{ signature: "values()", returns: "Collection<V>", returnsDesc: "A collection view of the values contained in this map.", params: [], desc: "Returns a Collection view of the values contained in this map." }],
      "entrySet": [{ signature: "entrySet()", returns: "Set<Map.Entry<K,V>>", returnsDesc: "A set view of the mappings contained in this map.", params: [], desc: "Returns a Set view of the mappings contained in this map." }],
      "putIfAbsent": [{ signature: "putIfAbsent(K key, V value)", returns: "V", returnsDesc: "The current value associated with key, or null if there was no mapping.", params: [{ name: "key", type: "K", desc: "Key with which the specified value is to be associated." }, { name: "value", type: "V", desc: "Value to be associated with the specified key." }], desc: "If the specified key is not already associated with a value, associates it with the given value." }],
      "merge": [{ signature: "merge(K key, V value, BiFunction<? super V,? super V,? extends V> remappingFunction)", returns: "V", returnsDesc: "The new value associated with the key, or null if none.", params: [{ name: "key", type: "K", desc: "Key with which the resulting value is to be associated." }, { name: "value", type: "V", desc: "The non-null value to be merged." }, { name: "remappingFunction", type: "BiFunction", desc: "The function to recompute a value if present." }], desc: "If the key is not associated, associates it with the value. If associated, merges with the remapping function." }],
      "compute": [{ signature: "compute(K key, BiFunction<? super K,? super V,? extends V> remappingFunction)", returns: "V", returnsDesc: "The new value associated with key, or null.", params: [{ name: "key", type: "K", desc: "Key with which the computed value is to be associated." }, { name: "remappingFunction", type: "BiFunction", desc: "The function to compute a value." }], desc: "Attempts to compute a mapping for the specified key and its current mapped value." }],
      "computeIfAbsent": [{ signature: "computeIfAbsent(K key, Function<? super K,? extends V> mappingFunction)", returns: "V", returnsDesc: "The current (existing or computed) value associated with the key.", params: [{ name: "key", type: "K", desc: "Key with which the specified value is to be associated." }, { name: "mappingFunction", type: "Function", desc: "The function to compute a value." }], desc: "If the specified key is not already associated with a value, attempts to compute its value using the given mapping function." }],
      "computeIfPresent": [{ signature: "computeIfPresent(K key, BiFunction<? super K,? super V,? extends V> remappingFunction)", returns: "V", returnsDesc: "The new value associated with the key, or null.", params: [{ name: "key", type: "K", desc: "Key with which the specified value is to be associated." }, { name: "remappingFunction", type: "BiFunction", desc: "The function to compute a value." }], desc: "If the value for the specified key is present and non-null, attempts to compute a new mapping." }],
      "forEach": [{ signature: "forEach(BiConsumer<? super K,? super V> action)", returns: "void", returnsDesc: "", params: [{ name: "action", type: "BiConsumer<? super K, ? super V>", desc: "The action to be performed for each entry." }], desc: "Performs the given action for each entry in this map." }],
      "replace": [
        { signature: "replace(K key, V value)", returns: "V", returnsDesc: "The previous value associated with key, or null.", params: [{ name: "key", type: "K", desc: "The key with which the value is associated." }, { name: "value", type: "V", desc: "The value to be associated with the key." }], desc: "Replaces the entry for the specified key only if it is currently mapped to some value." },
        { signature: "replace(K key, V oldValue, V newValue)", returns: "boolean", returnsDesc: "true if the value was replaced.", params: [{ name: "key", type: "K", desc: "The key." }, { name: "oldValue", type: "V", desc: "The expected current value." }, { name: "newValue", type: "V", desc: "The new value." }], desc: "Replaces the entry for the specified key only if currently mapped to the specified oldValue." }
      ]
    }
  },

  // ─── HashSet ──────────────────────────────────────────────────────────────
  "HashSet": {
    package: "java.util",
    kind: "class",
    description: "Hash table backed implementation of the Set interface. Permits null, no duplicates. O(1) average time for add/remove/contains. Not ordered.",
    constructors: [
      { signature: "HashSet()", desc: "Constructs a new, empty set; the backing HashMap instance has default initial capacity (16) and load factor (0.75)." },
      { signature: "HashSet(int initialCapacity)", desc: "Constructs a new, empty set with the specified initial capacity and default load factor (0.75)." },
      { signature: "HashSet(Collection<? extends E> c)", desc: "Constructs a new set containing the elements in the specified collection." }
    ],
    methods: {
      "add": [{ signature: "add(E e)", returns: "boolean", returnsDesc: "true if this set did not already contain the specified element.", params: [{ name: "e", type: "E", desc: "Element to be added to this set." }], desc: "Adds the specified element to this set if it is not already present." }],
      "remove": [{ signature: "remove(Object o)", returns: "boolean", returnsDesc: "true if the set contained the specified element.", params: [{ name: "o", type: "Object", desc: "Object to be removed from this set, if present." }], desc: "Removes the specified element from this set if it is present." }],
      "contains": [{ signature: "contains(Object o)", returns: "boolean", returnsDesc: "true if this set contains the specified element.", params: [{ name: "o", type: "Object", desc: "Element whose presence in this set is to be tested." }], desc: "Returns true if this set contains the specified element." }],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of elements in this set.", params: [], desc: "Returns the number of elements in this set." }],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if this set contains no elements.", params: [], desc: "Returns true if this set contains no elements." }],
      "clear": [{ signature: "clear()", returns: "void", returnsDesc: "", params: [], desc: "Removes all of the elements from this set." }],
      "iterator": [{ signature: "iterator()", returns: "Iterator<E>", returnsDesc: "An iterator over the elements in this set.", params: [], desc: "Returns an iterator over the elements in this set. Elements are returned in no particular order." }],
      "addAll": [{ signature: "addAll(Collection<? extends E> c)", returns: "boolean", returnsDesc: "true if this set changed as a result of the call.", params: [{ name: "c", type: "Collection<? extends E>", desc: "Collection containing elements to add." }], desc: "Adds all of the elements in the specified collection to this set." }],
      "removeAll": [{ signature: "removeAll(Collection<?> c)", returns: "boolean", returnsDesc: "true if this set changed as a result of the call.", params: [{ name: "c", type: "Collection<?>", desc: "Collection containing elements to be removed." }], desc: "Removes from this set all of its elements that are contained in the specified collection." }],
      "retainAll": [{ signature: "retainAll(Collection<?> c)", returns: "boolean", returnsDesc: "true if this set changed as a result of the call.", params: [{ name: "c", type: "Collection<?>", desc: "Collection containing elements to be retained." }], desc: "Retains only the elements in this set that are contained in the specified collection." }],
      "containsAll": [{ signature: "containsAll(Collection<?> c)", returns: "boolean", returnsDesc: "true if this set contains all of the elements in the specified collection.", params: [{ name: "c", type: "Collection<?>", desc: "Collection to be checked for containment." }], desc: "Returns true if this set contains all of the elements of the specified collection." }],
      "toArray": [{ signature: "toArray()", returns: "Object[]", returnsDesc: "An array containing all elements in this set.", params: [], desc: "Returns an array containing all of the elements in this set." }]
    }
  },

  // ─── TreeMap ──────────────────────────────────────────────────────────────
  "TreeMap": {
    package: "java.util",
    kind: "class",
    description: "A Red-Black tree based NavigableMap implementation. Sorted by key's natural ordering, or by a Comparator. O(log n) for get/put/remove.",
    constructors: [
      { signature: "TreeMap()", desc: "Constructs a new, empty tree map, using the natural ordering of its keys." },
      { signature: "TreeMap(Comparator<? super K> comparator)", desc: "Constructs a new, empty tree map, ordered according to the given comparator." },
      { signature: "TreeMap(Map<? extends K, ? extends V> m)", desc: "Constructs a new tree map containing the same mappings as the given map." }
    ],
    methods: {
      "put": [{ signature: "put(K key, V value)", returns: "V", returnsDesc: "The previous value associated with key, or null.", params: [{ name: "key", type: "K", desc: "Key with which the value is associated." }, { name: "value", type: "V", desc: "Value to be associated with the key." }], desc: "Associates the specified value with the specified key in this map." }],
      "get": [{ signature: "get(Object key)", returns: "V", returnsDesc: "The value to which the key is mapped, or null.", params: [{ name: "key", type: "Object", desc: "The key whose associated value is to be returned." }], desc: "Returns the value to which the specified key is mapped." }],
      "remove": [{ signature: "remove(Object key)", returns: "V", returnsDesc: "The previous value associated with key, or null.", params: [{ name: "key", type: "Object", desc: "Key whose mapping is to be removed." }], desc: "Removes the mapping for this key from this TreeMap if present." }],
      "firstKey": [{ signature: "firstKey()", returns: "K", returnsDesc: "The first (lowest) key currently in this map.", params: [], desc: "Returns the first (lowest) key currently in this map.", throws: ["NoSuchElementException — if this map is empty"] }],
      "lastKey": [{ signature: "lastKey()", returns: "K", returnsDesc: "The last (highest) key currently in this map.", params: [], desc: "Returns the last (highest) key currently in this map.", throws: ["NoSuchElementException — if this map is empty"] }],
      "floorKey": [{ signature: "floorKey(K key)", returns: "K", returnsDesc: "The greatest key <= the given key, or null.", params: [{ name: "key", type: "K", desc: "The key." }], desc: "Returns the greatest key less than or equal to the given key, or null if there is no such key." }],
      "ceilingKey": [{ signature: "ceilingKey(K key)", returns: "K", returnsDesc: "The least key >= the given key, or null.", params: [{ name: "key", type: "K", desc: "The key." }], desc: "Returns the least key greater than or equal to the given key, or null if there is no such key." }],
      "lowerKey": [{ signature: "lowerKey(K key)", returns: "K", returnsDesc: "The greatest key strictly less than the given key, or null.", params: [{ name: "key", type: "K", desc: "The key." }], desc: "Returns the greatest key strictly less than the given key, or null if there is no such key." }],
      "higherKey": [{ signature: "higherKey(K key)", returns: "K", returnsDesc: "The least key strictly greater than the given key, or null.", params: [{ name: "key", type: "K", desc: "The key." }], desc: "Returns the least key strictly greater than the given key, or null if there is no such key." }],
      "subMap": [
        { signature: "subMap(K fromKey, K toKey)", returns: "SortedMap<K,V>", returnsDesc: "A view of the portion of this map between fromKey (inclusive) and toKey (exclusive).", params: [{ name: "fromKey", type: "K", desc: "Low endpoint (inclusive) of the keys." }, { name: "toKey", type: "K", desc: "High endpoint (exclusive) of the keys." }], desc: "Returns a view of the portion of this map whose keys range from fromKey (inclusive) to toKey (exclusive)." },
        { signature: "subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive)", returns: "NavigableMap<K,V>", returnsDesc: "A view of the specified range.", params: [{ name: "fromKey", type: "K", desc: "Low endpoint of the keys." }, { name: "fromInclusive", type: "boolean", desc: "true if the low endpoint is inclusive." }, { name: "toKey", type: "K", desc: "High endpoint of the keys." }, { name: "toInclusive", type: "boolean", desc: "true if the high endpoint is inclusive." }], desc: "Returns a view of the portion of this map whose keys range from fromKey to toKey." }
      ],
      "headMap": [{ signature: "headMap(K toKey)", returns: "SortedMap<K,V>", returnsDesc: "A view of the portion of this map whose keys are strictly less than toKey.", params: [{ name: "toKey", type: "K", desc: "High endpoint (exclusive) of the keys." }], desc: "Returns a view of the portion of this map whose keys are strictly less than toKey." }],
      "tailMap": [{ signature: "tailMap(K fromKey)", returns: "SortedMap<K,V>", returnsDesc: "A view of the portion of this map whose keys are >= fromKey.", params: [{ name: "fromKey", type: "K", desc: "Low endpoint (inclusive) of the keys." }], desc: "Returns a view of the portion of this map whose keys are greater than or equal to fromKey." }],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of key-value mappings in this map.", params: [], desc: "Returns the number of key-value mappings in this map." }],
      "containsKey": [{ signature: "containsKey(Object key)", returns: "boolean", returnsDesc: "true if this map contains a mapping for the specified key.", params: [{ name: "key", type: "Object", desc: "The key." }], desc: "Returns true if this map contains a mapping for the specified key." }],
      "keySet": [{ signature: "keySet()", returns: "Set<K>", returnsDesc: "A Set view of the keys in ascending order.", params: [], desc: "Returns a Set view of the keys contained in this map." }],
      "values": [{ signature: "values()", returns: "Collection<V>", returnsDesc: "A Collection view of the values, in ascending key order.", params: [], desc: "Returns a Collection view of the values contained in this map." }],
      "entrySet": [{ signature: "entrySet()", returns: "Set<Map.Entry<K,V>>", returnsDesc: "A Set view of the mappings contained in this map.", params: [], desc: "Returns a Set view of the mappings contained in this map." }],
      "descendingKeySet": [{ signature: "descendingKeySet()", returns: "NavigableSet<K>", returnsDesc: "A reverse order NavigableSet view of the keys.", params: [], desc: "Returns a reverse order NavigableSet view of the keys contained in this map." }],
      "firstEntry": [{ signature: "firstEntry()", returns: "Map.Entry<K,V>", returnsDesc: "An entry with the least key, or null if empty.", params: [], desc: "Returns a key-value mapping associated with the least key in this map." }],
      "lastEntry": [{ signature: "lastEntry()", returns: "Map.Entry<K,V>", returnsDesc: "An entry with the greatest key, or null if empty.", params: [], desc: "Returns a key-value mapping associated with the greatest key in this map." }]
    }
  },

  // ─── TreeSet ──────────────────────────────────────────────────────────────
  "TreeSet": {
    package: "java.util",
    kind: "class",
    description: "A NavigableSet implementation based on a TreeMap. Elements are sorted using natural ordering or a Comparator. O(log n) for add/remove/contains.",
    constructors: [
      { signature: "TreeSet()", desc: "Constructs a new, empty tree set, sorted according to the natural ordering." },
      { signature: "TreeSet(Comparator<? super E> comparator)", desc: "Constructs a new, empty tree set sorted according to the specified comparator." },
      { signature: "TreeSet(Collection<? extends E> c)", desc: "Constructs a new tree set containing the elements in the specified collection." }
    ],
    methods: {
      "add": [{ signature: "add(E e)", returns: "boolean", returnsDesc: "true if this set did not already contain the specified element.", params: [{ name: "e", type: "E", desc: "Element to be added to this set." }], desc: "Adds the specified element to this set if it is not already present." }],
      "remove": [{ signature: "remove(Object o)", returns: "boolean", returnsDesc: "true if this set contained the specified element.", params: [{ name: "o", type: "Object", desc: "Object to be removed from this set." }], desc: "Removes the specified element from this set if it is present." }],
      "contains": [{ signature: "contains(Object o)", returns: "boolean", returnsDesc: "true if this set contains the specified element.", params: [{ name: "o", type: "Object", desc: "Element whose presence is to be tested." }], desc: "Returns true if this set contains the specified element." }],
      "first": [{ signature: "first()", returns: "E", returnsDesc: "The first (lowest) element currently in this set.", params: [], desc: "Returns the first (lowest) element currently in this set.", throws: ["NoSuchElementException — if this set is empty"] }],
      "last": [{ signature: "last()", returns: "E", returnsDesc: "The last (highest) element currently in this set.", params: [], desc: "Returns the last (highest) element currently in this set.", throws: ["NoSuchElementException — if this set is empty"] }],
      "floor": [{ signature: "floor(E e)", returns: "E", returnsDesc: "The greatest element <= e, or null.", params: [{ name: "e", type: "E", desc: "The value to match." }], desc: "Returns the greatest element in this set less than or equal to the given element." }],
      "ceiling": [{ signature: "ceiling(E e)", returns: "E", returnsDesc: "The least element >= e, or null.", params: [{ name: "e", type: "E", desc: "The value to match." }], desc: "Returns the least element in this set greater than or equal to the given element." }],
      "lower": [{ signature: "lower(E e)", returns: "E", returnsDesc: "The greatest element strictly less than e, or null.", params: [{ name: "e", type: "E", desc: "The value to match." }], desc: "Returns the greatest element in this set strictly less than the given element." }],
      "higher": [{ signature: "higher(E e)", returns: "E", returnsDesc: "The least element strictly greater than e, or null.", params: [{ name: "e", type: "E", desc: "The value to match." }], desc: "Returns the least element in this set strictly greater than the given element." }],
      "pollFirst": [{ signature: "pollFirst()", returns: "E", returnsDesc: "The first element, or null if this set is empty.", params: [], desc: "Retrieves and removes the first (lowest) element, or returns null if empty." }],
      "pollLast": [{ signature: "pollLast()", returns: "E", returnsDesc: "The last element, or null if this set is empty.", params: [], desc: "Retrieves and removes the last (highest) element, or returns null if empty." }],
      "subSet": [
        { signature: "subSet(E fromElement, E toElement)", returns: "SortedSet<E>", returnsDesc: "A view of the portion of this set between fromElement (inclusive) and toElement (exclusive).", params: [{ name: "fromElement", type: "E", desc: "Low endpoint (inclusive)." }, { name: "toElement", type: "E", desc: "High endpoint (exclusive)." }], desc: "Returns a view of the portion of this set from fromElement (inclusive) to toElement (exclusive)." },
        { signature: "subSet(E fromElement, boolean fromInclusive, E toElement, boolean toInclusive)", returns: "NavigableSet<E>", returnsDesc: "A view of the specified range.", params: [{ name: "fromElement", type: "E", desc: "Low endpoint." }, { name: "fromInclusive", type: "boolean", desc: "true if low endpoint is inclusive." }, { name: "toElement", type: "E", desc: "High endpoint." }, { name: "toInclusive", type: "boolean", desc: "true if high endpoint is inclusive." }], desc: "Returns a view of the portion of this set whose elements range from fromElement to toElement." }
      ],
      "headSet": [{ signature: "headSet(E toElement)", returns: "SortedSet<E>", returnsDesc: "A view of the portion of this set whose elements are strictly less than toElement.", params: [{ name: "toElement", type: "E", desc: "High endpoint (exclusive)." }], desc: "Returns a view of the portion of this set whose elements are strictly less than toElement." }],
      "tailSet": [{ signature: "tailSet(E fromElement)", returns: "SortedSet<E>", returnsDesc: "A view of the portion of this set whose elements are >= fromElement.", params: [{ name: "fromElement", type: "E", desc: "Low endpoint (inclusive)." }], desc: "Returns a view of the portion of this set whose elements are >= fromElement." }],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of elements in this set.", params: [], desc: "Returns the number of elements in this set." }],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if this set contains no elements.", params: [], desc: "Returns true if this set contains no elements." }],
      "clear": [{ signature: "clear()", returns: "void", returnsDesc: "", params: [], desc: "Removes all of the elements from this set." }],
      "iterator": [{ signature: "iterator()", returns: "Iterator<E>", returnsDesc: "An iterator over the elements in this set in ascending order.", params: [], desc: "Returns an iterator over the elements in this set in ascending order." }],
      "descendingIterator": [{ signature: "descendingIterator()", returns: "Iterator<E>", returnsDesc: "An iterator over the elements in descending order.", params: [], desc: "Returns an iterator over the elements in this set in descending order." }]
    }
  },

  // ─── PriorityQueue ────────────────────────────────────────────────────────
  "PriorityQueue": {
    package: "java.util",
    kind: "class",
    description: "An unbounded priority queue based on a priority heap. Elements are ordered by natural ordering or a Comparator. The head is the least element. Not synchronized. Does not permit null.",
    constructors: [
      { signature: "PriorityQueue()", desc: "Creates a PriorityQueue with default initial capacity (11) that orders its elements according to their natural ordering." },
      { signature: "PriorityQueue(int initialCapacity)", desc: "Creates a PriorityQueue with the specified initial capacity." },
      { signature: "PriorityQueue(Comparator<? super E> comparator)", desc: "Creates a PriorityQueue with default initial capacity and whose elements are ordered according to the specified comparator." },
      { signature: "PriorityQueue(int initialCapacity, Comparator<? super E> comparator)", desc: "Creates a PriorityQueue with the specified initial capacity and comparator." },
      { signature: "PriorityQueue(Collection<? extends E> c)", desc: "Creates a PriorityQueue containing the elements in the specified collection." }
    ],
    methods: {
      "add": [{ signature: "add(E e)", returns: "boolean", returnsDesc: "true (as specified by Collection.add(E)).", params: [{ name: "e", type: "E", desc: "The element to add." }], desc: "Inserts the specified element into this priority queue.", throws: ["ClassCastException — if the element cannot be compared", "NullPointerException — if e is null"] }],
      "offer": [{ signature: "offer(E e)", returns: "boolean", returnsDesc: "true if the element was added successfully.", params: [{ name: "e", type: "E", desc: "The element to insert." }], desc: "Inserts the specified element into this priority queue.", throws: ["ClassCastException — if the element cannot be compared", "NullPointerException — if e is null"] }],
      "poll": [{ signature: "poll()", returns: "E", returnsDesc: "The head of this queue, or null if this queue is empty.", params: [], desc: "Retrieves and removes the head of this queue (the least element), or returns null if empty." }],
      "peek": [{ signature: "peek()", returns: "E", returnsDesc: "The head of this queue, or null if this queue is empty.", params: [], desc: "Retrieves, but does not remove, the head of this queue (the least element)." }],
      "remove": [
        { signature: "remove()", returns: "E", returnsDesc: "The head of this queue.", params: [], desc: "Retrieves and removes the head of this queue.", throws: ["NoSuchElementException — if this queue is empty"] },
        { signature: "remove(Object o)", returns: "boolean", returnsDesc: "true if this queue contained the specified element.", params: [{ name: "o", type: "Object", desc: "Element to be removed." }], desc: "Removes a single instance of the specified element from this queue." }
      ],
      "contains": [{ signature: "contains(Object o)", returns: "boolean", returnsDesc: "true if this queue contains the specified element.", params: [{ name: "o", type: "Object", desc: "Object to be checked for containment." }], desc: "Returns true if this queue contains the specified element. O(n)." }],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of elements in this collection.", params: [], desc: "Returns the number of elements in this collection." }],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if this collection contains no elements.", params: [], desc: "Returns true if this collection contains no elements." }],
      "clear": [{ signature: "clear()", returns: "void", returnsDesc: "", params: [], desc: "Removes all of the elements from this priority queue." }],
      "toArray": [{ signature: "toArray()", returns: "Object[]", returnsDesc: "An array containing all elements in this queue.", params: [], desc: "Returns an array containing all of the elements in this queue." }],
      "comparator": [{ signature: "comparator()", returns: "Comparator<? super E>", returnsDesc: "The comparator used to order elements, or null for natural ordering.", params: [], desc: "Returns the comparator used to order the elements in this queue." }]
    }
  },

  // ─── ArrayDeque ───────────────────────────────────────────────────────────
  "ArrayDeque": {
    package: "java.util",
    kind: "class",
    description: "Resizable-array implementation of the Deque interface. Array deques have no capacity restrictions. Null elements are prohibited. Faster than Stack as a stack and faster than LinkedList as a queue.",
    constructors: [
      { signature: "ArrayDeque()", desc: "Constructs an empty array deque with an initial capacity sufficient to hold 16 elements." },
      { signature: "ArrayDeque(int numElements)", desc: "Constructs an empty array deque with initial capacity sufficient to hold the specified number of elements." },
      { signature: "ArrayDeque(Collection<? extends E> c)", desc: "Constructs a deque containing the elements of the specified collection." }
    ],
    methods: {
      "addFirst": [{ signature: "addFirst(E e)", returns: "void", returnsDesc: "", params: [{ name: "e", type: "E", desc: "The element to add (must not be null)." }], desc: "Inserts the specified element at the front of this deque.", throws: ["NullPointerException — if the specified element is null"] }],
      "addLast": [{ signature: "addLast(E e)", returns: "void", returnsDesc: "", params: [{ name: "e", type: "E", desc: "The element to add (must not be null)." }], desc: "Inserts the specified element at the end of this deque.", throws: ["NullPointerException — if the specified element is null"] }],
      "offerFirst": [{ signature: "offerFirst(E e)", returns: "boolean", returnsDesc: "true (deques are unbounded, always succeeds).", params: [{ name: "e", type: "E", desc: "The element to add." }], desc: "Inserts the specified element at the front of this deque." }],
      "offerLast": [{ signature: "offerLast(E e)", returns: "boolean", returnsDesc: "true (deques are unbounded, always succeeds).", params: [{ name: "e", type: "E", desc: "The element to add." }], desc: "Inserts the specified element at the end of this deque." }],
      "removeFirst": [{ signature: "removeFirst()", returns: "E", returnsDesc: "The head of this deque.", params: [], desc: "Retrieves and removes the first element of this deque.", throws: ["NoSuchElementException — if this deque is empty"] }],
      "removeLast": [{ signature: "removeLast()", returns: "E", returnsDesc: "The tail of this deque.", params: [], desc: "Retrieves and removes the last element of this deque.", throws: ["NoSuchElementException — if this deque is empty"] }],
      "pollFirst": [{ signature: "pollFirst()", returns: "E", returnsDesc: "The head of this deque, or null if empty.", params: [], desc: "Retrieves and removes the first element of this deque, or returns null if empty." }],
      "pollLast": [{ signature: "pollLast()", returns: "E", returnsDesc: "The tail of this deque, or null if empty.", params: [], desc: "Retrieves and removes the last element of this deque, or returns null if empty." }],
      "peekFirst": [{ signature: "peekFirst()", returns: "E", returnsDesc: "The head of this deque, or null if empty.", params: [], desc: "Retrieves, but does not remove, the first element of this deque, or returns null if empty." }],
      "peekLast": [{ signature: "peekLast()", returns: "E", returnsDesc: "The tail of this deque, or null if empty.", params: [], desc: "Retrieves, but does not remove, the last element of this deque, or returns null if empty." }],
      "getFirst": [{ signature: "getFirst()", returns: "E", returnsDesc: "The head of this deque.", params: [], desc: "Retrieves, but does not remove, the first element of this deque.", throws: ["NoSuchElementException — if this deque is empty"] }],
      "getLast": [{ signature: "getLast()", returns: "E", returnsDesc: "The tail of this deque.", params: [], desc: "Retrieves, but does not remove, the last element of this deque.", throws: ["NoSuchElementException — if this deque is empty"] }],
      "push": [{ signature: "push(E e)", returns: "void", returnsDesc: "", params: [{ name: "e", type: "E", desc: "The element to push." }], desc: "Pushes an element onto the stack represented by this deque (equivalent to addFirst)." }],
      "pop": [{ signature: "pop()", returns: "E", returnsDesc: "The element at the front of this deque (the top of the stack).", params: [], desc: "Pops an element from the stack represented by this deque (equivalent to removeFirst).", throws: ["NoSuchElementException — if this deque is empty"] }],
      "peek": [{ signature: "peek()", returns: "E", returnsDesc: "The head of the queue (first element), or null if empty.", params: [], desc: "Retrieves, but does not remove, the head of the queue represented by this deque." }],
      "poll": [{ signature: "poll()", returns: "E", returnsDesc: "The head of the queue (first element), or null if empty.", params: [], desc: "Retrieves and removes the head of the queue represented by this deque." }],
      "offer": [{ signature: "offer(E e)", returns: "boolean", returnsDesc: "true (always).", params: [{ name: "e", type: "E", desc: "The element to add." }], desc: "Inserts the specified element at the end of this deque (queue tail)." }],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of elements in this deque.", params: [], desc: "Returns the number of elements in this deque." }],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if this deque contains no elements.", params: [], desc: "Returns true if this deque contains no elements." }],
      "contains": [{ signature: "contains(Object o)", returns: "boolean", returnsDesc: "true if this deque contains the specified element.", params: [{ name: "o", type: "Object", desc: "Object to check." }], desc: "Returns true if this deque contains the specified element. O(n)." }],
      "clear": [{ signature: "clear()", returns: "void", returnsDesc: "", params: [], desc: "Removes all of the elements from this deque." }],
      "toArray": [{ signature: "toArray()", returns: "Object[]", returnsDesc: "An array containing all of the elements in this deque.", params: [], desc: "Returns an array containing all of the elements in this deque in proper sequence." }]
    }
  },

  // ─── Stack ────────────────────────────────────────────────────────────────
  "Stack": {
    package: "java.util",
    kind: "class",
    description: "A last-in-first-out (LIFO) stack of objects. Extends Vector. Prefer ArrayDeque for non-synchronized stack usage.",
    constructors: [
      { signature: "Stack()", desc: "Creates an empty Stack." }
    ],
    methods: {
      "push": [{ signature: "push(E item)", returns: "E", returnsDesc: "The item argument.", params: [{ name: "item", type: "E", desc: "The item to be pushed onto this stack." }], desc: "Pushes an item onto the top of this stack." }],
      "pop": [{ signature: "pop()", returns: "E", returnsDesc: "The object at the top of this stack.", params: [], desc: "Removes the object at the top of this stack and returns it.", throws: ["EmptyStackException — if this stack is empty"] }],
      "peek": [{ signature: "peek()", returns: "E", returnsDesc: "The object at the top of this stack.", params: [], desc: "Looks at the object at the top of this stack without removing it.", throws: ["EmptyStackException — if this stack is empty"] }],
      "empty": [{ signature: "empty()", returns: "boolean", returnsDesc: "true if and only if this stack contains no items.", params: [], desc: "Tests if this stack is empty." }],
      "search": [{ signature: "search(Object o)", returns: "int", returnsDesc: "The 1-based position from the top of the stack, or -1 if not found.", params: [{ name: "o", type: "Object", desc: "The desired object." }], desc: "Returns the 1-based position of the object on this stack." }],
      "size": [{ signature: "size()", returns: "int", returnsDesc: "The number of components in this stack.", params: [], desc: "Returns the number of components in this stack." }]
    }
  },

  // ─── Collections ──────────────────────────────────────────────────────────
  "Collections": {
    package: "java.util",
    kind: "class",
    description: "This class consists exclusively of static methods that operate on or return collections. It contains polymorphic algorithms that operate on collections.",
    constructors: [],
    methods: {
      "sort": [
        { signature: "sort(List<T> list)", returns: "void", returnsDesc: "", params: [{ name: "list", type: "List<T>", desc: "The list to be sorted." }], desc: "Sorts the specified list into ascending order, according to the natural ordering of its elements.", throws: ["ClassCastException — if elements cannot be mutually compared"] },
        { signature: "sort(List<T> list, Comparator<? super T> c)", returns: "void", returnsDesc: "", params: [{ name: "list", type: "List<T>", desc: "The list to be sorted." }, { name: "c", type: "Comparator<? super T>", desc: "The comparator to determine the order. null means natural ordering." }], desc: "Sorts the specified list according to the order induced by the specified comparator." }
      ],
      "reverse": [{ signature: "reverse(List<?> list)", returns: "void", returnsDesc: "", params: [{ name: "list", type: "List<?>", desc: "The list whose elements are to be reversed." }], desc: "Reverses the order of the elements in the specified list." }],
      "shuffle": [
        { signature: "shuffle(List<?> list)", returns: "void", returnsDesc: "", params: [{ name: "list", type: "List<?>", desc: "The list to be shuffled." }], desc: "Randomly permutes the specified list using a default source of randomness." },
        { signature: "shuffle(List<?> list, Random rnd)", returns: "void", returnsDesc: "", params: [{ name: "list", type: "List<?>", desc: "The list to be shuffled." }, { name: "rnd", type: "Random", desc: "The source of randomness." }], desc: "Randomly permutes the specified list using the specified source of randomness." }
      ],
      "min": [
        { signature: "min(Collection<? extends T> coll)", returns: "T", returnsDesc: "The minimum element of the given collection.", params: [{ name: "coll", type: "Collection<? extends T>", desc: "The collection whose minimum element is to be determined." }], desc: "Returns the minimum element of the given collection, according to the natural ordering of its elements." },
        { signature: "min(Collection<? extends T> coll, Comparator<? super T> comp)", returns: "T", returnsDesc: "The minimum element according to the specified comparator.", params: [{ name: "coll", type: "Collection<? extends T>", desc: "The collection." }, { name: "comp", type: "Comparator<? super T>", desc: "The comparator." }], desc: "Returns the minimum element of the given collection, according to the order induced by the specified comparator." }
      ],
      "max": [
        { signature: "max(Collection<? extends T> coll)", returns: "T", returnsDesc: "The maximum element of the given collection.", params: [{ name: "coll", type: "Collection<? extends T>", desc: "The collection." }], desc: "Returns the maximum element of the given collection, according to natural ordering." },
        { signature: "max(Collection<? extends T> coll, Comparator<? super T> comp)", returns: "T", returnsDesc: "The maximum element according to the specified comparator.", params: [{ name: "coll", type: "Collection<? extends T>", desc: "The collection." }, { name: "comp", type: "Comparator<? super T>", desc: "The comparator." }], desc: "Returns the maximum element of the given collection, according to the specified comparator." }
      ],
      "frequency": [{ signature: "frequency(Collection<?> c, Object o)", returns: "int", returnsDesc: "The number of elements in c equal to o.", params: [{ name: "c", type: "Collection<?>", desc: "The collection in which to determine the frequency of o." }, { name: "o", type: "Object", desc: "The object whose frequency is to be determined." }], desc: "Returns the number of elements in the specified collection equal to the specified object." }],
      "fill": [{ signature: "fill(List<? super T> list, T obj)", returns: "void", returnsDesc: "", params: [{ name: "list", type: "List<? super T>", desc: "The list to be filled with the specified element." }, { name: "obj", type: "T", desc: "The element with which to fill the specified list." }], desc: "Replaces all of the elements of the specified list with the specified element." }],
      "copy": [{ signature: "copy(List<? super T> dest, List<? extends T> src)", returns: "void", returnsDesc: "", params: [{ name: "dest", type: "List<? super T>", desc: "The destination list." }, { name: "src", type: "List<? extends T>", desc: "The source list." }], desc: "Copies all of the elements from one list into another.", throws: ["IndexOutOfBoundsException — if the destination list is too small"] }],
      "swap": [{ signature: "swap(List<?> list, int i, int j)", returns: "void", returnsDesc: "", params: [{ name: "list", type: "List<?>", desc: "The list in which to swap the elements." }, { name: "i", type: "int", desc: "The index of one element to be swapped." }, { name: "j", type: "int", desc: "The index of the other element to be swapped." }], desc: "Swaps the elements at the specified positions in the specified list.", throws: ["IndexOutOfBoundsException — if either i or j is out of range"] }],
      "unmodifiableList": [{ signature: "unmodifiableList(List<? extends T> list)", returns: "List<T>", returnsDesc: "An unmodifiable view of the specified list.", params: [{ name: "list", type: "List<? extends T>", desc: "The list for which an unmodifiable view is to be returned." }], desc: "Returns an unmodifiable view of the specified list. Attempts to modify the returned list result in UnsupportedOperationException." }],
      "singletonList": [{ signature: "singletonList(T o)", returns: "List<T>", returnsDesc: "An immutable list containing only the specified object.", params: [{ name: "o", type: "T", desc: "The sole object to be stored in the returned list." }], desc: "Returns an immutable list containing only the specified object." }],
      "singleton": [{ signature: "singleton(T o)", returns: "Set<T>", returnsDesc: "An immutable set containing only the specified object.", params: [{ name: "o", type: "T", desc: "The sole object to be stored in the returned set." }], desc: "Returns an immutable set containing only the specified object." }],
      "emptyList": [{ signature: "emptyList()", returns: "List<T>", returnsDesc: "An empty immutable list.", params: [], desc: "Returns an empty list (immutable). This list is serializable." }],
      "emptySet": [{ signature: "emptySet()", returns: "Set<T>", returnsDesc: "An empty immutable set.", params: [], desc: "Returns an empty set (immutable)." }],
      "emptyMap": [{ signature: "emptyMap()", returns: "Map<K,V>", returnsDesc: "An empty immutable map.", params: [], desc: "Returns an empty map (immutable)." }],
      "nCopies": [{ signature: "nCopies(int n, T o)", returns: "List<T>", returnsDesc: "An immutable list consisting of n copies of the specified object.", params: [{ name: "n", type: "int", desc: "The number of elements in the returned list." }, { name: "o", type: "T", desc: "The element appearing in the returned list." }], desc: "Returns an immutable list consisting of n copies of the specified object.", throws: ["IllegalArgumentException — if n < 0"] }],
      "binarySearch": [
        { signature: "binarySearch(List<? extends Comparable<? super T>> list, T key)", returns: "int", returnsDesc: "The index of the key, or -(insertion point) - 1 if not found.", params: [{ name: "list", type: "List<? extends Comparable<? super T>>", desc: "The list to be searched (must be sorted)." }, { name: "key", type: "T", desc: "The key to be searched for." }], desc: "Searches the specified list for the specified object using binary search. List must be sorted." }
      ],
      "disjoint": [{ signature: "disjoint(Collection<?> c1, Collection<?> c2)", returns: "boolean", returnsDesc: "true if the two specified collections have no elements in common.", params: [{ name: "c1", type: "Collection<?>", desc: "A collection." }, { name: "c2", type: "Collection<?>", desc: "A collection." }], desc: "Returns true if the two specified collections have no elements in common." }],
      "reverseOrder": [{ signature: "reverseOrder()", returns: "Comparator<T>", returnsDesc: "A comparator that imposes the reverse of natural ordering.", params: [], desc: "Returns a comparator that imposes the reverse of the natural ordering on a collection of objects." }]
    }
  },

  // ─── Arrays ───────────────────────────────────────────────────────────────
  "Arrays": {
    package: "java.util",
    kind: "class",
    description: "This class contains various methods for manipulating arrays (such as sorting and searching). All methods are static.",
    constructors: [],
    methods: {
      "sort": [
        { signature: "sort(int[] a)", returns: "void", returnsDesc: "", params: [{ name: "a", type: "int[]", desc: "The array to be sorted." }], desc: "Sorts the specified array into ascending numerical order." },
        { signature: "sort(int[] a, int fromIndex, int toIndex)", returns: "void", returnsDesc: "", params: [{ name: "a", type: "int[]", desc: "The array to be sorted." }, { name: "fromIndex", type: "int", desc: "The index of the first element, inclusive, to be sorted." }, { name: "toIndex", type: "int", desc: "The index of the last element, exclusive, to be sorted." }], desc: "Sorts the specified range of the array into ascending order.", throws: ["IllegalArgumentException — if fromIndex > toIndex", "ArrayIndexOutOfBoundsException — if fromIndex < 0 or toIndex > a.length"] },
        { signature: "sort(Object[] a)", returns: "void", returnsDesc: "", params: [{ name: "a", type: "Object[]", desc: "The array to be sorted." }], desc: "Sorts the specified array of objects into ascending order, according to the natural ordering." },
        { signature: "sort(T[] a, Comparator<? super T> c)", returns: "void", returnsDesc: "", params: [{ name: "a", type: "T[]", desc: "The array to be sorted." }, { name: "c", type: "Comparator<? super T>", desc: "The comparator to determine the order. null for natural ordering." }], desc: "Sorts the specified array of objects according to the order induced by the specified comparator." }
      ],
      "binarySearch": [
        { signature: "binarySearch(int[] a, int key)", returns: "int", returnsDesc: "The index of the key, or -(insertion point) - 1.", params: [{ name: "a", type: "int[]", desc: "The array to be searched (must be sorted)." }, { name: "key", type: "int", desc: "The value to be searched for." }], desc: "Searches the specified array for the specified value using binary search. Array must be sorted." },
        { signature: "binarySearch(Object[] a, Object key)", returns: "int", returnsDesc: "The index of the key, or -(insertion point) - 1.", params: [{ name: "a", type: "Object[]", desc: "The array to be searched (must be sorted)." }, { name: "key", type: "Object", desc: "The value to be searched for." }], desc: "Searches the specified array for the specified object using binary search." }
      ],
      "fill": [
        { signature: "fill(int[] a, int val)", returns: "void", returnsDesc: "", params: [{ name: "a", type: "int[]", desc: "The array to be filled." }, { name: "val", type: "int", desc: "The value to be stored in all elements of the array." }], desc: "Assigns the specified int value to each element of the specified array." },
        { signature: "fill(Object[] a, Object val)", returns: "void", returnsDesc: "", params: [{ name: "a", type: "Object[]", desc: "The array to be filled." }, { name: "val", type: "Object", desc: "The value to be stored in all elements of the array." }], desc: "Assigns the specified Object reference to each element of the specified array of Objects." },
        { signature: "fill(int[] a, int fromIndex, int toIndex, int val)", returns: "void", returnsDesc: "", params: [{ name: "a", type: "int[]", desc: "The array to be filled." }, { name: "fromIndex", type: "int", desc: "The index of the first element (inclusive) to be filled." }, { name: "toIndex", type: "int", desc: "The index of the last element (exclusive) to be filled." }, { name: "val", type: "int", desc: "The value to be stored." }], desc: "Assigns the specified int value to each element of the specified range of the array." }
      ],
      "copyOf": [
        { signature: "copyOf(int[] original, int newLength)", returns: "int[]", returnsDesc: "A copy of the original array, truncated or padded with zeros.", params: [{ name: "original", type: "int[]", desc: "The array to be copied." }, { name: "newLength", type: "int", desc: "The length of the copy to be returned." }], desc: "Copies the specified array, truncating or padding with zeros so the copy has the specified length." },
        { signature: "copyOf(T[] original, int newLength)", returns: "T[]", returnsDesc: "A copy of the original array, truncated or padded with nulls.", params: [{ name: "original", type: "T[]", desc: "The array to be copied." }, { name: "newLength", type: "int", desc: "The length of the copy to be returned." }], desc: "Copies the specified array, truncating or padding with nulls so the copy has the specified length." }
      ],
      "copyOfRange": [
        { signature: "copyOfRange(int[] original, int from, int to)", returns: "int[]", returnsDesc: "A new array containing the specified range from the original array.", params: [{ name: "original", type: "int[]", desc: "The array from which a range is to be copied." }, { name: "from", type: "int", desc: "The initial index of the range (inclusive)." }, { name: "to", type: "int", desc: "The final index of the range (exclusive)." }], desc: "Copies the specified range of the specified array into a new array." },
        { signature: "copyOfRange(T[] original, int from, int to)", returns: "T[]", returnsDesc: "A new array containing the specified range from the original array.", params: [{ name: "original", type: "T[]", desc: "The array from which a range is to be copied." }, { name: "from", type: "int", desc: "The initial index of the range (inclusive)." }, { name: "to", type: "int", desc: "The final index of the range (exclusive)." }], desc: "Copies the specified range of the specified array into a new array, cast to T[]." }
      ],
      "equals": [
        { signature: "equals(int[] a, int[] a2)", returns: "boolean", returnsDesc: "true if the two arrays are equal.", params: [{ name: "a", type: "int[]", desc: "One array to be tested for equality." }, { name: "a2", type: "int[]", desc: "The other array to be tested for equality." }], desc: "Returns true if the two specified arrays of ints are equal to one another." },
        { signature: "equals(Object[] a, Object[] a2)", returns: "boolean", returnsDesc: "true if the two arrays are equal.", params: [{ name: "a", type: "Object[]", desc: "One array to be tested for equality." }, { name: "a2", type: "Object[]", desc: "The other array to be tested for equality." }], desc: "Returns true if the two specified arrays of Objects are equal." }
      ],
      "asList": [{ signature: "asList(T... a)", returns: "List<T>", returnsDesc: "A fixed-size list backed by the specified array.", params: [{ name: "a", type: "T...", desc: "The array by which the list will be backed." }], desc: "Returns a fixed-size list backed by the specified array. (Changes to the array reflect in the list and vice-versa.)" }],
      "toString": [
        { signature: "toString(int[] a)", returns: "String", returnsDesc: "A string representation of the array.", params: [{ name: "a", type: "int[]", desc: "The array whose string representation to return." }], desc: "Returns a string representation of the contents of the specified int array." },
        { signature: "toString(Object[] a)", returns: "String", returnsDesc: "A string representation of the array.", params: [{ name: "a", type: "Object[]", desc: "The array whose string representation to return." }], desc: "Returns a string representation of the contents of the specified Object array." }
      ],
      "deepToString": [{ signature: "deepToString(Object[] a)", returns: "String", returnsDesc: "A string representation of the deep contents of a.", params: [{ name: "a", type: "Object[]", desc: "The array whose string representation to return." }], desc: "Returns a string representation of the 'deep contents' of the specified array (for multi-dimensional arrays)." }],
      "stream": [
        { signature: "stream(int[] array)", returns: "IntStream", returnsDesc: "An IntStream for the array.", params: [{ name: "array", type: "int[]", desc: "The array, assumed to be unmodified during use." }], desc: "Returns a sequential IntStream with the specified array as its source." },
        { signature: "stream(T[] array)", returns: "Stream<T>", returnsDesc: "A Stream for the array.", params: [{ name: "array", type: "T[]", desc: "The array, assumed to be unmodified during use." }], desc: "Returns a sequential Stream with the specified array as its source." }
      ]
    }
  },

  // ─── Optional ─────────────────────────────────────────────────────────────
  "Optional": {
    package: "java.util",
    kind: "class",
    description: "A container object which may or may not contain a non-null value. Use to avoid NullPointerExceptions. Primary tool for functional-style optional values.",
    constructors: [],
    methods: {
      "of": [{ signature: "of(T value)", returns: "Optional<T>", returnsDesc: "An Optional with the present non-null value.", params: [{ name: "value", type: "T", desc: "The value to be present, which must be non-null." }], desc: "Returns an Optional with the specified non-null value.", throws: ["NullPointerException — if value is null"] }],
      "ofNullable": [{ signature: "ofNullable(T value)", returns: "Optional<T>", returnsDesc: "An Optional with the value present, or an empty Optional if null.", params: [{ name: "value", type: "T", desc: "The possibly-null value to describe." }], desc: "Returns an Optional describing the specified value, if non-null, otherwise returns an empty Optional." }],
      "empty": [{ signature: "empty()", returns: "Optional<T>", returnsDesc: "An empty Optional instance.", params: [], desc: "Returns an empty Optional instance." }],
      "get": [{ signature: "get()", returns: "T", returnsDesc: "The non-null value held by this Optional.", params: [], desc: "If a value is present in this Optional, returns the value, otherwise throws an exception.", throws: ["NoSuchElementException — if there is no value present"] }],
      "isPresent": [{ signature: "isPresent()", returns: "boolean", returnsDesc: "true if there is a value present, otherwise false.", params: [], desc: "Returns true if there is a value present, otherwise false." }],
      "isEmpty": [{ signature: "isEmpty()", returns: "boolean", returnsDesc: "true if there is no value present, otherwise false.", params: [], desc: "Returns true if there is no value present, otherwise false." }],
      "orElse": [{ signature: "orElse(T other)", returns: "T", returnsDesc: "The value, if present, otherwise other.", params: [{ name: "other", type: "T", desc: "The value to be returned if there is no value present (may be null)." }], desc: "Return the value if present, otherwise return other." }],
      "orElseGet": [{ signature: "orElseGet(Supplier<? extends T> other)", returns: "T", returnsDesc: "The present value, or the result of other.get().", params: [{ name: "other", type: "Supplier<? extends T>", desc: "A Supplier whose result is returned if no value is present." }], desc: "Return the value if present, otherwise invoke other and return the result." }],
      "orElseThrow": [{ signature: "orElseThrow()", returns: "T", returnsDesc: "The non-null value held by this Optional.", params: [], desc: "If a value is present, returns the value, otherwise throws NoSuchElementException.", throws: ["NoSuchElementException — if no value is present"] }],
      "map": [{ signature: "map(Function<? super T,? extends U> mapper)", returns: "Optional<U>", returnsDesc: "An Optional describing the result of applying mapper, or an empty Optional.", params: [{ name: "mapper", type: "Function<? super T, ? extends U>", desc: "A mapping function to apply to the value, if present." }], desc: "If a value is present, applies the provided mapping function to it, and if the result is non-null, returns an Optional describing the result." }],
      "flatMap": [{ signature: "flatMap(Function<? super T,Optional<U>> mapper)", returns: "Optional<U>", returnsDesc: "The result of applying the Optional-bearing mapping function, or an empty Optional.", params: [{ name: "mapper", type: "Function<? super T, Optional<U>>", desc: "A mapping function to apply to the value, if present." }], desc: "If a value is present, applies the provided Optional-bearing mapping function to it, and returns the result." }],
      "filter": [{ signature: "filter(Predicate<? super T> predicate)", returns: "Optional<T>", returnsDesc: "An Optional describing the value if present and matching the predicate, otherwise an empty Optional.", params: [{ name: "predicate", type: "Predicate<? super T>", desc: "A predicate to apply to the value, if present." }], desc: "If a value is present, and the value matches the given predicate, returns an Optional describing the value, otherwise returns an empty Optional." }],
      "ifPresent": [{ signature: "ifPresent(Consumer<? super T> consumer)", returns: "void", returnsDesc: "", params: [{ name: "consumer", type: "Consumer<? super T>", desc: "Block to be executed if a value is present." }], desc: "If a value is present, invoke the specified consumer with the value, otherwise do nothing." }]
    }
  },

  // ─── Scanner ──────────────────────────────────────────────────────────────
  "Scanner": {
    package: "java.util",
    kind: "class",
    description: "A simple text scanner which can parse primitive types and strings using regular expressions. Commonly used to read from System.in.",
    constructors: [
      { signature: "Scanner(InputStream source)", desc: "Constructs a new Scanner that produces values scanned from the specified input stream." },
      { signature: "Scanner(String source)", desc: "Constructs a new Scanner that produces values scanned from the specified string." },
      { signature: "Scanner(File source)", desc: "Constructs a new Scanner that produces values scanned from the specified file.", throws: ["FileNotFoundException — if source is not found"] },
      { signature: "Scanner(Readable source)", desc: "Constructs a new Scanner that produces values scanned from the specified source." }
    ],
    methods: {
      "next": [{ signature: "next()", returns: "String", returnsDesc: "The next token.", params: [], desc: "Finds and returns the next complete token from this scanner.", throws: ["NoSuchElementException — if no more tokens are available", "IllegalStateException — if the scanner is closed"] }],
      "nextLine": [{ signature: "nextLine()", returns: "String", returnsDesc: "The line that was skipped.", params: [], desc: "Advances this scanner past the current line and returns the input that was skipped.", throws: ["NoSuchElementException — if no line found", "IllegalStateException — if this scanner is closed"] }],
      "nextInt": [
        { signature: "nextInt()", returns: "int", returnsDesc: "The int scanned from the input.", params: [], desc: "Scans the next token of the input as an int.", throws: ["InputMismatchException — if the next token does not match Integer", "NoSuchElementException — if input is exhausted", "IllegalStateException — if the scanner is closed"] },
        { signature: "nextInt(int radix)", returns: "int", returnsDesc: "The int scanned from the input.", params: [{ name: "radix", type: "int", desc: "The radix used to interpret the token as an int value." }], desc: "Scans the next token of the input as an int in the specified radix." }
      ],
      "nextLong": [{ signature: "nextLong()", returns: "long", returnsDesc: "The long scanned from the input.", params: [], desc: "Scans the next token of the input as a long.", throws: ["InputMismatchException", "NoSuchElementException", "IllegalStateException"] }],
      "nextDouble": [{ signature: "nextDouble()", returns: "double", returnsDesc: "The double scanned from the input.", params: [], desc: "Scans the next token of the input as a double.", throws: ["InputMismatchException", "NoSuchElementException", "IllegalStateException"] }],
      "nextBoolean": [{ signature: "nextBoolean()", returns: "boolean", returnsDesc: "The boolean scanned from the input.", params: [], desc: "Scans the next token of the input into a boolean value and returns that value.", throws: ["InputMismatchException", "NoSuchElementException", "IllegalStateException"] }],
      "hasNext": [{ signature: "hasNext()", returns: "boolean", returnsDesc: "true if this scanner has another token in its input.", params: [], desc: "Returns true if this scanner has another token in its input.", throws: ["IllegalStateException — if this scanner is closed"] }],
      "hasNextLine": [{ signature: "hasNextLine()", returns: "boolean", returnsDesc: "true if there is another line in the input of this scanner.", params: [], desc: "Returns true if there is another line in the input of this scanner.", throws: ["IllegalStateException — if this scanner is closed"] }],
      "hasNextInt": [{ signature: "hasNextInt()", returns: "boolean", returnsDesc: "true if the next token in this scanner's input can be interpreted as an int.", params: [], desc: "Returns true if the next token in this scanner's input can be interpreted as an int value." }],
      "close": [{ signature: "close()", returns: "void", returnsDesc: "", params: [], desc: "Closes this scanner. If the scanner's underlying readable implements the Closeable interface, the readable's close method will be invoked." }],
      "useDelimiter": [{ signature: "useDelimiter(String pattern)", returns: "Scanner", returnsDesc: "This scanner.", params: [{ name: "pattern", type: "String", desc: "A string specifying a delimiting pattern." }], desc: "Sets this scanner's delimiting pattern to the specified pattern." }]
    }
  }
};
