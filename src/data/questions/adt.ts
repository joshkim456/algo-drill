import type { ImplementationQuestion } from '../schema'

export const adtQuestions: ImplementationQuestion[] = [
  // ── 1. Stack — Array-Based (push/pop) [small] ──
  {
    id: "adt-stack-array-small",
    type: "implement",
    topic: "adt",
    tier: "small",
    title: "Stack — Array-Based (push/pop)",
    prompt: "Implement a stack using a resizing array. Implement push and pop operations. Double the array when full, halve when quarter full.",
    hints: [
      "Track size n. push: if n == capacity, resize to 2*capacity. a[n++] = item.",
      "pop: item = a[--n]; a[n] = null; if n == capacity/4, resize to capacity/2.",
      "function push(item): if n == a.length: resize(2*a.length); a[n] = item; n++\nfunction pop(): n--; item = a[n]; a[n] = null; if n > 0 and n == a.length/4: resize(a.length/2); return item",
    ],
    solutions: {
      pseudocode: `class ArrayStack:
  a[] = new array[1]
  n = 0

  function push(item):
    if n == a.length:
      resize(2 * a.length)
    a[n] = item
    n = n + 1

  function pop():
    n = n - 1
    item = a[n]
    a[n] = null
    if n > 0 and n == a.length / 4:
      resize(a.length / 2)
    return item

  function resize(capacity):
    copy = new array[capacity]
    for i = 0 to n-1:
      copy[i] = a[i]
    a = copy`,
      python: `class ArrayStack:
    def __init__(self):
        self._a = [None]
        self._n = 0

    def push(self, item):
        if self._n == len(self._a):
            self._resize(2 * len(self._a))
        self._a[self._n] = item
        self._n += 1

    def pop(self):
        self._n -= 1
        item = self._a[self._n]
        self._a[self._n] = None
        if self._n > 0 and self._n == len(self._a) // 4:
            self._resize(len(self._a) // 2)
        return item

    def _resize(self, capacity):
        self._a = self._a[:self._n] + [None] * (capacity - self._n)`,
    },
    complexity: {
      question: "What is the amortised time complexity of push and pop?",
      answer: "Amortised O(1) — resizing doubles/halves the array, so the cost of n pushes is O(n) total (geometric series). Each individual operation is O(1) amortised.",
    },
    source: "Midterm Q3; syllabus",
  },

  // ── 2. Stack — Linked List-Based (push/pop) [small] ──
  {
    id: "adt-stack-linked-small",
    type: "implement",
    topic: "adt",
    tier: "small",
    title: "Stack — Linked List-Based (push/pop)",
    prompt: "Implement a stack using a singly linked list. Implement push (add to head) and pop (remove from head).",
    hints: [
      "Maintain a head pointer. push creates a new node and makes it the new head. pop removes the head node.",
      "push: newNode = new Node(item); newNode.next = head; head = newNode. pop: item = head.item; head = head.next; return item.",
      "function push(item):\n  oldHead = head\n  head = new Node(item)\n  head.next = oldHead\n  n = n + 1\nfunction pop():\n  item = head.item\n  head = head.next\n  n = n - 1\n  return item",
    ],
    solutions: {
      pseudocode: `class LinkedStack:
  head = null
  n = 0

  function push(item):
    oldHead = head
    head = new Node(item)
    head.next = oldHead
    n = n + 1

  function pop():
    item = head.item
    head = head.next
    n = n - 1
    return item

  function isEmpty():
    return head == null

  function size():
    return n`,
      python: `class Node:
    def __init__(self, item):
        self.item = item
        self.next = None

class LinkedStack:
    def __init__(self):
        self._head = None
        self._n = 0

    def push(self, item):
        old_head = self._head
        self._head = Node(item)
        self._head.next = old_head
        self._n += 1

    def pop(self):
        item = self._head.item
        self._head = self._head.next
        self._n -= 1
        return item

    def is_empty(self):
        return self._head is None

    def size(self):
        return self._n`,
    },
    complexity: {
      question: "What is the time complexity of push and pop? How does memory usage compare to the array-based stack?",
      answer: "Both O(1) worst-case — no resizing needed, just pointer updates. Memory: each element requires a Node object with an extra 'next' pointer (overhead per element), whereas the array stack has no per-element overhead but may waste space (up to 75% empty when array is quarter-full before shrinking).",
    },
    source: "Midterm Q3c (verbatim)",
  },

  // ── 3. Queue — Array-Based with Resizing (enqueue/dequeue) [small] ──
  {
    id: "adt-queue-array-small",
    type: "implement",
    topic: "adt",
    tier: "small",
    title: "Queue — Array-Based with Resizing (enqueue/dequeue)",
    prompt: "Implement a queue using a circular resizing array. Implement enqueue (add to tail) and dequeue (remove from head). Use modular arithmetic for wrap-around. Double the array when full, halve when quarter full.",
    hints: [
      "Track head index, tail index, and size n. Use modular arithmetic: tail = (head + n) % capacity. enqueue adds at tail, dequeue removes from head.",
      "enqueue: if n == capacity, resize(2*capacity); a[tail] = item; tail = (tail+1) % capacity; n++. dequeue: item = a[head]; a[head] = null; head = (head+1) % capacity; n--.",
      "When resizing, copy elements starting from head, wrapping around. The new array has elements at indices 0..n-1, so reset head=0, tail=n.",
    ],
    solutions: {
      pseudocode: `class ArrayQueue:
  a[] = new array[2]
  head = 0
  tail = 0
  n = 0

  function enqueue(item):
    if n == a.length:
      resize(2 * a.length)
    a[tail] = item
    tail = (tail + 1) % a.length
    n = n + 1

  function dequeue():
    item = a[head]
    a[head] = null
    head = (head + 1) % a.length
    n = n - 1
    if n > 0 and n == a.length / 4:
      resize(a.length / 2)
    return item

  function resize(capacity):
    copy = new array[capacity]
    for i = 0 to n-1:
      copy[i] = a[(head + i) % a.length]
    a = copy
    head = 0
    tail = n`,
      python: `class ArrayQueue:
    def __init__(self):
        self._a = [None, None]
        self._head = 0
        self._tail = 0
        self._n = 0

    def enqueue(self, item):
        if self._n == len(self._a):
            self._resize(2 * len(self._a))
        self._a[self._tail] = item
        self._tail = (self._tail + 1) % len(self._a)
        self._n += 1

    def dequeue(self):
        item = self._a[self._head]
        self._a[self._head] = None
        self._head = (self._head + 1) % len(self._a)
        self._n -= 1
        if self._n > 0 and self._n == len(self._a) // 4:
            self._resize(len(self._a) // 2)
        return item

    def _resize(self, capacity):
        copy = [None] * capacity
        for i in range(self._n):
            copy[i] = self._a[(self._head + i) % len(self._a)]
        self._a = copy
        self._head = 0
        self._tail = self._n`,
    },
    complexity: {
      question: "What is the amortised time complexity of enqueue and dequeue? Why is the circular buffer necessary?",
      answer: "Amortised O(1) — same doubling/halving argument as the resizing array stack. The circular buffer avoids shifting all elements on dequeue: without wrap-around, dequeue would be O(n) because you'd have to shift every element left by one. With head/tail indices and modular arithmetic, both operations are O(1).",
    },
    source: "23-24 Q1b (10 marks)",
  },

  // ── 4. Queue — Linked List-Based (enqueue/dequeue) [small] ──
  {
    id: "adt-queue-linked-small",
    type: "implement",
    topic: "adt",
    tier: "small",
    title: "Queue — Linked List-Based (enqueue/dequeue)",
    prompt: "Implement a queue using a singly linked list. Implement enqueue (add to tail) and dequeue (remove from head).",
    hints: [
      "Maintain head and tail pointers. enqueue: add new node after tail. dequeue: remove head node.",
      "enqueue: newNode.next = null; if tail != null: tail.next = newNode; tail = newNode; if head == null: head = tail",
      "dequeue: item = head.item; head = head.next; if head == null: tail = null; return item",
    ],
    solutions: {
      pseudocode: `class LinkedQueue:
  head = null
  tail = null

  function enqueue(item):
    oldTail = tail
    tail = new Node(item)
    tail.next = null
    if head == null:
      head = tail
    else:
      oldTail.next = tail

  function dequeue():
    item = head.item
    head = head.next
    if head == null:
      tail = null
    return item`,
      python: `class Node:
    def __init__(self, item):
        self.item = item
        self.next = None

class LinkedQueue:
    def __init__(self):
        self.head = None
        self.tail = None

    def enqueue(self, item):
        old_tail = self.tail
        self.tail = Node(item)
        if self.head is None:
            self.head = self.tail
        else:
            old_tail.next = self.tail

    def dequeue(self):
        item = self.head.item
        self.head = self.head.next
        if self.head is None:
            self.tail = None
        return item`,
    },
    complexity: {
      question: "What is the time complexity of enqueue and dequeue?",
      answer: "Both O(1) — constant time pointer operations. No resizing needed.",
    },
    source: "23-24 Q1c (10 marks)",
  },

  // ── 5. ADT Scenario Matching — Choose + Implement the Right ADT [exam] ──
  {
    id: "adt-scenario-matching-exam",
    type: "implement",
    topic: "adt",
    tier: "exam",
    title: "ADT Scenario Matching — Choose and Implement",
    prompt: `You are given three independent scenarios. For EACH scenario:
(a) State which ADT (stack, queue, or deque) is most appropriate and justify your choice.
(b) Implement the ADT you chose using either an array or a linked list.

Scenario 1: A web browser's back button — users visit pages in sequence and press "back" to return to the most recently visited page.

Scenario 2: A print queue — documents are printed in the order they were submitted.

Scenario 3: A text editor's undo/redo system — the user can undo the most recent action, and after undoing, can redo to restore it.`,
    hints: [
      "Think about the access pattern: which end(s) do you add to and remove from? LIFO = stack, FIFO = queue, both ends = deque.",
      "Scenario 1: last visited = first to go back to (LIFO). Scenario 2: first submitted = first printed (FIFO). Scenario 3: undo pops from one stack, redo pushes onto another — two stacks.",
      "For Scenario 3, the undo stack holds past actions (push on edit, pop on undo). The redo stack holds undone actions (push on undo, pop on redo). Any new edit clears the redo stack.",
    ],
    solutions: {
      pseudocode: `--- Scenario 1: Web browser back button ---
ADT: Stack (LIFO)
Justification: The most recently visited page is the first one
returned to when pressing "back" — this is last-in, first-out.

Implementation (linked list):
class BrowserHistory:
  top = null

  function visitPage(url):
    oldTop = top
    top = new Node(url)
    top.next = oldTop

  function goBack():
    if top == null: return null
    url = top.item
    top = top.next
    return url

--- Scenario 2: Print queue ---
ADT: Queue (FIFO)
Justification: Documents should be printed in the order they were
submitted — first-in, first-out.

Implementation (linked list):
class PrintQueue:
  head = null
  tail = null

  function submitJob(doc):
    oldTail = tail
    tail = new Node(doc)
    tail.next = null
    if head == null:
      head = tail
    else:
      oldTail.next = tail

  function printNext():
    if head == null: return null
    doc = head.item
    head = head.next
    if head == null:
      tail = null
    return doc

--- Scenario 3: Undo/Redo system ---
ADT: Two stacks
Justification: Undo retrieves the most recent action (LIFO).
Redo retrieves the most recently undone action (LIFO). Two stacks
work together: undo pops from the undo stack and pushes onto the
redo stack; redo does the reverse. A new edit clears the redo stack.

Implementation (using linked-list stacks):
class UndoRedo:
  undoStack = new LinkedStack()
  redoStack = new LinkedStack()

  function doAction(action):
    undoStack.push(action)
    redoStack = new LinkedStack()    // clear redo on new action

  function undo():
    if undoStack.isEmpty(): return null
    action = undoStack.pop()
    redoStack.push(action)
    return action

  function redo():
    if redoStack.isEmpty(): return null
    action = redoStack.pop()
    undoStack.push(action)
    return action`,
      python: `# --- Scenario 1: Web browser back button ---
# ADT: Stack (LIFO)
# Justification: most recently visited page is first to go back to.

class Node:
    def __init__(self, item):
        self.item = item
        self.next = None

class BrowserHistory:
    def __init__(self):
        self._top = None

    def visit_page(self, url):
        old_top = self._top
        self._top = Node(url)
        self._top.next = old_top

    def go_back(self):
        if self._top is None:
            return None
        url = self._top.item
        self._top = self._top.next
        return url


# --- Scenario 2: Print queue ---
# ADT: Queue (FIFO)
# Justification: documents printed in submission order.

class PrintQueue:
    def __init__(self):
        self._head = None
        self._tail = None

    def submit_job(self, doc):
        old_tail = self._tail
        self._tail = Node(doc)
        if self._head is None:
            self._head = self._tail
        else:
            old_tail.next = self._tail

    def print_next(self):
        if self._head is None:
            return None
        doc = self._head.item
        self._head = self._head.next
        if self._head is None:
            self._tail = None
        return doc


# --- Scenario 3: Undo/Redo system ---
# ADT: Two stacks
# Justification: undo = LIFO retrieval of past actions,
# redo = LIFO retrieval of undone actions. Two stacks cooperate.

class LinkedStack:
    def __init__(self):
        self._top = None

    def push(self, item):
        old_top = self._top
        self._top = Node(item)
        self._top.next = old_top

    def pop(self):
        item = self._top.item
        self._top = self._top.next
        return item

    def is_empty(self):
        return self._top is None

class UndoRedo:
    def __init__(self):
        self._undo = LinkedStack()
        self._redo = LinkedStack()

    def do_action(self, action):
        self._undo.push(action)
        self._redo = LinkedStack()  # clear redo on new action

    def undo(self):
        if self._undo.is_empty():
            return None
        action = self._undo.pop()
        self._redo.push(action)
        return action

    def redo(self):
        if self._redo.is_empty():
            return None
        action = self._redo.pop()
        self._undo.push(action)
        return action`,
    },
    complexity: {
      question: "State the time complexity of every operation in each of your three implementations.",
      answer: "All operations across all three implementations are O(1) worst-case. The linked-list stack uses O(1) pointer manipulation for push/pop. The linked-list queue uses O(1) head/tail pointer updates for enqueue/dequeue. The undo/redo system delegates to stack push/pop (O(1) each). The only exception is doAction clearing the redo stack, which is O(1) — we simply discard the reference and let garbage collection handle it (we don't traverse the old stack).",
    },
    source: "23-24 Q1 (25 marks), Midterm Q3",
  },

  // ── 6. ADT Design — Queue/Stack with Linked List + Cost Analysis [exam] ──
  {
    id: "adt-design-linked-exam",
    type: "implement",
    topic: "adt",
    tier: "exam",
    title: "ADT Design — Combined Queue/Stack with Linked List + Cost Analysis",
    prompt: `Design a single data structure called QueueStack that supports ALL of the following operations using a doubly linked list:
- pushFront(item): add to front (stack-like)
- pushBack(item): add to back (queue-like enqueue)
- popFront(): remove from front (both stack pop and queue dequeue)
- popBack(): remove from back

(a) Implement QueueStack using a doubly linked list with head and tail sentinels.
(b) State and justify the time complexity of each operation.
(c) Explain why a singly linked list would make popBack() inefficient, and what its complexity would be.`,
    hints: [
      "A doubly linked list with sentinel nodes at both ends avoids all null-pointer edge cases. Every real node sits between head sentinel and tail sentinel.",
      "pushFront: insert new node between head sentinel and head.next. popBack: remove the node before tail sentinel. Both are O(1) with doubly linked list.",
      "For part (c): with a singly linked list, popBack requires traversing from head to find the second-to-last node (the one before tail), which takes O(n). A doubly linked list avoids this because each node has a prev pointer.",
    ],
    solutions: {
      pseudocode: `class DNode:
  item
  prev = null
  next = null

class QueueStack:
  // Sentinel nodes — never hold real data
  head = new DNode()       // front sentinel
  tail = new DNode()       // back sentinel
  head.next = tail
  tail.prev = head
  n = 0

  function pushFront(item):
    node = new DNode()
    node.item = item
    node.next = head.next
    node.prev = head
    head.next.prev = node
    head.next = node
    n = n + 1

  function pushBack(item):
    node = new DNode()
    node.item = item
    node.prev = tail.prev
    node.next = tail
    tail.prev.next = node
    tail.prev = node
    n = n + 1

  function popFront():
    if n == 0: error("empty")
    node = head.next
    head.next = node.next
    node.next.prev = head
    n = n - 1
    return node.item

  function popBack():
    if n == 0: error("empty")
    node = tail.prev
    tail.prev = node.prev
    node.prev.next = tail
    n = n - 1
    return node.item

--- Cost Analysis ---

(b) All four operations are O(1) worst-case.
    Each operation performs a constant number of pointer
    reassignments (exactly 4 pointer updates for push,
    2 for pop) regardless of the number of elements.
    The sentinel nodes eliminate special cases for empty
    list or single-element list.

(c) With a singly linked list, pushFront, pushBack (with
    tail pointer), and popFront are all still O(1). However,
    popBack becomes O(n): to remove the last node, we must
    update the second-to-last node's next pointer to null,
    but with only forward pointers, we must traverse from
    head to find it. This linear scan makes popBack O(n).`,
      python: `class DNode:
    def __init__(self, item=None):
        self.item = item
        self.prev = None
        self.next = None

class QueueStack:
    def __init__(self):
        # Sentinel nodes — never hold real data
        self._head = DNode()  # front sentinel
        self._tail = DNode()  # back sentinel
        self._head.next = self._tail
        self._tail.prev = self._head
        self._n = 0

    def push_front(self, item):
        node = DNode(item)
        node.next = self._head.next
        node.prev = self._head
        self._head.next.prev = node
        self._head.next = node
        self._n += 1

    def push_back(self, item):
        node = DNode(item)
        node.prev = self._tail.prev
        node.next = self._tail
        self._tail.prev.next = node
        self._tail.prev = node
        self._n += 1

    def pop_front(self):
        if self._n == 0:
            raise IndexError("pop from empty QueueStack")
        node = self._head.next
        self._head.next = node.next
        node.next.prev = self._head
        self._n -= 1
        return node.item

    def pop_back(self):
        if self._n == 0:
            raise IndexError("pop from empty QueueStack")
        node = self._tail.prev
        self._tail.prev = node.prev
        node.prev.next = self._tail
        self._n -= 1
        return node.item

    def size(self):
        return self._n

    def is_empty(self):
        return self._n == 0


# --- Cost Analysis ---
#
# (b) All four operations are O(1) worst-case.
#     Each operation performs a constant number of pointer
#     reassignments regardless of n. Sentinels eliminate
#     all edge-case branches (empty, single element).
#
# (c) With a singly linked list (no prev pointers):
#     - push_front: O(1) — insert at head
#     - push_back:  O(1) — insert at tail (if tail pointer maintained)
#     - pop_front:  O(1) — remove head
#     - pop_back:   O(n) — must traverse from head to find the
#       second-to-last node, since there is no prev pointer.
#       This makes a singly linked list unsuitable for a deque
#       that needs efficient removal from both ends.`,
    },
    complexity: {
      question: "If we added a 'peekMiddle()' operation that returns the middle element, what would its complexity be? Could we improve it?",
      answer: "With a standard doubly linked list, peekMiddle() is O(n) — we must traverse n/2 nodes from either end. We could improve to O(1) by maintaining a separate 'middle' pointer and updating it on each push/pop (advancing or retreating by one node as the size changes by one). This adds O(1) overhead to each operation but gives constant-time middle access.",
    },
    source: "23-24 Q1 (25 marks), Midterm Q3",
  },

  // ── 7. Deque — Conceptual [conceptual] ──
  {
    id: "adt-deque-conceptual",
    type: "implement",
    topic: "adt",
    tier: "conceptual",
    title: "Deque — Definition, Operations, and Generalisation",
    prompt: `Define the Deque (double-ended queue) ADT.
(a) State all four core operations and what each does.
(b) Explain how a deque generalises both a stack and a queue.
(c) For each generalisation, state which deque operations correspond to the stack/queue operations.`,
    hints: [
      "A deque allows insertion and removal at BOTH ends. Think of it as a queue where you can also push/pop from the 'wrong' end.",
      "A stack uses one end only (LIFO). A queue uses both ends but in a fixed way (add at back, remove from front). A deque can do both.",
      "Stack = addFirst + removeFirst (or addLast + removeLast). Queue = addLast + removeFirst.",
    ],
    solutions: {
      pseudocode: `(a) Core operations of a Deque:

  1. addFirst(item)  — insert item at the front
  2. addLast(item)   — insert item at the back
  3. removeFirst()   — remove and return the front item
  4. removeLast()    — remove and return the back item

  Supporting operations: isEmpty(), size(), peekFirst(), peekLast().

(b) A deque generalises both a stack and a queue because it
permits insertion and removal at BOTH ends. Any access pattern
that only uses a subset of these operations is a special case:

  - A stack restricts access to ONE end only (LIFO).
  - A queue restricts to adding at one end and removing from
    the other (FIFO).
  - A deque imposes no such restriction — it supports both
    patterns and more.

(c) Correspondence:

  Stack (LIFO) via deque:
    push(item)  =  addFirst(item)
    pop()       =  removeFirst()
    (Equivalently: addLast + removeLast also gives a stack.)

  Queue (FIFO) via deque:
    enqueue(item)  =  addLast(item)
    dequeue()      =  removeFirst()

Since a deque supports all four operations, restricting to
any two gives either stack or queue behaviour. This is why
the deque is the most general of the three linear ADTs.`,
      python: `(a) Core operations of a Deque:

  1. add_first(item)  — insert item at the front
  2. add_last(item)   — insert item at the back
  3. remove_first()   — remove and return the front item
  4. remove_last()    — remove and return the back item

  Supporting operations: is_empty(), size(), peek_first(), peek_last().

(b) A deque generalises both a stack and a queue because it
permits insertion and removal at BOTH ends. Any access pattern
that only uses a subset of these operations is a special case:

  - A stack restricts access to ONE end only (LIFO).
  - A queue restricts to adding at one end and removing from
    the other (FIFO).
  - A deque imposes no such restriction — it supports both
    patterns and more.

(c) Correspondence:

  Stack (LIFO) via deque:
    push(item)  =  add_first(item)
    pop()       =  remove_first()
    (Equivalently: add_last + remove_last also gives a stack.)

  Queue (FIFO) via deque:
    enqueue(item)  =  add_last(item)
    dequeue()      =  remove_first()

Since a deque supports all four operations, restricting to
any two gives either stack or queue behaviour. This is why
the deque is the most general of the three linear ADTs.`,
    },
    complexity: {
      question: "",
      answer: "",
    },
    source: "Syllabus; never tested (0/6 papers) — low priority",
  },
]
