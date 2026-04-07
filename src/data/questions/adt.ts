import type { ImplementationQuestion } from '../schema'

export const adtQuestions: ImplementationQuestion[] = [
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
  {
    id: "adt-queue-linked-small",
    type: "implement",
    topic: "adt",
    tier: "small",
    title: "Queue — Linked List-Based",
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
]
