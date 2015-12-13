Tests
=================

### Failure (illegal move) scenarios

```
Given[placed(1, 0, X)]
When(placed(1, 0, X))
Then(Illegal move, This square is already filled)
```

```
Given[placed(2, 1, X)]
When(placed(2, 1, O))
Then(Illegal move, This square is already filled)
```

### Winning scenarios

### Draw scenarios
