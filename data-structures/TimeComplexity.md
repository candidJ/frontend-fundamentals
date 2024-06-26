-
  | Data Structure | Read/Access | Write/Insert | Search | Delete |
  |---|---|---|---|---|
  | HashMap | `O(1)` | `O(1)` | `O(1)` | `O(1)` |
  | Array | `O(1)` | `O(N)` (`O(1)` at end) | `O(N)` | `O(N)` (`O(1)` at end) |
  | HashSet | `O(1)` | `O(N)` best case | `O(N)` | `O(N)` |
  | LinkedList | `O(N)` | `O(N)` (`O(1)` at beginning) | `O(N)` | `O(N)` (`O(1)` at beginning) |
  | Ordered Array | `O(1)` | `O(N)` | `O(logN)` Binary search; `O(N)`  Linear Search | `O(N)` |
  | Stack | `O(1)` | `O(1)` | `O(N)` | `O(1)` |
  | Queue | `O(1)` | `O(1)` | `O(N)` | `O(1)` |
  | Heap | `O(logN)` (`O(1)` at root) | `O(logN)` | `O(logN)` | `O(logN)` |
  | Binary Search Tree | `O(logN)` (`O(1)` at root) | `O(logN)` | `O(logN)` | `O(logN)` |

- LinkedList are good at write and delete; Arrays are good at random access(fast reads)
- HashMap are good at read, inserts, search and delete. But they don't maintain ordered data.
- Ordered Arrays are excellent for Search.
- Stack and Queue are Abstract Data structures used to temporarily store Data.
- Stack is used during recursion (Depth First Search)
- Queue are used during Breadth First Search
- Binary Search Tree are excellent to store and manipulate Ordered data. They boast `O(logN)` efficiency for insert, delete and search.
- Only a balanced BST does search in `O(logN)`
- Priority Queue or Heap is a list whose deletions and access are just like classic queue (at beginning), but whose insertions are like an Ordered Array( insert at end, then trickle up to maintain order).